(window.webpackJsonp=window.webpackJsonp||[]).push([[4,2,3],{343:function(t,e,o){"use strict";o.r(e),e.default="\nen_type,en_name,track,en_title,en_position,date\nRegular Session,Kaiyuanshe,OpenSource Governance,the way of OpenSource Governance,memeber of kaiyuanshe,2021.08.07 15:30 GMT+8\n"},344:function(t,e,o){"use strict";o.r(e),e.default="\ntrack,name,job_title,presentation_name,time,,\nkeynote,Sharan Foga,Apache Board Director,Welcoming Diversity,2021.08.06 09:20 GMT+8,,\n"},345:function(t,e,o){var content=o(351);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,o(118).default)("de1b8dfa",content,!0,{sourceMap:!1})},350:function(t,e,o){"use strict";o(345)},351:function(t,e,o){var n=o(117),r=o(235),l=o(352),c=o(353),f=o(354),h=n(!1),v=r(l),m=r(c),d=r(f);h.push([t.i,'@font-face{font-family:"Open Sans";font-style:normal;font-weight:700;src:url('+v+') format("truetype")}@font-face{font-family:"Open Sans";font-style:normal;font-weight:400;src:url('+m+') format("truetype")}@font-face{font-family:"SourceHanSerifSC";font-style:normal;font-weight:300;src:url('+d+') format("opentype")}h1{margin-bottom:15px;font-size:20px;font-family:"SourceHanSerifSC","Open Sans"}.poster-container{position:absolute;left:0;right:0;top:0;bottom:0;font-family:"Open Sans"}#poster-preview{position:relative;width:-webkit-max-content;width:-moz-max-content;width:max-content;height:100vh;overflow:hidden;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.bg{position:absolute;left:0;top:0;right:0;bottom:0;background:#fff;z-index:-20}.poster-template{height:100vh}.poster-content{position:absolute;left:0;right:0;top:0;bottom:0;padding:37vh 3vh 0;text-align:center;color:#fff;font-size:2vh}.author-img{position:absolute;z-index:999}.title{font-weight:400;color:#000}.name{margin:0 0 .5vh;font-family:"SourceHanSerifSC","Open Sans";font-size:3.7vh}.name,.topic{color:#000;font-weight:700}.topic{margin-bottom:.5vh;font-size:2.3vh}.time{font-size:2vh;color:#ccc}.keynote{display:block;margin:.5vh auto;height:5vh}.el-form-item{margin-bottom:5px}#track{margin-top:10px}.avatar-uploader{display:inline-block;margin-top:10px;width:40px;height:40px;border:1px dashed #d9d9d9;border-radius:6px;cursor:pointer;position:relative;overflow:hidden}.avatar-uploader:hover{border-color:#409eff}.avatar-icon{font-size:22px;color:#ccc;width:40px;height:40px;line-height:40px;text-align:center}.icon-panel{margin-top:12px}.el-upload:hover .avatar-icon,a:hover .avatar-icon{color:#409eff}.avatar{width:40px;height:40px;display:block}.info,.info a{color:#aaa}',""]),t.exports=h},352:function(t,e,o){t.exports=o.p+"fonts/OpenSans-Bold.dbb97fd.ttf"},353:function(t,e,o){t.exports=o.p+"fonts/OpenSans-Light.ed41bed.ttf"},354:function(t,e,o){t.exports=o.p+"fonts/SourceHanSerifSC-Heavy.8a4275a.otf"},355:function(t,e,o){"use strict";o.r(e);o(44),o(59),o(61),o(233),o(45),o(116),o(43),o(19),o(42),o(46),o(347),o(229);var n=o(0),r=o(349),l=o.n(r),c=o(346),f=o(343),h=o(344).default.split("\n").slice(2).filter((function(line){return!!line}));function v(t,e){var o=t.split("\n").slice(2).filter((function(line){return!!line})).map((function(line){var t=line.split(",");return{track:t[2],title:t[4],name:t[1],topic:t[3],time:t[5],isKeynote:!1}}));return o=o.concat(h.filter((function(line){return e===/[\u4e00-\u9fa5]/.test(line)})).map((function(line){var t=line.split(",");return{track:t[0],title:t[2],name:t[1],topic:t[3],time:t[4],isKeynote:!0}})))}var m=v(c.default,!0),d=v(f.default,!1),w=n.default.extend({data:function(){return{track:"",imageUrl:null,title:"",name:"",topic:"",time:"",isKeynote:!1,avatarInput:null,nameFontSize:1,topicFontSize:1,avatarDefaultPos:{width:0,height:0,top:0,left:0},avatarPos:{width:0,height:0,top:0,left:0},avatarZoom:1,isMouseDown:!1,mouseX:0,mouseY:0,isDownloading:!1,posterBase64:"",lang:"zh"}},mounted:function(){},methods:{trackQuery:function(t,e){var o="zh"===this.lang?m:d;e((t?o.filter((function(e){return e.track===t})):o).map((function(t){return t.track})).filter((function(track,t,e){return e.indexOf(track)===t})).map((function(track){return{value:track}})))},nameQuery:function(t,e){var o=this,n="zh"===this.lang?m:d;e((t?n.filter((function(e){return e.name===t})):n.filter((function(t){return t.track===o.track}))).map((function(track){return{value:track.name,track:track}})))},nameSelect:function(t){this.topic=t.track.topic,this.time=t.track.time,this.title=t.track.title,this.isKeynote=t.track.isKeynote,this.nameFontReset(),this.topicFontReset()},download:function(){var t=this;this.isDownloading=!0,l.a.toJpeg(document.getElementById("poster-preview")).then((function(e){t.posterBase64=e,t.isDownloading=!1;var link=document.createElement("a");link.href=e,link.download=t.name+".jpeg",link.click()}))},mouseDown:function(t){this.imageUrl&&(this.isMouseDown=!0,this.mouseX=t.pageX,this.mouseY=t.pageY)},mouseMove:function(t){if(this.isMouseDown){var e=100/window.innerHeight;this.avatarPos.left+=(t.pageX-this.mouseX)*e,this.avatarPos.top+=(t.pageY-this.mouseY)*e,this.mouseX=t.pageX,this.mouseY=t.pageY}},mouseUp:function(t){this.isMouseDown=!1},zoomIn:function(){this.avatarZoom+=.05,this.avatarPos.width=this.avatarDefaultPos.width*this.avatarZoom,this.avatarPos.height=this.avatarDefaultPos.height*this.avatarZoom},zoomOut:function(){this.avatarZoom-=.05,this.avatarPos.width=this.avatarDefaultPos.width*this.avatarZoom,this.avatarPos.height=this.avatarDefaultPos.height*this.avatarZoom},zoomReset:function(){this.avatarZoom=1,this.avatarPos.width=this.avatarDefaultPos.width,this.avatarPos.height=this.avatarDefaultPos.height,this.avatarPos.left=this.avatarDefaultPos.left,this.avatarPos.top=this.avatarDefaultPos.top},nameFontAdd:function(){this.nameFontSize+=.1},nameFontMinus:function(){this.nameFontSize-=.1},nameFontReset:function(){this.nameFontSize=1},topicFontAdd:function(){this.topicFontSize+=.1},topicFontMinus:function(){this.topicFontSize-=.1},topicFontReset:function(){this.topicFontSize=1},setAvatar:function(){this.$refs.avatarInput&&this.$refs.avatarInput.click()},avatarChange:function(t){var e=this,o=t.target.files&&t.target.files.length?t.target.files[0]:null;if(o){this.imageUrl=window.URL.createObjectURL(o);var img=new Image;img.onload=function(){var t=41700/2208,o=t/img.height*img.width,n=(56.25-o)/2;e.avatarDefaultPos.width=e.avatarPos.width=o,e.avatarDefaultPos.height=e.avatarPos.height=t,e.avatarDefaultPos.left=e.avatarPos.left=n,e.avatarDefaultPos.top=e.avatarPos.top=373/2208*100},img.src=this.imageUrl}}}}),k=(o(350),o(57)),component=Object(k.a)(w,(function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("el-row",{staticClass:"poster-container",attrs:{type:"flex",justify:"center"}},[o("el-col",{attrs:{span:12}},[o("div",{style:{cursor:t.imageUrl?"move":"default"},attrs:{id:"poster-preview"},on:{mousedown:function(e){return t.mouseDown(e)},mousemove:function(e){return t.mouseMove(e)},mouseup:function(e){return t.mouseUp(e)}}},[t.imageUrl?o("img",{ref:"avatar",staticClass:"author-img",style:{width:t.avatarPos.width+"vh",height:t.avatarPos.height+"vh",left:t.avatarPos.left+"vh",top:t.avatarPos.top+"vh"},attrs:{src:t.imageUrl}}):t._e(),t._v(" "),o("div",{staticClass:"bg"}),t._v(" "),o("img",{staticClass:"poster-template",attrs:{src:"poster-template-"+t.lang+".png"}}),t._v(" "),o("div",{staticClass:"poster-content"},[o("div",{staticClass:"title"},[t._v(t._s(t.title))]),t._v(" "),o("div",{staticClass:"name",style:{"font-size":3.7*t.nameFontSize+"vh"}},[t._v(t._s(t.name))]),t._v(" "),o("div",{staticClass:"topic",style:{"font-size":2.3*t.topicFontSize+"vh"}},[t._v(t._s(t.topic))]),t._v(" "),t.isKeynote?o("img",{staticClass:"keynote",attrs:{src:"keynote-"+t.lang+".png"}}):t._e()])])]),t._v(" "),o("el-col",{directives:[{name:"loading",rawName:"v-loading",value:t.isDownloading,expression:"isDownloading"}],staticClass:"poster-control",attrs:{span:8,"element-loading-text":"生成海报中"}},[o("el-row",[o("h1",[t._v("COSCon 2021 海报生成器")])]),t._v(" "),o("el-form",[o("el-form-item",{attrs:{label:"论坛名称",id:"track"}},[o("el-autocomplete",{attrs:{"fetch-suggestions":t.trackQuery},model:{value:t.track,callback:function(e){t.track=e},expression:"track"}})],1),t._v(" "),o("el-form-item",{attrs:{label:"讲师姓名"}},[o("el-autocomplete",{attrs:{"fetch-suggestions":t.nameQuery},on:{select:t.nameSelect},model:{value:t.name,callback:function(e){t.name=e},expression:"name"}})],1),t._v(" "),o("el-form-item",{attrs:{label:"讲师职位"}},[o("el-input",{model:{value:t.title,callback:function(e){t.title=e},expression:"title"}})],1),t._v(" "),o("el-form-item",{attrs:{label:"讲师照片"+(t.imageUrl?"（可在海报中拖动）":"")}},[o("el-col",{attrs:{span:3}},[o("input",{ref:"avatarInput",staticStyle:{display:"none"},attrs:{type:"file"},on:{change:t.avatarChange}}),t._v(" "),o("a",{staticClass:"avatar-uploader",attrs:{href:"javascript:;"},on:{click:function(e){return t.setAvatar()}}},[o("i",{staticClass:"el-icon-plus avatar-icon"})])]),t._v(" "),o("el-col",{staticClass:"icon-panel",attrs:{span:9}},[o("a",{attrs:{href:"javascript:;"},on:{click:function(e){return t.zoomIn()}}},[t.imageUrl?o("i",{staticClass:"el-icon-zoom-in avatar-icon"}):t._e()]),t._v(" "),o("a",{attrs:{href:"javascript:;"},on:{click:function(e){return t.zoomOut()}}},[t.imageUrl?o("i",{staticClass:"el-icon-zoom-out avatar-icon"}):t._e()]),t._v(" "),o("a",{attrs:{href:"javascript:;"},on:{click:function(e){return t.zoomReset()}}},[t.imageUrl?o("i",{staticClass:"el-icon-refresh-left avatar-icon"}):t._e()])])],1),t._v(" "),o("el-form-item",{attrs:{label:"演讲题目"}},[o("el-input",{model:{value:t.topic,callback:function(e){t.topic=e},expression:"topic"}})],1),t._v(" "),o("el-form-item",{attrs:{label:"字号调整（讲师姓名）"}},[o("div",{attrs:{span:12}},[o("a",{attrs:{href:"javascript:;"},on:{click:function(e){return t.nameFontAdd()}}},[o("i",{staticClass:"el-icon-zoom-in avatar-icon"})]),t._v(" "),o("a",{attrs:{href:"javascript:;"},on:{click:function(e){return t.nameFontMinus()}}},[o("i",{staticClass:"el-icon-zoom-out avatar-icon"})]),t._v(" "),o("a",{attrs:{href:"javascript:;"},on:{click:function(e){return t.nameFontReset()}}},[o("i",{staticClass:"el-icon-refresh-left avatar-icon"})])])]),t._v(" "),o("el-form-item",{attrs:{label:"字号调整（演讲题目）"}},[o("div",{attrs:{span:12}},[o("a",{attrs:{href:"javascript:;"},on:{click:function(e){return t.topicFontAdd()}}},[o("i",{staticClass:"el-icon-zoom-in avatar-icon"})]),t._v(" "),o("a",{attrs:{href:"javascript:;"},on:{click:function(e){return t.topicFontMinus()}}},[o("i",{staticClass:"el-icon-zoom-out avatar-icon"})]),t._v(" "),o("a",{attrs:{href:"javascript:;"},on:{click:function(e){return t.topicFontReset()}}},[o("i",{staticClass:"el-icon-refresh-left avatar-icon"})])])]),t._v(" "),o("el-form-item",[o("el-button",{attrs:{type:"primary"},on:{click:function(e){return t.download()}}},[t._v("\n            生成海报\n          ")])],1),t._v(" "),o("el-form-item",{staticClass:"info"},[o("i",{staticClass:"el-icon-service"}),t._v(" 本工具由 "),o("a",{attrs:{href:"http://github.com/Ovilia"}},[t._v("@Ovilia")]),t._v(" 开发，"),o("a",{attrs:{href:"mailto:oviliazhang@gmail.com"}},[t._v("问题反馈")])])],1)],1)],1)}),[],!1,null,null,null);e.default=component.exports}}]);