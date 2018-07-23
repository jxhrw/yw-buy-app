<template>
  <div id="shopDetail">
    <div class="banner">
      <wc-swiper class='swiper' v-if="slides.length" :autoplay='false'>
        <wc-slide v-for="(item, key) in slides" :key="key">
          <div class='swiperImg' :style="{'background-image':'url('+item+')'}"></div>
        </wc-slide>
      </wc-swiper>
    </div>

    <div class="proInfo">
      <p class="proPrice">{{proPrice}}</p>
      <p class="proName">{{proName}}</p>
    </div>
    <div class="newOldLevel">
      <h6>新旧程度</h6>
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
    </div>
    <div class="baseInfo">
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
    </div>
    <div class="proImg">
      <h6>商品图片</h6>
      <div>
        <template v-for='(item,index) in otherImageUrlList'>
          <img :src="item" alt="" :key="index">
        </template>
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
        newOldLevel: [], //新旧程度
        productAttributeList: [], //商品属性
        shopInfo: {}, //商家信息
        baseInfo: {}, //基本信息
        otherImageUrlList: [], //商品图片
      }
    },
    methods: {
      detailInfo(data) {
        loadGoodsDetail(data).then(res => {
          this.slides = res.data.body.imgUrlList;
          this.proName = res.data.body.name;
          this.proPrice = '￥' + res.data.body.salePriceShow;
          this.newOldLevel = res.data.body.newOldLevel;
          this.productAttributeList = res.data.body.productAttributeList;
          this.shopInfo = res.data.body.shopInfo;
          this.otherImageUrlList = res.data.body.otherImageUrlList;
          this.baseInfo = {
            'brand': res.data.body.brand,
            'series': res.data.body.series,
            'model': res.data.body.model,
            // 'brand':res.data.body.brand,
            'marketTime': res.data.body.marketTime,
            // 'brand':res.data.body.brand,
          }
        });
      },
      //初始化数据
      initData() {
        this.slides = [];
        this.proName = '';
        this.proPrice = '';
        this.newOldLevel = [];
        this.productAttributeList = [];
        this.shopInfo = {};
        this.baseInfo = {};
        this.otherImageUrlList = [];
      }
    },
    mounted() {

    },
    activated() {
      this.initData();
      let goodsId = this.$route.query.id;
      this.detailInfo({
        'goodsId': goodsId
      });
    },
  };

</script>

<style scoped>
  .swiper {
    height: 100%;
  }

  /* 以上组件css，以下自定义css */

  .banner {
    height: 5rem;
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
  h6{
      padding: .08rem 0;
      font-weight: normal;
      font-size: .26rem;
  }

  .proInfo,
  .newOldLevel,
  .proAttr,
  .shopInfo,
  .baseInfo,
  .proImg {
    padding: 0 .3rem;
  }

  .proAttr ul li,
  .shopInfo ul li,
  .baseInfo ul li {
    display: flex;
    padding: 0.08rem 0;
    font-size: .24rem;
  }
  .proAttr .left,
  .shopInfo .left,
  .baseInfo .left {
    width: 25%;
    color: #999;
  }
  .proAttr .right,
  .shopInfo .right,
  .baseInfo .right {
    flex: 1;
  }

  .proPrice {
    color: #fb8400;
  }
.proImg img{
    width: 100%;
}
</style>


<style>
  /* 主要用来修改组件css */

  #shopDetail .wc-pagination .wc-dot {
    background: #fff;
  }

  #shopDetail .wc-pagination .wc-dot-active {
    background: #000;
  }

</style>
