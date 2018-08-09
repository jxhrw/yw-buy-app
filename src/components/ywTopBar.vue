<template>
  <header v-if="type=='title'">
    <mu-icon value="chevron_left" right class="iconBtn" @click="historyBack()"></mu-icon>
    <h1>{{title}}</h1>
    <span class="resetBtn"></span>
  </header>
  <header v-else-if="type=='share'" class="shareHeader">
    <span class="iconShareBtn iconShareBtn1" @click="historyBack()"></span>
    <span class="iconShareBtn iconShareBtn2" @click="share(goodsId)"></span>
  </header>
</template>
<script>
  // title 只有返回按钮和标题
  // share 只有返回按钮和分享按钮
  // goodsId 商品id
  // isFinish app为ture-退出webview,其他为false-返回上一页
  export default {
    props: {
      type: {
        type: String,
        default: "title"
      },
      title: {
        type: String,
        default: ""
      },
      isFinish: {
        type: Boolean,
        default: false
      },
      goodsId: {
        type: Number,
        default: 0
      }
    },
    methods: {
      historyBack() {
        if (this.isFinish) {
          let device = this.whichDevice();
          if (device == "androidApp") {
            window.Android.finish();
          } else if (device == "iosApp") {

          }
        } else {
          window.history.back();
        }
      },
      share(id) {
        let device = this.whichDevice();
        if (device == "androidApp") {
          window.Android.getGoodsId(id);
        } else if (device == "iosApp") {

        }
      }
    }
  }

</script>

<style scoped>
  header {
    position: absolute;
    right: 0;
    width: 100%;
    text-align: center;
    top: 0;
    height: 0.9rem;
    background: #fafafa;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 .3rem;
    z-index: 12;
    /* border-bottom: 1px solid #e6e6e6; */
  }

  header span {
    display: block;
    width: .6rem;
    font-family: PingFangSC-Medium;
    font-size: .28rem;
    color: #fe3d36;
    text-align: center;
  }

  header .iconBtn {
    font-size: .5rem;
    color: #000;
  }

  header h1 {
    font-family: PingFangSC-Medium;
    font-size: .33rem;
    color: #333333;
    letter-spacing: -0.8px;
    text-align: center;
    width: 50%;
    font-weight: normal;
  }

  .shareHeader {
    background: none;
  }

  .iconShareBtn {
    width: .6rem;
    height: .6rem;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
  }

  .iconShareBtn1 {
    background-image: url('../assets/imgs/icon_forward.png');
  }

  .iconShareBtn2 {
    background-image: url('../assets/imgs/icon_share.png');
  }

</style>
