<template>
  <ul class="proList">
    <template v-for="(item,index) in items">
      <li :key="index" @click="jumpHref(item.id,item.detailUrl)">
        <div class="imgDiv">
          <img v-lazy="item.image+'?x-oss-process=image/resize,limit_0,m_fill,w_400,h_400'" width="100%" height="100%">
        </div>
        <div class="infoBox">
          <p class="itName">{{item.name}}</p>
          <p class="itPrice">
            <span>￥</span>{{item.salePriceShow}}</p>
          <p class="itShopName">{{item.shopCnName}}</p>
          <p v-if="isShare" class="shareIcon" :style="{'background-image':'url('+imgShare+')'}" @click="share(item.goodsId)"></p>
        </div>
      </li>
    </template>

  </ul>
</template>
<script>
// isShare 是否可分享（是否是app）
// isSelf 是否是自个商家
  import imgShare from '@/assets/imgs/icon_share2.png'
  export default {
    props: {
      items: {
        type: Array,
        default: function () {
          return []
        }
      },
      isShare: {
        type: Boolean,
        default: function () {
          return false
        }
      },
      isSelf: {
        type: Boolean,
        default: function () {
          return false
        }
      },
    },
    data() {
      return {
        imgShare: imgShare,
      }
    },
    methods: {
      jumpHref(id,url) {
        this.pagePointBurial('wdmd_jrsx','我的门店中进入商品详情页');
        let pathMy = this.isSelf ? '/goodsDetail':'/goodsDetHv';
        let obj = {'goodsAgentId':id};
        // let pathUrl = url;
        this.$emit('headCallBack', false);
        this.$router.push({
          path: pathMy,
          query: obj
        });
      },
      share(id) {
        this.pagePointBurial('wdmd_spfx','我的门店中商品分享按钮');
        event.stopPropagation();
        let device = this.whichDevice();
        if (device == "androidApp") {
          window.Android.getGoodsId(id);
        } else if (device == "iosApp") {
           window.webkit.messageHandlers.getGoodsId.postMessage(id);
        }
      }
    },
    mounted() {
    },
  }

</script>
<style scoped>
  ul.proList {
    width: 100%;
    list-style: none;
    padding: 0;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    background: #fafafa;
  }

  ul.proList li {
    width: 3.73rem;
    padding: .22rem .2rem;
    background: #fff;
    margin-top: .04rem;
  }

  ul.proList li .imgDiv {
    height: 3.32rem;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }

  ul.proList li .infoBox {
    margin-top: .2rem;
    padding: 0.2rem 0.08rem 0.1rem 0.08rem;
    position: relative;
  }

  ul.proList li .itName {
    font-size: .24rem;
    color: #333333;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  ul.proList li .itPrice {
    margin-top: .24rem;
    font-family: DINAlternate-Bold;
    font-size: .24rem;
    color: #fe3d36;
  }

  ul.proList li .itPrice span {
    font-size: .2rem;
  }

  ul.proList li .itShopName {
    color: #999;
    font-size: .24rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    display: none;
  }

  ul.proList li .shareIcon {
    width: .48rem;
    height: .48rem;
    border-radius: 100%;
    position: absolute;
    right: .1rem;
    bottom: 0;
    background-repeat: no-repeat;
    background-position: center;
    background-size: 100% 100%;
  }

</style>
<style>
  .container {
    max-width: 100% !important;
  }

</style>
