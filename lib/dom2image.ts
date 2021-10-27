class Dom2Image {
  static promises = {
    createImage: (src: string) =>
      new Promise(
        (
          resolve: (image: HTMLImageElement) => void,
          reject: OnErrorEventHandler
        ) => {
          const image = new Image()
          image.onload = () => resolve(image)
          image.onerror = reject
          image.src = src
        }
      ),
    canvas2Blob: (canvas: HTMLCanvasElement, type?: string, quality?: number) =>
      new Promise((resolve: BlobCallback, reject: (err: unknown) => void) => {
        try {
          canvas.toBlob(resolve, type, quality)
        } catch (err) {
          reject(err)
        }
      }),
    blob2DataURL: (blob: Blob) =>
      new Promise(
        (
          resolve: (result?: string | ArrayBuffer | null) => void,
          reject: (err: unknown) => void
        ) => {
          try {
            const reader = new FileReader()
            reader.onload = (event) => resolve(event.target?.result)
            reader.readAsDataURL(blob)
          } catch (err) {
            reject(err)
          }
        }
      ),
  }

  private static async copyStyle(
    source: CSSStyleDeclaration,
    target: CSSStyleDeclaration
  ) {
    if (source.cssText) target.cssText = source.cssText
    else
      for (const name of Array.from(source)) {
        let value: string | null = source.getPropertyValue(name)
        const priority = source.getPropertyPriority(name)
        if (name === 'background-image' && value.includes('url'))
          value = `url(${await this.src2DataURL(
            value.split(/\(|\)/g)[1].replace(/'|"/g, '')
          )})`
        target.setProperty(name, value, priority)
      }
  }

  private static async walk(
    node: HTMLElement,
    callback: (node: HTMLElement, paths: number[]) => void | Promise<void>,
    paths: number[] = []
  ) {
    if (!node) return

    const children = node.children
    for (let i = 0; i < children.length; i++) {
      const child = children[i] as HTMLElement
      if (child.nodeType === 1) await this.walk(child, callback, [...paths, i])
    }

    await callback(node, paths)
  }

  private static getNode(parent: HTMLElement, paths: number[]) {
    return paths.reduce(
      (pre, cur) => pre.children.item(cur) as HTMLElement,
      parent
    )
  }

  private static async cloneNode(source: HTMLElement): Promise<HTMLElement> {
    const target = source.cloneNode(true) as HTMLElement
    await this.walk(source, async (node, paths) => {
      await this.copyStyle(
        getComputedStyle(node),
        this.getNode(target, paths).style
      )
    })
    return target
  }

  static async dom2Svg(
    node: HTMLElement | null,
    width: number,
    height: number
  ): Promise<string | null> {
    if (!node) return null

    const target = await this.cloneNode(node)
    target.setAttribute('xmlns', 'http://www.w3.org/1999/xhtml')
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}"><foreignObject x="0" y="0" width="100%" height="100%">${new XMLSerializer().serializeToString(
      target
    )}</foreignObject></svg>`
    const xhtml = `data:image/svg+xml;charset=utf-8,${svg}`

    return xhtml
  }

  static async src2Canvas(
    src: string | null
  ): Promise<HTMLCanvasElement | null> {
    if (!src) return null

    const image = await this.promises.createImage(src)
    const canvas = document.createElement('canvas')
    canvas.width = image.width * 2
    canvas.height = image.height * 2
    const ctx = canvas.getContext('2d')
    ctx?.scale(2, 2)
    ctx?.drawImage(image, 0, 0)

    return canvas
  }

  static async src2Blob(src: string | null): Promise<Blob | null> {
    const canvas = await this.src2Canvas(src)
    if (!canvas) return null

    const blob = await this.promises.canvas2Blob(canvas)
    return blob
  }

  static async src2DataURL(src: string | null): Promise<string | null> {
    const canvas = await this.src2Canvas(src)
    if (!canvas) return null

    const dataURL = canvas.toDataURL()
    return dataURL
  }

  static async dom2Png(
    node: HTMLElement | null,
    width: number = 0,
    height: number = 0
  ) {
    const svgCode = await this.dom2Svg(node, width, height)
    const dataURL = await this.src2DataURL(svgCode)
    return dataURL
  }
}

export default Dom2Image
