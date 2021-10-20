import fs from 'fs/promises'
import semver from 'semver'

const main = async () => {
  const patchFilepath = './version.json'
  const majorFilepath = './package.json'
  const { version: v1 } = JSON.parse(
    await fs.readFile(patchFilepath, { encoding: 'utf8' })
  )
  const { version: v2 } = JSON.parse(
    await fs.readFile(majorFilepath, { encoding: 'utf8' })
  )
  await fs.writeFile(
    patchFilepath,
    JSON.stringify({
      version: semver.inc(semver.gt(v1, v2) ? v1 : v2, 'patch'),
    }),
    { encoding: 'utf8' }
  )
}

main().then()
