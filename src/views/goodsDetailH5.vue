<template>
  <div id="goodsDetail">
    <scrollToTop :scTop="sctop" @click.native="goMyTop()" :style="{'position':'absolute','bottom': '0.5rem','right': '0.5rem'}"></scrollToTop>
    <ywBar v-if="isApp" type="share" :goodsId="goodsId"></ywBar>
    <footer v-if="false">
      <div class="shadow"></div>
      <div class="btnBox">
        <ywBtn :class="{'no':!canClick || homeGoods=='1'}" class="cBtn cBtn-ans" text="询价" @click.native="askPrice(goodsId,shopId)"></ywBtn>
        <ywBtn :class="{'no':!canClick || homeGoods=='1' || goodsStock<1}" class="cBtn cBtn-buy" :text="goodsStock<1?'已售罄':'立即购买'"
          @click.native="toBuy(goodsId,shopId)"></ywBtn>
      </div>
    </footer>
    <div class="content" ref="content" :style="{'padding-bottom': '0.2rem'}">
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
            <div class="right">{{newOldLevel && newOldLevel.name?newOldLevel.name:'—'}}</div>
          </li>
        </ul>
      </div>
      <div class="proAttr">
        <h6>商品属性</h6>
        <ul>
          <li>
            <div class="left">机芯类型</div>
            <div class="right">{{propsName.jixinleixing || '—'}}</div>
          </li>
          <li>
            <div class="left">表壳材质</div>
            <div class="right">{{propsName.watch_metal || '—'}}</div>
          </li>
          <li>
            <div class="left">表带材质</div>
            <div class="right">{{propsName.dai_metal || '—'}}</div>
          </li>
          <li>
            <div class="left">表盘形状</div>
            <div class="right">{{propsName.pan_xingzhuang || '—'}}</div>
          </li>
          <li>
            <div class="left">表盘颜色</div>
            <div class="right">{{propsName.dial_color || '—'}}</div>
          </li>
          <li>
            <div class="left">复杂功能</div>
            <div class="right">{{propsName.complex_function || '—'}}</div>
          </li>
          <li>
            <div class="left">适用人群</div>
            <div class="right">{{propsName.sex || '—'}}</div>
          </li>
          <li>
            <div class="left">适用场合</div>
            <div class="right">{{propsName.changhe || '—'}}</div>
          </li>
          <li>
            <div class="left">产地</div>
            <div class="right">{{propsName.manufacturePlace || '—'}}</div>
          </li>
        </ul>
      </div>
      <div class="shopInfo">
        <h6>商家信息</h6>
        <ul>
          <li>
            <div class="left">供货商</div>
            <div class="right">{{shopInfo && shopInfo.cnName ? shopInfo.cnName :'—'}}</div>
          </li>
          <li>
            <div class="left">联系电话</div>
            <div class="right">{{shopInfo && shopInfo.linkPhone ? shopInfo.linkPhone :'—'}}</div>
          </li>
          <li>
            <div class="left">联系地址</div>
            <div class="right">{{shopInfo && shopInfo.address ? shopInfo.address :'—'}}</div>
          </li>
        </ul>
        <!-- <ywBtn text='查看商家' class="btnShop" @click.native="toShop()"></ywBtn> -->
      </div>
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
    loadMyGoodsDetailForShare,
    askPriceApp
  } from '../api/api'
  export default {
    data() {
      return {
        device: '', //设备
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
        canClick: true, //按钮是否可点击
        productDesc: '', //商品描述
        newOldLevel: {}, //新旧程度
        goodsStock: 1, //商品库存
        homeGoods: 0, //自家商品，0不是自家，1是自家
        propsName:{},//商品属性
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
        loadMyGoodsDetailForShare(data).then(res => {
          let $this = this;
          this.ajaxResult(res, function () {
            $this.shopId = res.data.body.shopId;
            $this.slides = res.data.body.imgUrlList.length > 0 ? res.data.body.imgUrlList : [
              'https://youwatch.oss-cn-beijing.aliyuncs.com/app/img_default.png'
            ];
            $this.proName = res.data.body.name;
            $this.proPrice = res.data.body.retailPrice || res.data.body.salePrice;
            $this.productAttributeList = res.data.body.productAttributeList;
            $this.shopInfo = res.data.body.shopInfo;
            $this.otherImageUrlList = res.data.body.otherImageUrlList;
            $this.goodsId = res.data.body.id;
            $this.productDesc = res.data.body.productDesc;
            $this.newOldLevel = res.data.body.newOldLevel;
            $this.goodsStock = res.data.body.goodsStock;
            $this.homeGoods = res.data.body.homeGoods;
            $this.propsName = res.data.body.propsName;
            $this.propsName.manufacturePlace = res.data.body.manufacturePlace;

            //微信分享
            let data = {
              'title': $this.shopInfo.cnName,
              'desc': $this.proName,
              'imgUrl': $this.slides[0],
              'url': window.location.href
            };
            console.log(data);
            $this.wxShare(data);
          });
        }).catch((err) => {
          this.axiosCatch(err);
        });
      },
      //初始化数据
      dataInit() {
        this.slides = [];
        this.proName = '';
        this.proPrice = '';
        this.productAttributeList = [];
        this.shopInfo = {};
        // this.baseInfo = {};
        this.otherImageUrlList = [];
        this.sctop = false;
        this.propsName = {};
      },
      //询价
      askPrice(goodsId, shopId) {
        // if (this.device=="iosApp" && this.shopInfo) {
        //   this.goTel(this.shopInfo.linkPhone);
        //   return false;
        // }
        this.canClick = false;
        askPriceApp({
          "targetShopId": shopId,
          "goodsId": goodsId
        }).then(res => {
          let $this = this;
          this.canClick = true;
          this.$alert({
            title: '', // 默认无标题
            content: res.data.message,
            btnText: '',
          })
        }).catch((err) => {
          this.canClick = true;
          this.axiosCatch(err, "load");
        });
      },
      //购买
      toBuy(goodsId, shopId) {
        this.$router.push({
          path: '/orderFirm',
          query: {
            'goodsId': goodsId
          }
        });
      },
      //查看商家
      toShop() {

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
      this.device = device;
      if (device != "androidApp" && device != "iosApp") {
        this.isApp = false;
      }
      this.$refs.content.addEventListener('scroll', this.handleScroll);
    },
    activated() {
      this.dataInit();
      let agentId = this.$route.query.goodsAgentId;
      let goodsId = this.$route.query.goodsId;
      let obj = {};
      if (agentId) {
        obj = {
          'agentId': agentId
        }
      } else if (goodsId) {
        obj = {
          'goodsId': goodsId
        }
      }
      this.detailInfo(obj);
    },
  };

</script>

<style scoped>
  #goodsDetail {
    background: #fff;
    height: 100%;
  }

  .cBtn.no {
    pointer-events: none;
    opacity: 0.2;
  }

  .cBtn-ans {
    border-top-right-radius: 0 !important;
    border-bottom-right-radius: 0 !important;
    background: linear-gradient(180deg, rgba(255, 139, 79, 1) 0%, rgba(255, 116, 60, 1) 100%) !important;
  }

  .cBtn-buy {
    border-top-left-radius: 0 !important;
    border-bottom-left-radius: 0 !important;
    background: linear-gradient(62deg, rgba(251, 100, 85, 1) 0%, rgba(254, 61, 54, 1) 100%) !important;
    margin-left: 1px;
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
    line-height: 0.6rem;
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
    width: 7.5rem !important;
    height: auto !important;
    margin-top: 0.1rem;
    margin-bottom: 0.1rem;
    margin-left: -0.3rem;
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
