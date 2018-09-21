<template>
  <div id="goodsDetail">
    <scrollToTop :scTop="sctop" @click.native="goMyTop()" :style="{'position':'absolute','bottom': power>=0?'1.5rem':'0.5rem','right': '0.5rem'}"></scrollToTop>
    <ywBar v-if="isApp" type="share" :goodsId="goodsId" :shareBtnShow="false"></ywBar>
    <footer v-if="power>=0">
      <div class="shadow"></div>
      <div class="btnBox">
        <template v-if="power==0">
          <ywBtn :class="{'no':!canClick || homeGoods=='1'||proPrice==-1}" class="cBtn cBtn-ans" text="询价" @click.native="askPrice(goodsId,shopId)"></ywBtn>
          <ywBtn :class="{'no':!canClick || homeGoods=='1'||proPrice==-1 || goodsStock<1}" class="cBtn cBtn-buy" :text="goodsStock<1?'已售罄':'立即购买'"
            @click.native="toBuy(goodsId,shopId)"></ywBtn>
        </template>
        <template v-if="power==1">
          <ywBtn :class="{'no':!canClick || homeGoods=='1'||proPrice==-1}" class="cBtn cBtn-ans radius" text="询价" @click.native="askPrice(goodsId,shopId)"></ywBtn>
        </template>
        <template v-if="power==2">
          <ywBtn :class="{'no':!canClick || homeGoods=='1'||proPrice==-1 || goodsStock<1}" class="cBtn cBtn-buy radius" :text="goodsStock<1?'已售罄':'立即购买'"
            @click.native="toBuy(goodsId,shopId)"></ywBtn>
        </template>

      </div>
    </footer>

    <div class="content" ref="content">
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
      <div class="rush_buy" v-if="pageUrl=='goodsDetRush'">
        <div class="rb_price">
          <span class="rb_p1">每日捡漏</span>
          <span class="rb_p2" v-if="rushBuyStatus">{{rushBuyStatus=='1'?'抢购结束':(rushBuyStatus=='2'?'抢购中':'抢购价 ￥')}}</span>
          <span class="rb_p3" v-if="rushBuyStatus=='3'||rushBuyStatus=='4'">{{rushBuyGoodsItemVO.grabPrice}}</span>
        </div>
        <div class="rb_time" v-if="countDownShow">
          <span class="rb_t1">{{rushBuyStatus=='3'||rushBuyStatus=='4'?'距开始':'距结束'}}</span>
          <span class="rb_t2">
            <i>{{10>countDown.hours?'0':''}}{{countDown.hours}}</i> :
            <i>{{10>countDown.minutes?'0':''}}{{countDown.minutes}}</i> :
            <i>{{10>countDown.seconds?'0':''}}{{countDown.seconds}}</i>
          </span>
          <span class="rb_t3"></span>
        </div>
      </div>
      <div class="proInfo">
        <div class="proBox">
          <p class="pro_price" v-if="proPrice==-1">
            <span>登录查看同行价</span>
          </p>
          <p class="pro_price" v-else>
            <span v-if='proPrice'>￥</span>{{proPrice}}
            <del v-if="retailPrice">￥{{retailPrice}}</del>
          </p>
          <p class="pro_name">{{proName}}</p>
        </div>
        <div class="collection" @click="collectFuc" v-if="pageUrl!='goodsDetHv' && isCollect!=null">
          <span class="heart_shape" :class="{'selected':isCollect=='1'}"></span>
          <span>{{isCollect=='1'?'已收藏':'收藏'}}</span>
        </div>
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
        <ywBtn v-if="proPrice==-1" text='登录后查看商家信息' class="btnShop" @click.native="toSignIn()"></ywBtn>
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
    loadGoodsDetail, //商品详情
    loadMyGoodsDetailForShare, //分享后的商品详情
    loadRushBuyGoodsDetail, //抢购商品详情
    collect, //收藏
    cancelCollect, //取消收藏
    askPriceApp, //询价
  } from '../api/api'
  export default {
    data() {
      return {
        device: '', //设备
        pageUrl: '', //当前页面，存在的值，goodsDetail2：详情app，goodsDetHv：详情h5,goodsDetRush：详情抢购
        sctop: false, //滚动到顶部的按钮是否出现
        slides: [], //轮播的banner图
        proName: '', //商品名称
        proPrice: '', //商品价格,sall代理价，shopPurchase平台采购价，retail零售价
        retailPrice: '', //抢购价格的原先价格
        rushBuyGoodsItemVO: {}, //抢购信息
        rushBuyStatus: '', //抢购状态
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
        isCollect: null, //该商品是否收藏，0未收藏，1已收藏，null没有收藏功能
        propsName:{},//商品属性
        power: 0, //权限，-1都隐藏，0都出现，1询价单个出现，2购买单个出现
        countDownShow: true, //倒计时显示
        countDown: { //倒计时
          hours: 0,
          minutes: 0,
          seconds: 0
        },
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
        this.dataInterface(data).then(res => {
          let $this = this;
          this.ajaxResult(res, function () {
            $this.shopId = res.data.body.shopId;
            $this.slides = res.data.body.imgUrlList.length > 0 ? res.data.body.imgUrlList : [
              'https://youwatch.oss-cn-beijing.aliyuncs.com/app/img_default.png'
            ];
            $this.proName = res.data.body.name;
            $this.productAttributeList = res.data.body.productAttributeList;
            $this.shopInfo = res.data.body.shopInfo;
            $this.otherImageUrlList = res.data.body.otherImageUrlList;
            $this.goodsId = res.data.body.id;
            $this.productDesc = res.data.body.productDesc;
            $this.newOldLevel = res.data.body.newOldLevel;
            $this.goodsStock = res.data.body.goodsStock;
            $this.homeGoods = res.data.body.homeGoods;
            $this.isCollect = res.data.body.isCollect;
            $this.propsName = res.data.body.propsName;
            $this.propsName.manufacturePlace = res.data.body.manufacturePlace;
            $this.rushBuyGoodsItemVO = res.data.body.rushBuyGoodsItemVO;
            if ($this.pageUrl == 'goodsDetail2') {
              $this.proPrice = res.data.body.shopPurchasePrice;
            }
            if ($this.pageUrl == 'goodsDetHv') {
              $this.proPrice = res.data.body.retailPrice || res.data.body.salePrice;
            }
            if ($this.pageUrl == 'goodsDetRush') {
              $this.rushBuyStatus = $this.rushBuyGoodsItemVO.activityStatus;
              $this.postRushBuyStatus($this.rushBuyStatus);
            }

            //微信分享
            let data = {
              'title': $this.shopInfo && $this.shopInfo.cnName ? '$this.shopInfo.cnName' : '有表',
              'desc': $this.proName,
              'imgUrl': $this.slides[0],
            };
            // console.log(data);
            $this.wxShare(data);
            
          });
        }).catch((err) => {
          this.axiosCatch(err, "on");
        });
      },
      //抢购状态
      postRushBuyStatus(status) {
        if (status == '1') {
          this.countDownShow = false;
          this.proPrice = this.rushBuyGoodsItemVO.retailPrice;
        }
        if (status == '2') {
          this.proPrice = this.rushBuyGoodsItemVO.grabPrice;
          this.retailPrice = this.rushBuyGoodsItemVO.retailPrice;
          this.countDownFuc(status, this.rushBuyGoodsItemVO.activityEndTime);
        }
        if (status == '3' || status == '4') {
          this.proPrice = this.rushBuyGoodsItemVO.retailPrice;
          this.countDownFuc(status, this.rushBuyGoodsItemVO.grabStartTime);
        }
      },
      //倒计时
      countDownFuc(status, timeStamp) {
        let nowTimes = new Date().getTime();
        let endTime = parseInt(timeStamp);
        let times = nowTimes > endTime ? 0 : parseInt((endTime - nowTimes) / 1000);
        let countDownTime = setInterval(() => {
          this.countDown.hours = Math.floor((times + 0.5) / (3600));
          this.countDown.minutes = Math.floor((times + 0.5) / (60)) % 60;
          this.countDown.seconds = times % (60);
          this.countDownShow = times >= 0;
          times--;
          if (times < 0) {
            clearInterval(countDownTime);
            status = status == '3' || status == '4' ? '2' : '1';
            this.postRushBuyStatus(status);
          }
        }, 1000);
      },
      //页面接口
      dataInterface(data) {
        let thisPageUrl = this.pageUrl;
        return new Promise(function (resolve, reject) {
          if (thisPageUrl == 'goodsDetail2') {
            resolve(loadGoodsDetail(data));
          }
          if (thisPageUrl == 'goodsDetHv') {
            resolve(loadMyGoodsDetailForShare(data));
          }
          if (thisPageUrl == 'goodsDetRush') {
            resolve(loadRushBuyGoodsDetail(data));
          }
        });
      },
      //多接口数据统一处理
      // dataHandle(res) { // let $this = this; // },

      //初始化数据
      dataInit() {
        this.device = '';
        this.pageUrl = '';
        this.sctop = false;
        this.slides = [];
        this.proName = '';
        this.proPrice = '';
        this.retailPrice = '';
        this.rushBuyGoodsItemVO = {};
        this.rushBuyStatus = '';
        this.productAttributeList = [];
        this.shopInfo = {};
        // this.baseInfo = {};
        this.otherImageUrlList = [];
        this.goodsId = 0;
        this.shopId = 0;
        this.isApp = true;
        this.canClick = true;
        this.productDesc = '';
        this.newOldLevel = {};
        this.goodsStock = 1;
        this.homeGoods = 0;
        this.isCollect = null;
        this.power = 0;
        this.countDownShow = true;
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
        let thisPageUrl = window.location.href;
        if (thisPageUrl.indexOf('goodsDetail2') > -1) {
          this.pagePointBurial('spxqb2b', '商品详情页b2b');
        }

        this.$router.push({
          path: '/orderFirm',
          query: {
            'goodsId': goodsId
          }
        });
      },
      //登录
      toSignIn() {
        this.appSignIn();
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
      },
      //收藏和取消收藏
      collectFuc() {
        //debugger;
        if (this.isCollect == 1) {
          this.isCollect = 0;
          cancelCollect({
            "goodsId": this.goodsId
          }).then(res => {}).catch((err) => {
            this.axiosCatch(err, "on");
          });
        } else {
          this.isCollect = 1;
          collect({
            "goodsId": this.goodsId
          }).then(res => {}).catch((err) => {
            this.axiosCatch(err, "on");
          });
        }
      },
      //JS接收OC传值的代码
      payResult(str) {
        let askPrice = str.indexOf('ask-price') > -1;
        let goodsBuy = str.indexOf('goods-buy') > -1;
        if (askPrice && goodsBuy) {
          this.power = 0;
        } else if (askPrice) {
          this.power = 1;
        } else if (goodsBuy) {
          this.power = 2;
        }
      }
    },
    mounted() {
      window.payResult = this.payResult;

      let device = this.whichDevice();
      this.device = device;
      if (device != "androidApp" && device != "iosApp") {
        this.isApp = false;
      }
      this.$refs.content.addEventListener('scroll', this.handleScroll);
    },
    activated() {
      this.dataInit();

      let thisPageUrl = window.location.href;
      if (thisPageUrl.indexOf('goodsDetail2') > -1) {
        this.pageUrl = 'goodsDetail2';
      } else if (thisPageUrl.indexOf('goodsDetHv') > -1) {
        this.pageUrl = 'goodsDetHv';
      } else if (thisPageUrl.indexOf('goodsDetRush') > -1) {
        this.pageUrl = 'goodsDetRush';
      }

      let goodsId = this.$route.query.goodsId;
      let agentId = this.$route.query.goodsAgentId;
      let activityId = this.$route.query.activityId;
      let obj = {};
      if (this.pageUrl == 'goodsDetail2') {
        this.pagePointBurial('spxqb2b', '商品详情页b2b');
        obj = {
          'goodsId': goodsId
        }
      }
      if (this.pageUrl == 'goodsDetRush') {
        obj = {
          'goodsId': goodsId,
          'activityId': activityId,
        }
      }
      if (this.pageUrl == 'goodsDetHv') {
        if (agentId) {
          obj = {
            'agentId': agentId
          }
        } else if (goodsId) {
          obj = {
            'goodsId': goodsId
          }
        }
      }
      this.detailInfo(obj);

    },
    deactivated: function () {
      console.log("我已经离开了！");
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

  .cBtn.radius {
    border-radius: 1rem !important;
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
    display: flex;
    align-items: center;
  }

  .proBox {
    flex: 1;
  }

  .collection {
    width: 0.8rem;
    margin-left: 0.5rem;
    position: relative;
    top: 1px;
    text-align: center;
  }

  .heart_shape {
    display: block;
    width: 0.47rem;
    height: 0.37rem;
    margin: auto;
    background: url('https://youwatch.oss-cn-beijing.aliyuncs.com/app%2Ficon_collectionNo.png') no-repeat center/100% 100%;
  }

  .heart_shape.selected {
    background-image: url('https://youwatch.oss-cn-beijing.aliyuncs.com/app%2Ficon_collection.png');
  }


  .pro_price {
    font-family: DINAlternate-Bold;
    font-size: .36rem;
    color: #fe3d36;
    line-height: .24rem;
  }

  .pro_price span {
    font-size: .24rem;
  }

  .pro_price del {
    font-size: .24rem;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
  }

  .pro_name {
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
    padding: 0 .2rem;
    width: auto;
    height: .44rem;
    line-height: .42rem;
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
    border-radius: 1rem;
    width: 1.80rem;
    height: .6rem;
    line-height: 0.6rem;
    color: #fff;
  }

  .productClass {
    padding: 0.1rem 0.3rem 0 0.3rem;
  }

  /* 抢购 */

  .rush_buy {
    width: 100%;
    height: .70rem;
    background: rgba(254, 235, 236, 1);
    display: flex;
    justify-content: space-between;
  }

  .rb_price {
    height: 100%;
    flex: 1;
    overflow: hidden;
    background: linear-gradient(44deg, rgba(251, 100, 85, 1) 0%, rgba(254, 61, 54, 1) 100%);
    display: flex;
    align-items: center;
  }

  .rb_p1 {
    width: 1.38rem;
    height: .46rem;
    font-size: .22rem;
    font-family: PingFangSC-Medium;
    color: rgba(252, 89, 76, 1);
    background: #ffffff;
    text-align: center;
    line-height: 0.46rem;
    border-radius: 1rem;
    margin: 0 0.26rem;
  }

  .rb_p2 {
    font-size: .22rem;
    color: rgba(255, 255, 255, 1);
  }

  .rb_p3 {
    font-family: DINAlternate-Bold;
    font-size: 0.28rem;
    color: rgba(255, 255, 255, 1);
  }

  .rb_time {
    height: 100%;
    width: 37.86%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: .22rem;
    font-family: PingFangSC-Medium;
    color: rgba(234, 60, 60, 1);
  }

  .rb_t2 {
    margin-left: 0.1rem;
  }

  .rb_t2 i {
    display: inline-block;
    padding: 0 0.02rem;
    height: .28rem;
    background: linear-gradient(45deg, rgba(251, 100, 85, 1) 0%, rgba(254, 61, 54, 1) 100%);
    border-radius: .04rem;
    color: #ffffff;
    font-style: normal;
    text-align: center;
    line-height: .28rem;
    font-family: PingFangSC-Semibold;
  }

  .rb_t3 {
    font-weight: 100;
    width: 0.3rem;
    height: 0.32rem;
    margin-left: 0.05rem;
    background: url('https://youwatch.oss-cn-beijing.aliyuncs.com/app%2Farrow_right_red.png') no-repeat center/0.12rem;
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
