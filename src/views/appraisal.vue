<template>
  <div id="appraisal">
    <!-- <ywBar :title="'有表优选'" type="white"></ywBar> -->
    <div v-if="isApp" class="topBtnRight" @click="shareUrl()"></div>
    <div class="content" ref="bodyhtml">
      <ywTopLoad v-if="!isApp"></ywTopLoad>
      <div class="header1"></div>
      <div class="headera">
        <ul class="nowrap">
          <li class="headera1"></li>
          <li class="headera2"></li>
          <li class="headera3"></li>
        </ul>
      </div>
      <div class="header2">
        <ywBtn text='添加微信' class="footBtn" v-clipboard:copy="message" v-clipboard:success="onCopy" v-clipboard:error="onError"></ywBtn>
      </div>
      <div class="header3"></div>
      <div class="header4"></div>
      <div class="header5"></div>
      <div class="header6"></div>
    </div>
  </div>
</template>

<script>
  import {
    queryActivitys
  } from '../api/api'
  export default {
    data() {
      return {
        infoList: [],
        isApp: false, //是否处于有表app里
        message: 'youwatchyunying',
      }
    },
    methods: {
      getData() {},
      handleScroll() {
        let scrollTop = this.$refs.bodyhtml.scrollTop;
        sessionStorage.setItem("pageAppraisal", scrollTop);
      },
      //分享网页
      shareUrl() {
        debugger
        let device = this.whichDevice();
        let url = window.location.href;
        let name = '有表鉴定';
        let desc = '有表·腕表养护服务';
        let imgUrl = 'https://youwatch.oss-cn-beijing.aliyuncs.com/system/youwatch_logo.png';
        if (device == "androidApp") {
          window.Android.getShareContent(name, url, desc, imgUrl);
        } else if (device == "iosApp") {
          window.webkit.messageHandlers.getShareContent.postMessage({
            title: name,
            url: url,
            content: desc,
            iconImg: imgUrl
          });
        }
      },
      // 复制成功
      onCopy(e) {
        this.$alert({
          title: ' ',
          content: '已经复制微信号：youwatchyunying，请到微信进行添加',
          btnText: '',
        });
      },
      // 复制失败
      onError(e) {
        this.toast(`复制失败`);
      },
    },
    mounted() {
      let device = this.whichDevice();
      if (device == "androidApp" || device == "iosApp") {
        this.isApp = true;
      }
    },
    activated() {
      let name = '有表鉴定';
      let desc = '有表·腕表养护服务';
      let imgUrl = 'https://youwatch.oss-cn-beijing.aliyuncs.com/system/youwatch_logo.png';
      let data = {
        'title': name,
        'desc': desc,
        'imgUrl': imgUrl,
        'url': window.location.href
      };
      this.wxShare(data);

      this.$refs.bodyhtml.addEventListener('scroll', this.handleScroll);
      if (!this.$route.meta.isBack) {
        // this.getData();
      } else {
        this.$refs.bodyhtml.scrollTop = sessionStorage.getItem("pageAppraisal");
      }
    },
  };

</script>

<style scoped>
  #appraisal {
    background: rgba(27, 27, 27, 1);
    height: 100%;
  }

  .content {
    height: 100%;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
    padding: 0 0 0 0;
    text-align: justify;
    font-size: .28rem;
  }

  .footBtn {
    position: relative;
    top: 5.2rem;
    width: 47%;
    left: 7%;
    height: 1rem;
    opacity: 0;
  }

  .header1 {
    width: 100%;
    height: 15.25rem;
    background: url('https://youwatch.oss-cn-beijing.aliyuncs.com/activity/appraisal/1.png') no-repeat top center/100%;
  }

  .header2 {
    width: 100%;
    height: 10.25rem;
    background: url('https://youwatch.oss-cn-beijing.aliyuncs.com/activity/appraisal/2.png') no-repeat top center/100%;
  }

  .header3 {
    width: 100%;
    height: 6.28rem;
    background: url('https://youwatch.oss-cn-beijing.aliyuncs.com/activity/appraisal/3.png') no-repeat top center/100%;
  }

  .header4 {
    width: 100%;
    height: 8.18rem;
    background: url('https://youwatch.oss-cn-beijing.aliyuncs.com/activity/appraisal/4.png') no-repeat top center/100%;
  }

  .header5 {
    width: 100%;
    height: 11.61rem;
    background: url('https://youwatch.oss-cn-beijing.aliyuncs.com/activity/appraisal/5.png') no-repeat top center/100%;
  }

  .header6 {
    width: 100%;
    height: 19.34rem;
    background: url('https://youwatch.oss-cn-beijing.aliyuncs.com/activity/appraisal/6.png') no-repeat top center/100%;
  }

  .headera {
    margin: 0.2rem 0 0.5rem 0;
    height: 4.3rem;
    overflow-y: hidden;
  }

  ul.nowrap {
    width: 100%;
    height: 4.5rem;
    white-space: nowrap;
    overflow-x: scroll;
    overflow-y: hidden;
    padding: 0 0.2rem 0 0.2rem;

  }

  ul.nowrap li {
    display: inline-block;
    margin: 0;
    width: 3.06rem;
    height: 4.3rem;
  }

  ul.nowrap li.headera1 {
    background: url('https://youwatch.oss-cn-beijing.aliyuncs.com/activity/appraisal/a1.png') no-repeat top center/100%;
  }

  ul.nowrap li.headera2 {
    margin: 0 0.12rem;
    background: url('https://youwatch.oss-cn-beijing.aliyuncs.com/activity/appraisal/a2.png') no-repeat top center/100%;
  }

  ul.nowrap li.headera3 {
    background: url('https://youwatch.oss-cn-beijing.aliyuncs.com/activity/appraisal/a3.png') no-repeat top center/100%;
  }

  .topBtnRight {
    width: .6rem;
    height: .6rem;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    background-image: url('https://youwatch.oss-cn-beijing.aliyuncs.com/app%2Factivity%2F180918%2Fshare.png');
    position: absolute;
    top: 0.3rem;
    right: 0.3rem;
    z-index: 2;
    background-color: #fff;
    border-radius: 1rem;
  }

</style>
