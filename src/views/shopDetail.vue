<template>
  <div id="shopDetail">
    <ywBar type="share" :goodsId="goodsId"></ywBar>
    <footer>
      <div class="shadow"></div>
      <div class="btnBox">
        <ywBtn text="询价"></ywBtn>
      </div>
    </footer>
    <div class="content">
      <div class="banner">
        <wc-swiper class='swiper' v-if="slides.length" :autoplay='false' :therehold="'10'" :style="{'padding-bottom': slides.length>1?'.78rem':'0'}">
          <wc-slide v-for="(item, key) in slides" :key="key">
            <div class='swiperImg' :style="{'background-image':'url('+item+')'}"></div>
          </wc-slide>
        </wc-swiper>
      </div>
      <div class="proInfo">
        <p class="proPrice">
          <span>￥</span>{{proPrice}}</p>
        <p class="proName">{{proName}}</p>
      </div>
      <!-- <div class="newOldLevel">
      <h6>新旧程度</h6>
    </div> -->
      <div class="proAttr">
        <h6>商品属性</h6>
        <ul>
          <li v-for='(item,index) in productAttributeList' :key="index">
            <div class="left">{{item.title}}</div>
            <div class="right">{{item.itemValueShow}}</div>
          </li>
        </ul>
      </div>
      <div class="shopInfo">
        <h6>商家信息</h6>
        <ul>
          <li>
            <div class="left">供货商</div>
            <div class="right">{{shopInfo.cnName}}</div>
          </li>
          <li>
            <div class="left">联系电话</div>
            <div class="right">{{shopInfo.linkPhone}}</div>
          </li>
          <li>
            <div class="left">联系地址</div>
            <div class="right">{{shopInfo.address}}</div>
          </li>
        </ul>
        <!-- <ywBtn text='查看商家' class="btnShop" @click.native="toShop()"></ywBtn> -->
      </div>
      <!-- <div class="baseInfo">
      <h6>基本参数</h6>
      <ul>
        <li>
          <div class="left">品牌</div>
          <div class="right">{{baseInfo.brand}}</div>
        </li>
        <li>
          <div class="left">系列</div>
          <div class="right">{{baseInfo.series}}</div>
        </li>
        <li>
          <div class="left">型号</div>
          <div class="right">{{baseInfo.model}}</div>
        </li>
        <li>
          <div class="left">序号</div>
          <div class="right">{{baseInfo.cnName}}</div>
        </li>
        <li>
          <div class="left">上市时间</div>
          <div class="right">{{baseInfo.marketTime}}</div>
        </li>
        <li>
          <div class="left">产地</div>
          <div class="right">{{baseInfo.address}}</div>
        </li>
      </ul>
    </div> -->
      <div class="proImg">
        <h6 style="padding-left:.3rem;padding-right:.3rem;">商品详情</h6>
        <div>
          <template v-for='(item,index) in otherImageUrlList'>
            <img :src="item" alt="" :key="index">
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    loadGoodsDetail
  } from '../api/api'
  export default {
    data() {
      return {
        slides: [], //轮播的banner图
        proName: '', //商品名称
        proPrice: '', //商品价格
        productAttributeList: [], //商品属性
        shopInfo: {}, //商家信息
        // baseInfo: {}, //基本信息
        otherImageUrlList: [], //商品图片
        goodsId:0,//商品id
        isApp:true,//是否处于有表app里
      }
    },
    methods: {
      detailInfo(data) {
        loadGoodsDetail(data).then(res => {
          let $this = this;
          this.ajaxResult(res, function () {
            $this.slides = res.data.body.imgUrlList;
            $this.proName = res.data.body.name;
            $this.proPrice = res.data.body.salePriceShow;
            //this.newOldLevel = res.data.body.newOldLevel;
            $this.productAttributeList = res.data.body.productAttributeList;
            $this.shopInfo = res.data.body.shopInfo;
            $this.otherImageUrlList = res.data.body.otherImageUrlList;
            // this.baseInfo = {
            //   'brand': res.data.body.brandShow,
            //   'series': res.data.body.seriesShow,
            //   'model': res.data.body.modelShow,
            //   // 'brand':res.data.body.brand,
            //   'marketTime': res.data.body.marketTime,
            //   // 'brand':res.data.body.brand,
            // }
          });
        }).catch((err)=>{
          this.toast(`HTTP ${err.response.status}`);
        });
      },
      //初始化数据
      initData() {
        this.slides = [];
        this.proName = '';
        this.proPrice = '';
        // this.newOldLevel = [];
        this.productAttributeList = [];
        this.shopInfo = {};
        // this.baseInfo = {};
        this.otherImageUrlList = [];
      },
      //查看商家
      toShop() {
        // this.$router.push({
        //   path: '/shopOnline',
        //   query: {

        //   }
        // });
      }
    },
    mounted() {
      let device = this.whichDevice();
      if (device != "androidApp" && device != "iosApp") {
        this.isApp = false;
      }
    },
    activated() {
      this.initData();
      this.goodsId = parseInt(this.$route.query.id);
      let goodsId = this.$route.query.id;
      this.detailInfo({
        'goodsId': goodsId
      });
    },
  };

</script>

<style scoped>
  #shopDetail {
    background: #fff;
    height: 100%;
  }

  .content {
    height: 100%;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
    /* padding-top: .3rem; */
    padding-bottom: 1.2rem;
  }

  .banner {
    min-height: 5.88rem;
    width: 100%;
    margin: auto;
  }

  .swiper {
    height: 5.88rem;
    box-sizing: initial;
  }

  .swiperImg {
    height: 100%;
    background-color: #fff;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
  }

  ul {
    list-style: none;
    padding: 0;
  }

  .proInfo,
  /* .newOldLevel, */

  .proAttr,
  .shopInfo {
    width: 6.9rem;
    margin: auto;
  }

  .proAttr ul li,
  .shopInfo ul li,
  .baseInfo ul li {
    display: flex;
    font-size: .24rem;
    margin-top: .2rem;
    line-height: .26rem;
  }

  .proAttr .left,
  .shopInfo .left,
  .baseInfo .left {
    width: 24%;
    color: #999;
    font-family: PingFangSC-Regular;
  }

  .proAttr .right,
  .shopInfo .right,
  .baseInfo .right {
    flex: 1;
    color: #333333;
  }



  .proInfo {
    padding-top: .4rem;
    padding-bottom: .4rem;
    border-bottom: 1px solid #f5f6f6;
  }

  .proPrice {
    font-family: DINAlternate-Bold;
    font-size: .24rem;
    color: #fe3d36;
    line-height: .24rem;
  }

  .proPrice span {
    font-size: .2rem;
  }

  .proName {
    font-family: PingFangSC-Medium;
    font-size: .28rem;
    color: #333333;
    line-height: .30rem;
    margin-top: .2rem;
  }

  .proImg {
    padding-top: .4rem;
    padding-bottom: .4rem;
  }

  .proImg img {
    width: 100%;
    display: block;
    margin-top: .25rem;
  }

  .btnShop {
    border: 1px solid #000000;
    border-radius: 22px;
    width: 1.6rem;
    height: .42rem;
    line-height: .4rem;
    font-family: PingFangSC-Regular;
    font-size: .24rem;
    color: #000000;
    margin: auto;
    margin-top: .4rem;
  }

  h6 {
    font-family: PingFangSC-Medium;
    font-size: .28rem;
    color: #333333;
    font-weight: normal;
    padding-bottom: .06rem;
  }

  .proAttr,
  .shopInfo {
    padding-top: .4rem;
    padding-bottom: .4rem;
    border-bottom: 1px solid #f5f6f6;

  }

  footer {
    position: absolute;
    width: 100%;
    bottom: 0;
  }

  footer .shadow {
    opacity: 0.25;
    background-image: linear-gradient(-180deg, rgba(238, 238, 238, 0.00) 11%, rgba(181, 181, 181, 0.96) 100%);
    height: .31rem;
  }

  footer .btnBox {
    height: 1rem;
    background: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  footer .btnBox button {
    background-image: linear-gradient(-57deg, #fb6455 10%, #fe3d36 100%);
    border-radius: 40px;
    width: 1.80rem;
    height: .6rem;
    color: #fff;
  }

</style>


<style>
  /* 主要用来修改组件css */

  #shopDetail .wc-slide {
    
  }

  #shopDetail .wc-pagination {
    height: auto;
    bottom: .3rem;
  }

  #shopDetail .wc-pagination .wc-dot {
    opacity: 0.2;
    background: #000000;
    width: 6px;
    height: 6px;
    border-radius: 10px;
  }

  #shopDetail .wc-pagination .wc-dot-active {
    background: #000000;
    width: 15px;
    opacity: 1;
  }

</style>
