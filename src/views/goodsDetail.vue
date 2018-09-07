<template>
  <div id="goodsDetail">
    <scrollToTop :scTop="sctop" @click.native="goMyTop()" :style="{'position':'absolute','bottom': '0.5rem','right': '0.5rem'}"></scrollToTop>
    <ywBar v-if="isApp" type="share" :goodsId="goodsId"></ywBar>
    <div class="content" ref="content" style="padding-bottom:0;">
      <div class="banner">
        <div class='swiperImg' v-if="slides.length==1" :style="{'background-image':'url('+slides[0]+')'}"></div>
        <swiper class='swiper' v-if="slides.length>1" :options="swiperOption">
          <swiper-slide v-for="(item, key) in slides" :key="key">
            <div class='swiperImg' :style="{'background-image':'url('+item+')'}"></div>
          </swiper-slide>
          <!-- Optional controls -->
          <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
      </div>
      <div class="proInfo">
        <p class="proPrice">
          <span>￥</span>{{proPrice}}</p>
        <p class="proName">{{proName}}</p>
      </div>
      <div class="proAttr">
        <h6>新旧程度</h6>
        <ul>
          <li>
            <div class="left">商品成色</div>
            <div class="right">{{newOldLevel && newOldLevel.name?newOldLevel.name:''}}</div>
          </li>
        </ul>
      </div>
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
            <div class="right">{{shopInfo && shopInfo.cnName ? shopInfo.cnName :''}}</div>
          </li>
          <li>
            <div class="left">联系电话</div>
            <div class="right">{{shopInfo && shopInfo.linkPhone ? shopInfo.linkPhone :''}}</div>
          </li>
          <li>
            <div class="left">联系地址</div>
            <div class="right">{{shopInfo && shopInfo.address ? shopInfo.address :''}}</div>
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
          <div class="productClass" v-if="productDesc" v-html="productDesc">{{productDesc}}</div>
          <template v-for='(item,index) in otherImageUrlList'>
            <img :src="item" alt="" :key="index">
          </template>
        </div>
      </div>
      <div class="scrImg">
        <div class="img" style="background-image:url('https://youwatch.oss-cn-beijing.aliyuncs.com/app/1.png');height:3.8rem;"></div>
        <div class="img" style="background-image:url('https://youwatch.oss-cn-beijing.aliyuncs.com/app/2.png');height:3.2rem;"></div>
        <div class="img" style="background-image:url('https://youwatch.oss-cn-beijing.aliyuncs.com/app/3.png');height:12.86rem;"></div>
        <!-- <img class="img" src="https://youwatch.oss-cn-beijing.aliyuncs.com/app/3.png" alt=""> -->
      </div>
    </div>
  </div>
</template>

<script>
  import {
    loadMyGoodsDetail,
    askPriceApp
  } from '../api/api'
  export default {
    data() {
      return {
        sctop: false, //滚动到顶部的按钮是否出现
        slides: [], //轮播的banner图
        proName: '', //商品名称
        proPrice: '', //商品价格,sall代理价，shopPurchase平台采购价，retail零售价
        productAttributeList: [], //商品属性
        shopInfo: {}, //商家信息
        // baseInfo: {}, //基本信息
        otherImageUrlList: [], //商品图片
        goodsId: 0, //商品id
        shopId: 0, //商家id
        isApp: true, //是否处于有表app里
        productDesc: '', //商品描述
        newOldLevel:{},//新旧程度
        swiperOption: {
          loop: true,
          pagination: {
            el: '.swiper-pagination',
            clickable: true,
            clickableClass: 'my-pagination-clickable',
          },
        }
      }
    },
    methods: {
      detailInfo(data) {
        loadMyGoodsDetail(data).then(res => {
          let $this = this;
          this.ajaxResult(res, function () {
            $this.shopId = res.data.body.shopId;
            $this.slides = res.data.body.imgUrlList.length > 0 ? res.data.body.imgUrlList : [
              'https://youwatch.oss-cn-beijing.aliyuncs.com/app/img_default.png'
            ];
            $this.proName = res.data.body.name;
            $this.proPrice = res.data.body.salePrice;
            $this.productAttributeList = res.data.body.productAttributeList;
            $this.shopInfo = res.data.body.shopInfo;
            $this.otherImageUrlList = res.data.body.otherImageUrlList;
            $this.goodsId = res.data.body.id;
            $this.productDesc = res.data.body.productDesc;
            $this.newOldLevel = res.data.body.newOldLevel;
            // this.baseInfo = {
            //   'brand': res.data.body.brandShow,
            //   'series': res.data.body.seriesShow,
            //   'model': res.data.body.modelShow,
            //   // 'brand':res.data.body.brand,
            //   'marketTime': res.data.body.marketTime,
            //   // 'brand':res.data.body.brand,
            // }
          });
        }).catch((err) => {
          this.axiosCatch(err, "on");
        });
      },
      //初始化数据
      initData() {
        this.slides = [];
        this.proName = '';
        this.proPrice = '';
        this.productAttributeList = [];
        this.shopInfo = {};
        // this.baseInfo = {};
        this.otherImageUrlList = [];
        this.sctop = false;
      },
      //询价
      askPrice(goodsId, shopId) {
        askPriceApp({
          "targetShopId": shopId,
          "goodsId": goodsId
        }).then(res => {
          let $this = this;
          this.$alert({
            title: '', // 默认无标题
            content: res.data.message,
            btnText: '',
          })
        }).catch((err) => {
          this.axiosCatch(err, "load");
        });
      },
      //查看商家
      toShop() {
        // this.$router.push({
        //   path: '/shopOnline',
        //   query: {

        //   }
        // });
      },
      goMyTop() {
        this.goTop(this.$refs.content, 0);
      },
      //页面滚动事件
      handleScroll() {
        let scrollTop = this.$refs.content.scrollTop;
        if (scrollTop > 300) {
          this.sctop = true;
        } else {
          this.sctop = false;
        }
      }
    },
    mounted() {
      let device = this.whichDevice();
      if (device != "androidApp" && device != "iosApp") {
        this.isApp = false;
      }
      this.$refs.content.addEventListener('scroll', this.handleScroll);
    },
    activated() {
      this.initData();
      let goodsId = this.$route.query.goodsAgentId;
      this.detailInfo({
        'agentId': goodsId
      });
    },
  };

</script>

<style scoped>
  #goodsDetail {
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
    width: 100%;
    margin: auto;
    min-height: 7.5rem;
  }

  .swiper {
    height: 7.5rem;
    box-sizing: initial;
  }

  .swiperImg {
    height: 7.5rem;
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
    font-size: .36rem;
    color: #fe3d36;
    line-height: .24rem;
  }

  .proPrice span {
    font-size: .24rem;
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
    margin-top: .2rem;
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

  .scrImg {
    padding: 0 0.3rem;
  }

  .scrImg .img {
    width: 100%;
    background-position: center;
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }

  footer {
    position: absolute;
    width: 100%;
    bottom: 0;
    z-index: 15;
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

  .productClass {
    padding: 0.1rem 0.3rem 0 0.3rem;
  }

</style>


<style>
  /* 主要用来修改组件css */

  #goodsDetail .productClass span {
    font-size: 0.26rem !important;
  }

  #goodsDetail .productClass img {
    width: 7.5rem!important;
    height: auto !important;
    margin-top: 0.1rem;
    margin-bottom: 0.1rem;
    margin-left:-0.3rem;
  }

  #goodsDetail .productClass table {
    width: 100% !important;
  }

  #goodsDetail .swiper-pagination-bullet {
    width: 4px;
    height: 4px;
    border-radius: 4px;
  }

  #goodsDetail .swiper-container-horizontal>.swiper-pagination-bullets .swiper-pagination-bullet {
    margin: 0 2px;
  }

  #goodsDetail .swiper-pagination-bullet-active {
    background: #000000;
    width: 10px;
    border-radius: 10px;
  }

  #goodsDetail .swiper-pagination-bullet,
  #goodsDetail .swiper-pagination-bullet:focus,
  #goodsDetail .swiper-pagination-bullet:hover,
  #goodsDetail .swiper-pagination-bullet:active,
  #goodsDetail .swiper-pagination-bullet:visited,
  #goodsDetail .swiper-pagination-bullet:link {
    outline: none;
  }

</style>
