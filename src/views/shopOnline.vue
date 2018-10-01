<template>
  <div id="shopOnline">
    <ywLoading :loading='requesting'></ywLoading>

    <scrollToTop :scTop="sctop" @click.native="goMyTop()" :style="{'position':'absolute'}"></scrollToTop>

    <div class="top-bar" id="top-bar" :style="{'position':'absolute'}">
      <div v-if="isApp" style="float:left" class="topBtnLeft" @click="finish()"></div>
      <div v-if="isApp" style="float:right" class="topBtnRight" @click="shareUrl(shopInfoTxt)"></div>
      <form action="javascript:;" class="searchForm">
        <input id="searchTxt" type="search" @keyup.enter="search()" v-model="searchTxt" :placeholder="placeholder" />
      </form>
    </div>

    <div class="content" ref="bodyhtml">
      <div class="buttons" id="buttons">
        <div class="btnFlexSpecial" id="btnFlexSpecial">
          <div class="headerBg" id="headerBg"></div>
          <div class="shopInfo" id="shopInfo">
            <div class="shopFlex">
              <div class="logo" id="logo" :style="{'background-image':'url('+shopInfoTxt.fullLogoUrl+')'}"></div>
              <div class="shopTxt">
                <h1>
                  <a class="phone" @click="goTel(shopInfoTxt.linkPhone)">
                    <mu-icon value="phone"></mu-icon>
                    <span style="position: relative;top: 1px;">联系商家</span>
                  </a>
                  {{shopInfoTxt.cnName}}
                </h1>
                <p>{{shopInfoTxt.linkPhone}}</p>
                <p>{{shopInfoTxt.address}}</p>
              </div>
            </div>
          </div>
          <div id="nullLine" style="height:0.16rem;width:100%;"></div>
        </div>
        <div id="buttonsUseful">
          <div class="btnFlex" style="justify-content: space-around;">
            <ywBtn type="sort" text="价格" class="tsBtn" :isActive='btnActive.price.chosen' :sortType='btnActive.price.status' @click.native="selectOrder(1)"></ywBtn>
            <ywBtn type="sort" text="上新时间" class="tsBtn" :isActive='btnActive.time.chosen' :sortType='btnActive.time.status' @click.native="selectOrder(2)"></ywBtn>
          </div>
        </div>
        <!-- 这个div和id=buttonsUseful一模一样，absolute定位，用于布局，防止元素脱离文档流 -->
        <div v-if="buttonsShow" :style="{'position':'absolute','width': '100%','top':'1.28rem','z-index':'1'}">
          <div class="btnFlex" style="justify-content: space-around;">
            <ywBtn type="sort" text="价格" class="tsBtn" :isActive='btnActive.price.chosen' :sortType='btnActive.price.status' @click.native="selectOrder(1)"></ywBtn>
            <ywBtn type="sort" text="上新时间" class="tsBtn" :isActive='btnActive.time.chosen' :sortType='btnActive.time.status' @click.native="selectOrder(2)"></ywBtn>
          </div>
        </div>

      </div>
      <mu-paper class="demo-loadmore-wrap" id="demo-loadmore-wrap">
        <mu-container ref="container" class="demo-loadmore-content">
          <!-- @refresh="refresh"  -->
          <mu-load-more :refreshing="refreshing" :loading="loading" @load="load">
            <Prolist :items='pageItems' @scroll.native="scrollHandler" :isShare="isApp" :isSelf="true"></Prolist>
          </mu-load-more>
        </mu-container>
      </mu-paper>
    </div>


  </div>
</template>

<script>
  import {
    queryGoodsPage,
    queryDic,
    loadShopInfo
  } from '../api/api'
  export default {
    data() {
      return {
        //需要初始化的数据
        buttonsShow: false, //absolute筛选的button是否出现
        sctop: false, //滚动到顶部的按钮是否出现
        listData: {
          category: 'watch',
          index: 1,
          pageSize: 10,
          order: "",
        }, //列表请求参数
        searchTxt: '', //搜索条件的文本
        pageItems: [], //分页内容
        isApp: true, //是否处于有表app里
        isAppIos: false, //是否iOS app
        btnActive: {
          'price': {
            'chosen': false,
            'status': 0
          },
          'time': {
            'chosen': false,
            'status': 0
          },
        }, //按钮的选中状态

        // 不需要初始化的数据
        placeholder: "\ue6d1 搜索", //&#xe6d1;
        fewTimes: 0, //页面第几次进入，刷新或第一次会在mounted里重置,其余次数获取scrollTop使页面回到离开位置
        pageInfo: {}, //分页信息
        shopInfoTxt: {
          fullLogoUrl:'https://youwatch.oss-cn-beijing.aliyuncs.com/app/img_default.png'
        }, //店铺信息
        isLoading: false, //是否正在请求中
        refreshing: false, //下拉loading
        loading: false, //底部loading
        requesting: true, //整体loading
      }
    },
    components: {},
    computed: {},
    watch: {},
    created() {},
    methods: {
      requireda(data, reset) {
        let $bodyThis = this;
        this.isLoading = true;
        // this.requesting = true;
        queryGoodsPage(data).then(res => {
          let $this = this;
          this.ajaxResult(res, function () {
            $this.isLoading = false;
            $this.loading = false;
            $this.refreshing = false;
            $this.requesting = false;
            $this.pageInfo = {
              'pageNum': res.data.body.page.pageNum,
              'pages': res.data.body.page.pages
            }
            if ($this.pageInfo.pageNum >= $this.pageInfo.pages) {
              document.getElementsByClassName("mu-infinite-scroll-text")[0].innerText = "没有更多了~";
              setTimeout(function () {
                document.getElementsByClassName("mu-infinite-scroll-text")[0].style.display = "block";
              });
            } else {
              document.getElementsByClassName("mu-infinite-scroll-text")[0].innerText = "正在加载...";
            }

            if (reset) {
              //重置时需要滚回到头部
              let scrollTop = $bodyThis.$refs.bodyhtml.scrollTop;
              let buttonsUsefulCH = document.getElementById("buttonsUseful").offsetTop;
              let topBarHeight = document.getElementById("top-bar").clientHeight;
              if (scrollTop >= buttonsUsefulCH - topBarHeight) {
                $bodyThis.$refs.bodyhtml.scrollTop = buttonsUsefulCH - topBarHeight;
              }
              $this.pageItems = res.data.body.page.items;
            } else {
              $this.pageItems = $this.pageItems.concat(res.data.body.page.items);
            }
          })
        }).catch((err) => {
          this.axiosCatch(err);
          this.requesting = false;
        })
      },
      //店铺信息
      shopInfoFuc() {
        let $bodyThis = this;
        let obj = {
          "shopId": this.$route.query.shopId
        };
        loadShopInfo(obj).then(res => {
          this.ajaxResult(res, function () {
            $bodyThis.shopInfoTxt = res.data.body;

            //微信分享
            let data = {
              'title': $bodyThis.shopInfoTxt.cnName,
              'desc': $bodyThis.shopInfoTxt.address,
              'imgUrl': $bodyThis.shopInfoTxt.fullLogoUrl
            };
            $bodyThis.wxShare(data);
          })
        }).catch((err) => {
          this.axiosCatch(err, 'on');
        })
      },
      //重置、筛选
      resetSelect() {
        this.requesting = true;
        this.listData.index = 1;
        this.requireda(this.listData, true);
      },
      //上拉刷新
      refresh() {
        this.refreshing = true;
        this.resetSelect();
      },
      //下拉加载
      load() {
        if (this.listData.index < parseInt(this.pageInfo.pages)) {
          this.loading = true;
          this.listData.index += 1;
          this.requireda(this.listData);
        }
      },
      //输入框搜索
      search() {
        this.listData.searchContent = this.searchTxt;
        document.getElementById("searchTxt").blur();
        this.resetSelect();
      },
      //通过order排序的,type类型，分0综合，1价格，2上新时间，-1重置
      selectOrder(type) {
        if (type == 1) {
          this.btnActive.price.status = (this.btnActive.price.status + 1) % 3;
          this.btnActive.time.status = 0;
          this.btnActive.all = false;
        } else if (type == 2) {
          this.btnActive.time.status = (this.btnActive.time.status + 1) % 3;
          this.btnActive.price.status = 0;
          this.btnActive.all = false;
        } else if (type == 0) {
          this.btnActive.all = !this.btnActive.all;
          this.btnActive.price.status = 0;
          this.btnActive.time.status = 0;
        } else {
          this.btnActive.all = false;
          this.btnActive.price.status = 0;
          this.btnActive.time.status = 0;
        }
        this.btnActive.price.chosen = this.btnActive.price.status > 0;
        this.btnActive.time.chosen = this.btnActive.time.status > 0;
        if (this.btnActive.price.status == 1) {
          this.listData.order = 'sale_price_asc';
        } else if (this.btnActive.price.status == 2) {
          this.listData.order = 'sale_price_desc';
        } else if (this.btnActive.time.status == 1) {
          this.listData.order = 'issuedate_asc';
        } else if (this.btnActive.time.status == 2) {
          this.listData.order = 'issuedate_desc';
        } else {
          this.listData.order = '';
        }
        this.resetSelect();
      },
      //页面滚动事件
      handleScroll() {
        let scrollTop = this.$refs.bodyhtml.scrollTop;
        let shopInfoCH = document.getElementById("shopInfo").offsetTop;
        let buttonsUsefulCH = document.getElementById("buttonsUseful").offsetTop;
        let topBarHeight = document.getElementById("top-bar").clientHeight;
        let bodyHeight = document.getElementById("buttons").clientHeight + document.getElementById("demo-loadmore-wrap")
          .clientHeight;
        let windowHeight = document.getElementById("shopOnline").clientHeight;
        //操控背景图的位置
        if (scrollTop >= shopInfoCH - topBarHeight) {
          document.getElementById("top-bar").style.backgroundPosition = 'center bottom 0px';
        } else {
          document.getElementById("top-bar").style.backgroundPosition = 'center bottom ' + (topBarHeight - shopInfoCH +
            scrollTop) + 'px';
        }
        //操控absolute筛选按钮是否出现
        this.buttonsShow = (scrollTop >= buttonsUsefulCH - topBarHeight);
        //滚动到底部加载
        if (scrollTop + windowHeight > bodyHeight - 5 && !this.isLoading) {
          this.load();
        }
        //保留离开的位置
        sessionStorage.setItem("shopOnlineScrollTop", scrollTop);
        if (scrollTop > 300) {
          this.sctop = true;
        } else {
          this.sctop = false;
        }
      },
      goMyTop() {
        let buttonsUsefulCH = document.getElementById("buttonsUseful").offsetTop;
        let topBarHeight = document.getElementById("top-bar").clientHeight;
        this.goTop(this.$refs.bodyhtml, buttonsUsefulCH - topBarHeight);
      },
      //调用finish的回退
      finish() {
        let device = this.whichDevice();
        if (device == "androidApp") {
          window.Android.finish();
        } else if (device == "iosApp") {
          window.webkit.messageHandlers.finish.postMessage('');
        } else {
          window.history.back();
        }
      },
      //分享网页
      shareUrl(shopInfo) {
        this.pagePointBurial('wdmd_zdfx', '我的门店中整店分享');
        let device = this.whichDevice();
        let url = window.location.href.split("#/")[0] + "#/shopHv?shopId=" + shopInfo.id;
        if (device == "androidApp") {
          window.Android.getShareContent(shopInfo.cnName, url, shopInfo.address, shopInfo.fullLogoUrl);
        } else if (device == "iosApp") {
          window.webkit.messageHandlers.getShareContent.postMessage({
            title: shopInfo.cnName,
            content: shopInfo.address,
            url: url,
            iconImg: shopInfo.fullLogoUrl
          });
        }
      },
    },
    watch: {
      // 监听,当路由发生变化的时候执行
      $route: {
        handler: function (val, oldVal) {

        },
        // 深度观察监听
        deep: true
      }
    },
    mounted: function () {
      let device = this.whichDevice();
      this.shopInfoFuc(); //获取店铺信息
      if (device != "androidApp" && device != "iosApp") {
        this.isApp = false;
      }
      if (device == "iosApp") {
        this.isAppIos = true;
      }
    },
    activated() {
      this.pagePointBurial('wdmd', '我的门店');
      let scrollTop = 0;
      let shopInfoCH = document.getElementById("shopInfo").offsetTop;
      let topBarHeight = document.getElementById("top-bar").clientHeight;
      this.fewTimes++;
      if (!this.$route.meta.isBack || this.fewTimes <= 1 || (this.$route.query.id && sessionStorage.getItem("shopId") !=
          this.$route.query.id)) {
        if (this.$route.query.id) {
          sessionStorage.setItem("shopId", this.$route.query.id);
        }
        //数据初始化
        this.listData = {
          category: 'watch',
          index: 1,
          pageSize: 10,
          order: "",
        };
        this.buttonsShow = false;
        this.sctop = false;
        this.searchTxt = '';
        this.pageItems = [];
        this.btnActive = {
          'price': {
            'chosen': false,
            'status': 0
          },
          'time': {
            'chosen': false,
            'status': 0
          },
        };
        this.listData.shopId = this.$route.query.shopId;
        this.requireda(this.listData);
        this.$refs.bodyhtml.addEventListener('scroll', this.handleScroll);
        //top-bar背景图的位置
        scrollTop = 0;
        //滚动到初始的位置
        this.$refs.bodyhtml.scrollTop = 0;
      } else {
        //top-bar背景图的位置
        scrollTop = this.$refs.bodyhtml.scrollTop;
        //滚动到离开的位置
        if (this.fewTimes > 1) {
          this.$refs.bodyhtml.scrollTop = sessionStorage.getItem("shopOnlineScrollTop");
        }
      }
      document.getElementById("top-bar").style.backgroundPosition = 'center bottom ' + (topBarHeight - shopInfoCH +
        scrollTop) + 'px';
    },
  }

</script>

<style scoped>
  @font-face {
    font-family: 'iconfont';
    src: url('../assets/iconFont/iconfont.eot');
    src: url('../assets/iconFont/iconfont.eot?#iefix') format('embedded-opentype'),
    url('../assets/iconFont/iconfont.woff') format('woff'),
    url('../assets/iconFont/iconfont.ttf') format('truetype'),
    url('../assets/iconFont/iconfont.svg#iconfont') format('svg');
  }

  #shopOnline {
    width: 100%;
    height: 100%;
  }

  .content {
    height: 100%;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
  }

  .demo-loadmore-wrap {
    width: 100%;
    /* height: 100%; */
    display: flex;
    flex-direction: column;
  }

  .demo-loadmore-wrap .mu-appbar {
    width: 100%;
  }

  .demo-loadmore-content {
    flex: 1;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
  }

  .mu-list {
    padding: 0 0;
  }

  .container {
    padding: 0 0;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
  }

  .demo-loadmore-wrap {
    /* padding-top: 2rem; */
  }

  /* 以上为组件css，以下是自定义css */

  .btnFlexSpecial {
    /* margin-bottom: .16rem; */
  }

  .headerBg {
    height: 2.2rem;
    background: url("../assets/imgs/bg_shopOnline.png") no-repeat bottom/cover;
  }

  .top-bar {
    height: 1.28rem;
    padding: .34rem 0;
    top: 0;
    width: 100%;
    z-index: 5;
    background: url("../assets/imgs/bg_shopOnline.png") no-repeat bottom/cover;
  }

  .topBtnLeft,
  .topBtnRight {
    width: .6rem;
    height: .6rem;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
  }

  .topBtnLeft {
    margin-left: .3rem;
    background-image: url('../assets/imgs/icon_forward.png');
  }

  .topBtnRight {
    margin-right: .3rem;
    background-image: url('../assets/imgs/icon_share.png');
  }

  .searchForm {
    width: 3.70rem;
    margin: auto;
  }

  .top-bar input[type='search'] {
    width: 100%;
    padding: 0 6%;
    background: rgba(255, 255, 255, 0.50);
    border-radius: 100px;
    height: .60rem;
    border: none;
    color: #ffffff;
    outline: none;
  }

  ::-webkit-input-placeholder {
    font-family: 'iconfont';
    text-align: center;
    font-size: .28rem;
    color: #ffffff;
  }

  .shopInfo {
    background: #ffffff;
  }

  .shopFlex {
    display: flex;
    padding: .2rem .3rem .4rem .3rem;

  }

  .shopInfo .logo {
    background: #ffffff url('') no-repeat center center/cover;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.08);
    border-radius: 6px;
    width: 1.50rem;
    height: 1.50rem;
    margin-top: -0.5rem;
    margin-right: .18rem;
  }

  .shopTxt {
    text-align: left;
    flex: 1;
  }

  .shopTxt .phone {
    font-family: PingFangSC-Regular;
    font-size: .24rem;
    color: #000000;
    border: 1px solid #000000;
    border-radius: 22px;
    width: 1.58rem;
    height: .42rem;
    float: right;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: normal;
  }

  .shopTxt .phone i {
    font-size: .24rem;
    margin-top: 1px;
  }

  .shopTxt h1 {
    font-family: PingFangSC-Medium;
    font-size: .33rem;
    color: #333333;
    letter-spacing: 0;
    line-height: .4rem;
  }

  .shopTxt p {
    font-family: PingFangSC-Regular;
    font-size: .24rem;
    color: #999999;
    letter-spacing: 0;
    line-height: .24rem;
    margin-top: .14rem;
  }





  .buttons {
    width: 100%;
    top: 0;
    z-index: 1;
    background: #fafafa;
  }

  .btnFlex {
    height: .8rem;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    position: relative;
    background: #fff;
  }

  .downBoxs {
    position: absolute;
    width: 100%;
    background: #fff;
    top: 0.8rem;
    height: auto;
    display: flex;
    flex-wrap: wrap;
    z-index: 1;
  }

  .downBoxs span {
    width: 50%;
    padding: 0 4%;
  }

  .downBoxs span.focus {
    color: red;
  }

  .tsBtn {
    width: 2rem;
    border-radius: 1rem;
    font-family: PingFangSC-Regular;
    font-size: .26rem;
    color: #333333;
  }

  .tsBtn.tsBtnBg {
    background: #f5f6f6;
  }

</style>
<style>
  #shopOnline .mu-refresh-control {
    /* margin-top: 1rem; */
  }

  #shopOnline .mu-refresh-control-hide {
    /* transform:translate3d(0,-1.8rem,0)!important; */
  }

</style>
