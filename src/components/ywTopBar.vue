<template>
  <header v-if="type=='title' && isShow">
    <mu-icon value="chevron_left" right class="iconBtn" @click="historyBack()"></mu-icon>
    <h1>{{title}}</h1>
    <span class="resetBtn"></span>
  </header>
  <header v-else-if="type=='share' && isShow" class="shareHeader">
    <span class="iconShareBtn iconShareBtn1" @click="historyBack()"></span>
    <span v-if="shareBtnShow" class="iconShareBtn iconShareBtn2" @click="share(goodsId,goodsName,goodsDesc,goodsImg)"></span>
  </header>
  <header v-else-if="type=='white' && isShow" class="whiteHeader">
    <mu-icon value="chevron_left" right class="iconBtn" @click="historyBack()"></mu-icon>
    <h1>{{title}}</h1>
    <span v-if="operateTxt==''" class="resetBtn"></span>
    <span v-show="operateTxt!=''" :class="{'no':!isClick}" class="resetBtn" @click="operateFuc">{{operateTxt}}</span>
  </header>
</template>
<script>
  // title 只有返回按钮和标题
  // share 只有返回按钮和分享按钮
  // goodsId 商品id
  // shareBtnShow 分享按钮是否显示
  //operateTxt bar右上角的文字
  //operateFuc bar右上角的执行方法
  //isClick bar右上角是否可点
  //finishView 返回键是否要关闭webview
  //isShow topBar是否显示
  //backFuc 返回按钮的额外操作
  //hasBackFuc 返回按钮是否进行额外操作，backFuc存在即为true
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
      goodsId: {
        type: Number,
        default: 0
      },
      goodsName: {
        type: String,
        default: ""
      },
      goodsDesc: {
        type: String,
        default: "给你推荐一个不错的手表，快来看看吧~"
      },
      goodsImg: {
        type: String,
        default: ""
      },
      shareBtnShow: {
        type: Boolean,
        default: true
      },
      operateTxt: {
        type: String,
        default: ''
      },
      operateFuc: {
        type: Function,
        default: function () {
          return function () {}
        }
      },
      backFuc: {
        type: Function,
        default: function () {}
      },
      hasBackFuc: {
        type: Boolean,
        default: false
      },
      isClick: {
        type: Boolean,
        default: true
      },
      finishView: {
        type: Boolean,
        default: false
      },
      isShow: {
        type: Boolean,
        default: true
      },
    },
    methods: {
      historyBack() {
        if (this.hasBackFuc) {
          this.backFuc();
        } else {
          this.toBack();
        }
      },
      toBack() {
        let device = this.whichDevice();
        let index = JSON.parse(window.sessionStorage.getItem("pageIndex"));
        //from是上一页，to是当前页
        if ((index.to == null && index.from == null) || (index.to == 1 && index.from > index.to) || this.finishView) {
          if (device == "androidApp") {
            window.Android.finish();
          } else if (device == "iosApp") {
            //ActionName：原生中对应的方法名；parameter：回传的参数
            // window.webkit.messageHandlers.ActionName.postMessage('parameter');
            window.webkit.messageHandlers.finish.postMessage('');
          } else {
            window.history.back();
          }
        } else {
          window.history.back();
        }
      },
      share(id, name, desc, imgUrl) {
        this.pagePointBurial('spxq_spfx', '商品详情页中商品分享按钮');
        let url = window.location.href.split("#/")[0] + "#/goodsDetHv?goodsId=" + id;
        let device = this.whichDevice();
        if (device == "androidApp") {
          try {
            window.Android.getShareInfo(id, url, name, desc, imgUrl);
          } catch (err) {
            window.Android.getGoodsId(id);
          }
        } else if (device == "iosApp") {
          try {
            window.webkit.messageHandlers.getShareInfo.postMessage({
              id: id,
              title: name,
              content: desc,
              url: url,
              iconImg: imgUrl
            });
          } catch (err) {
            window.webkit.messageHandlers.getGoodsId.postMessage(id);
          }
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

  header .resetBtn {
    font-size: .28rem;
    color: #000;
  }

  header .resetBtn.no {
    pointer-events: none;
    opacity: 0.2;
  }

  .shareHeader {
    background: none;
  }

  .whiteHeader {
    border-bottom: 1px solid #f5f6f6;
    background: #fff;
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
