<template>
  <div id="policy">
    <ywBar :title="'有表商家服务号'" :isShow="isApp" style="border-bottom:1px solid #f5f6f6;background: #fff;"></ywBar>
    <div class="content" :style="{'padding-top':isApp?'auto':'0.5rem'}">
      <img src="https://youwatch.oss-cn-beijing.aliyuncs.com/app/qrcode.jpg" alt="">
      <ywBtn text="保存二维码到本地" class="downBtn" @click.native="downs"></ywBtn>
      <p style="color:#333333;">扫码关注或在微信中“添加朋友”内点击“查找公众号”，搜索“有表商家服务”关注我们。
      </p>
    </div>
  </div>
</template>

<script>
  import {
    helpCenterList
  } from '../api/api'
  export default {
    data() {
      return {
        isApp: true,
      }
    },
    methods: {
      downs() {
        let device = this.whichDevice();
        if (device == "androidApp") {
          window.Android.loadImg('https://youwatch.oss-cn-beijing.aliyuncs.com/app/qrcode.jpg');
        } else if (device == "iosApp") {
          window.webkit.messageHandlers.loadImg.postMessage({
            'url': 'https://youwatch.oss-cn-beijing.aliyuncs.com/app/qrcode.jpg'
          });
        }
      }
    },
    mounted() {

    },
    activated() {
      let device = this.whichDevice();
      if (device != "androidApp" && device != "iosApp") {
        // this.isApp = false;
      }
    },
    deactivated: function () {
      console.log("我已经离开了！");
    },
  };

</script>

<style scoped>
  #policy {
    background: #ffffff;
    height: 100%;
  }

  .content {
    height: 100%;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
    padding: 1.3rem 0.67rem 0.5rem 0.67rem;
    text-align: justify;
    font-size: .28rem;
  }

  ul {
    list-style: none;
    padding: 0;
  }

  ul li {
    padding-top: 0.5rem;
  }

  ul h6 {
    font-size: .28rem;
    font-weight: normal;
  }

  ul p {
    color: #999999;
    padding-top: 0.15rem;
  }

  img {
    width: 65%;
    display: block;
    margin: auto;
  }

  .downBtn {
    border: 1px solid #333;
    width: 3rem;
    color: #333;
    border-radius: 0.1rem;
    margin: 0.2rem auto 0.3rem;
  }

</style>
