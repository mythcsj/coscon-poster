<template>
  <div class="root">
    <div class="poster-container">
      <div class="poster-control">
        <h1>COSCon 2021 海报生成器（版本：{{ getVersion }}）</h1>
        <el-form>
          <el-tabs>
            <el-tab-pane label="论坛信息">
              <el-form-item id="track" label="论坛名称">
                <el-input v-model="forumName" />
              </el-form-item>
              <el-form-item label="论坛口号"
                ><el-input v-model="forumSlogon"
              /></el-form-item>
              <el-form-item label="论坛详情"
                ><el-input v-model="forumDetail"
              /></el-form-item>
            </el-tab-pane>

            <el-tab-pane label="成员信息">
              <el-form-item
                label="成员照片（虽支持自动缩放，建议最好使用类方形照片，以达最好效果）"
              >
                <el-upload
                  action="#"
                  :show-file-list="false"
                  :on-change="updateAvatar"
                  :auto-upload="false"
                  accept="image/*"
                >
                  <img
                    v-if="memberAvatarUrl"
                    :src="memberAvatarUrl"
                    class="member-avatar-uploader"
                  />
                  <i v-else class="el-icon-plus member-avatar-uploader"></i>
                </el-upload>
              </el-form-item>
              <el-form-item label="成员角色"
                ><el-input v-model="memberRole"
              /></el-form-item>
              <el-form-item label="成员姓名">
                <el-input v-model="memberName" />
              </el-form-item>
            </el-tab-pane>

            <el-tab-pane label="演讲信息">
              <el-form-item label="演讲标题">
                <el-input v-model="topicTitle" />
              </el-form-item>
              <el-form-item label="演讲口号">
                <el-input v-model="topicSlogon" />
              </el-form-item>
              <el-form-item label="演讲内容（支持md语法）">
                <el-input v-model="topicDetail" autosize type="textarea" />
              </el-form-item>
            </el-tab-pane>

            <el-tab-pane label="报名信息">
              <el-form-item label="报名链接（请输入url自动生成报名二维码）"
                ><el-input v-model="qr"
              /></el-form-item>
            </el-tab-pane>

            <el-form-item>
              <el-button
                v-loading.fullscreen.lock="isDownloading"
                element-loading-text="生成海报中"
                element-loading-background="rgba(0, 0, 0, 0.8)"
                type="primary"
                @click="download()"
              >
                生成海报
              </el-button>
            </el-form-item>
          </el-tabs>
        </el-form>
      </div>
      <div id="poster-preview">
        <div class="header">
          <div class="forum-banner">
            <h1 class="forum-name">{{ forumName }}</h1>
            <h2 class="forum-slogon">{{ forumSlogon }}</h2>
            <small class="forum-detail">{{ forumDetail }}</small>
          </div>
          <div class="logo"></div>
        </div>
        <div class="content">
          <img
            v-if="memberAvatarUrl"
            class="member-avatar"
            :src="memberAvatarUrl"
          />
          <div v-else class="member-avatar"></div>
          <h2 class="member-role">{{ memberRole }}</h2>
          <h1 class="member-name">{{ memberName }}</h1>
          <h2 class="topic-title">{{ topicTitle }}</h2>
          <h2 class="topic-slogon">{{ topicSlogon }}</h2>
          <div class="topic-detail" v-html="getMd"></div>
        </div>
        <div class="footer">
          <img v-if="getQr" :src="getQr" />
          <small>扫描二维码报名参会</small>
        </div>
      </div>
    </div>
    <div class="copy-right">
      <small>
        <i class="el-icon-service"></i> 本工具由
        <a href="http://github.com/Ovilia">@Ovilia</a> 开发，<a
          href="http://github.com/dz85"
          >@David Z.</a
        >
        重构/修改，<a href="mailto:geek@lzw.name">问题反馈</a>
      </small>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import AsyncComputed from 'vue-async-computed'
import domtoimage from 'retina-dom-to-image'
import qrcode from 'qrcode'
import MarkdownIt from 'markdown-it'

import { ElUploadInternalFileDetail } from 'element-ui/types/upload'
import v from '../version.json'

Vue.use(AsyncComputed)

export default Vue.extend({
  data() {
    return {
      forumName: '2021中国开源年会',
      forumSlogon: 'Happy Hacking',
      forumDetail: '10月30日 - 10月31日 成都·北京·上海·线上',
      memberAvatarUrl: '',
      memberRole: '开源社2021届成员',
      memberName: '姓名',
      topicTitle: '这是一个很神秘的主题',
      topicSlogon: '开源社邀请您来一起开心快乐开源',
      topicDetail: `## 大会论坛
Keynote 主题演讲、人工智能、区块链、云计算、大数据
开源硬件、操作系统、Web 应用开发、开源教育、开源治理
女性论坛、开源百宝箱、开源公益、开源社区、开源文化
开源商业

## 社区活动
城市聚会、特色活动、开源·真·黑客马拉松、开源市集
汉服主题、小吃走廊、开源读书会、人找事事找人
`,
      qr: 'https://www.bagevent.com/event/7685233',

      track: '',
      imageUrl: null as unknown as string,
      title: '',
      name: '',
      topic: '',
      time: '',
      isKeynote: false,
      avatarInput: null,

      nameFontSize: 1,
      topicFontSize: 1,

      avatarDefaultPos: {
        width: 0,
        height: 0,
        top: 0,
        left: 0,
      },
      avatarPos: {
        width: 0,
        height: 0,
        top: 0,
        left: 0,
      },
      avatarZoom: 1,
      isMouseDown: false,
      mouseX: 0,
      mouseY: 0,
      isDownloading: false,
      posterBase64: '',

      lang: 'zh',
    }
  },

  computed: {
    getVersion(): string {
      return v.version
    },

    getMd(): string {
      const md = new MarkdownIt()
      return md.render(this.topicDetail)
    },
  },

  asyncComputed: {
    async getQr(): Promise<string> {
      if (this.qr === '') return ''

      const dataURL = await qrcode.toDataURL(this.qr)
      return dataURL
    },
  },

  mounted() {},

  methods: {
    updateAvatar(file: ElUploadInternalFileDetail) {
      if (!file) return

      if (this.memberAvatarUrl !== '') URL.revokeObjectURL(this.memberAvatarUrl)

      this.memberAvatarUrl = URL.createObjectURL(file.raw)
    },

    async download() {
      this.isDownloading = true
      const url = await domtoimage.toJpeg(
        document.getElementById('poster-preview')
      )

      this.posterBase64 = url
      this.isDownloading = false
      const link = document.createElement('a')
      link.href = url
      link.download = this.memberName + '.jpg'
      link.click()
    },
  },
})
</script>

<style lang="scss">
@font-face {
  font-family: 'Open Sans';
  font-style: normal;
  font-weight: bold;
  src: url(~assets/OpenSans-Bold.ttf) format('truetype');
}
@font-face {
  font-family: 'Open Sans';
  font-style: normal;
  font-weight: normal;
  src: url(~assets/OpenSans-Light.ttf) format('truetype');
}
@font-face {
  font-family: 'SourceHanSerifSC';
  font-style: normal;
  font-weight: bold;
  src: url(~assets/SourceHanSerifSC-Heavy.otf) format('opentype');
}

h1 {
  display: block;
  margin-block-start: 0.3em;
  margin-block-end: 0.3em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  font-size: 1.8em;
  font-weight: bold;
}

h2 {
  display: block;
  margin-block-start: 0.25em;
  margin-block-end: 0.25em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  font-size: 1.5em;
  font-weight: normal;
}

small {
  display: block;
  margin-block-start: 0.1em;
  margin-block-end: 0.1em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  font-size: 0.6em;
  font-weight: bold;
}

p {
  display: block;
  margin-block-start: 0em;
  margin-block-end: 1.5em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  font-size: 0.8em;
}

@mixin justify {
  text-align: justify;
  text-align-last: justify;
  text-justify: inter-ideograph;
}

.root {
  min-width: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;

  .poster-container {
    font-family: 'Open Sans';
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    // flex-wrap: wrap;

    .poster-control {
      min-width: 600px;
      .el-upload {
        display: flex;
        justify-content: center;
        align-items: center;
        border: 1px dashed #888;
        border-radius: 6px;
        .member-avatar-uploader {
          width: 32px;
          height: 32px;
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
          &:hover {
            border-color: #409eff;
          }
        }
      }
    }

    #poster-preview {
      // width: 638px;
      // width: 100vw;
      width: 600px;
      min-width: 600px;
      max-width: 600px;
      height: calc(600px * 1334px / 750px);
      // height: 1067.2px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: stretch;
      padding: 2.5em;
      background: url(~assets/bg.png) no-repeat;
      background-size: contain;
      text-align: center;
      box-sizing: border-box;

      .header,
      .footer {
        font-size: 1em;
        height: 15%;
        display: flex;
      }

      .header {
        font-size: 1em;
        justify-content: space-between;
        align-items: stretch;
        border-bottom: 1px dashed black;

        .forum-banner {
          font-size: 1em;
          width: 55%;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          align-items: stretch;

          .forum-name,
          .forum-slogon,
          .forum-detail {
            margin-block-start: 0em;
            margin-block-end: 0em;
          }

          .forum-name {
            @include justify();
          }

          .forum-slogon {
            background: black;
            color: #ffc600;
            text-transform: uppercase;
            font-weight: bold;
          }

          .forum-detail {
            @include justify();
          }
        }

        .logo {
          font-size: 1em;
          width: 25%;
          background: url(~assets/logo.png) top no-repeat;
          background-size: contain;
        }
      }
      .footer {
        font-size: 1em;
        border-top: 1px dashed black;
        flex-direction: column;
        justify-content: flex-end;
        align-items: center;

        img {
          font-size: 1em;
          width: 20%;
          height: auto;
        }
      }
      .content {
        font-size: 1em;
        height: 60%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: center;

        .member-avatar-mask,
        .member-avatar {
          font-size: 1em;
          width: 128px;
          height: 128px;
          // max-width: 128px;
          border: 0.3em solid #ff7353;
          border-radius: 50%;
          background: #ffa91b;
          object-fit: cover;

          // &:after {
          //   font-size: 1em;
          //   content: '';
          //   display: block;
          //   padding-top: 100%;
          // }
        }

        .topic-slogon {
          width: 100%;
          color: white;
          background: black;
        }

        .topic-detail {
          font-size: 1em;
          width: 100%;
          text-align: left;
        }
      }
    }
  }

  .copy-right {
    border-top: 1px dashed gray;
    margin: 10px 0;
    text-align: center;

    color: #aaa;
    a {
      color: #aaa;
    }
  }
}

// @media screen and (min-width: 600px) {
//   .root {
//     .poster-container {
//       flex-direction: row;
//       align-items: stretch;
//     }
//   }
// }
</style>
