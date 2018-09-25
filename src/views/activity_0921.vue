<template>
  <div id="activity_0921">
    <!-- <ywBar :title="'有表优选'" type="white"></ywBar> -->
    <div v-if="isApp" class="topBtnRight" @click="shareUrl()"></div>
    <div class="content" ref="bodyhtml">
      <ywTopLoad v-if="!isApp"></ywTopLoad>
      <div class="header1"></div>
      <div class="header2"></div>
      <div class="header3"></div>
      <div class="header4"></div>
      <div class="header5"></div>
      <div class="header6"></div>
      <div class="header7"></div>
      <div class="header8"></div>
      <ul class="actList">
        <!-- <li >@click="toDetail(1)" -->
        <li v-for="(item,index) in infoList" :key="index" @click="toDetail(item.goodId)">
          <div class="img">
            <img v-lazy="item.img+'?x-oss-process=image/resize,limit_0,m_fill,w_500,h_500'" width="100%" height="100%">
          </div>
          <div class="info">
            <!-- <h6>{{item.goods.shopInfo.cnName}}</h6> -->
            <div>
              <h5>{{item.goods.nameShow}}</h5>
            </div>
            <p>
              ￥<span>{{item.goods.shopPurchasePriceLongShow}}</span>
            </p>
            <del>¥{{item.publicPrice}}</del>
            <ywBtn :text="item.goods.availStock>0?'立即购买':'售罄'" class="btn" :class="item.goods.availStock>0?'buy':'noBuy'" @click.native="editAddress()"></ywBtn>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import {
    queryActivityGoods
  } from '../api/api'
  export default {
    data() {
      return {
        infoList: [],
        isApp: false, //是否处于有表app里
      }
    },
    methods: {
      getData() {
        queryActivityGoods().then(res => {
          let $this = this;
          $this.infoList = res.data.items;
          //   this.ajaxResult(res, function () {
          //   });
        }).catch((err) => {
          this.axiosCatch(err);
        });
      },
      toDetail(id) {
        if (this.isApp) {
          this.$router.push({
            path: '/goodsDetail2',
            query: {
              'goodsId': id
            }
          });
        } else {
          this.$router.push({
            path: '/goodsDetHv',
            query: {
              'goodsId': id
            }
          });
        }
      },
      handleScroll() {
        let scrollTop = this.$refs.bodyhtml.scrollTop;
        sessionStorage.setItem("act0921", scrollTop);
      },
      //分享网页
      shareUrl() {
        let device = this.whichDevice();
        let url = window.location.href;
        let name = '”有盟会”集结号:杭州广诚表行';
        let desc = '广交好友，诚信经营';
        let imgUrl = 'https://youwatch.oss-cn-beijing.aliyuncs.com/system/youwatch_logo.png';
        if (device == "androidApp") {
          window.Android.getShareContent(name, url, desc, imgUrl);
        } else if (device == "iosApp") {
          window.webkit.messageHandlers.getShareContent.postMessage({
            title: name,
            url: url,
            content: desc,
            iconImg: imgUrl
          });
        }
      },
      editAddress() {

      }
    },
    mounted() {
      let device = this.whichDevice();
      if (device == "androidApp" || device == "iosApp") {
        this.isApp = true;
      }
    },
    activated() {
      let name = '”有盟会”集结号:杭州广诚表行';
      let desc = '广交好友，诚信经营';
      let imgUrl = 'https://youwatch.oss-cn-beijing.aliyuncs.com/system/youwatch_logo.png';
      let data = {
        'title': name,
        'desc': desc,
        'imgUrl': imgUrl,
        'url': window.location.href
      };
      this.wxShare(data);

      this.$refs.bodyhtml.addEventListener('scroll', this.handleScroll);
      if (!this.$route.meta.isBack) {
        this.getData();
      } else {
        let device = this.whichDevice();
        if (device == "androidApp" || device == "iosApp") {
          this.isApp = true;
        }
        this.$refs.bodyhtml.scrollTop = sessionStorage.getItem("act0921");
      }
    },
  };

</script>

<style scoped>
  #activity_0921 {
    background: #202636;
    height: 100%;
  }

  .content {
    height: 100%;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
    padding: 0 0 0.62rem 0;
    text-align: justify;
    font-size: .28rem;
  }

  .header1 {
    width: 100%;
    height: 8.64rem;
    background: url('https://youwatch.oss-cn-beijing.aliyuncs.com/app%2Factivity%2F180921%2Fact0921_1.png') no-repeat top center/100%;
  }
  .header2 {
    width: 100%;
    height: 8.07rem;
    background: url('https://youwatch.oss-cn-beijing.aliyuncs.com/app%2Factivity%2F180921%2Fact0921_2.png') no-repeat top center/100%;
  }
  .header3 {
    width: 100%;
    height: 10.76rem;
    background: url('https://youwatch.oss-cn-beijing.aliyuncs.com/app%2Factivity%2F180921%2Fact0921_3.png') no-repeat top center/100%;
  }
  .header4 {
    width: 100%;
    height: 5.68rem;
    background: url('https://youwatch.oss-cn-beijing.aliyuncs.com/app%2Factivity%2F180921%2Fact0921_4.png') no-repeat top center/100%;
  }
  .header5 {
    width: 100%;
    height: 6.05rem;
    background: url('https://youwatch.oss-cn-beijing.aliyuncs.com/app%2Factivity%2F180921%2Fact0921_5.png') no-repeat top center/100%;
  }
  .header6 {
    width: 100%;
    height: 6.05rem;
    background: url('https://youwatch.oss-cn-beijing.aliyuncs.com/app%2Factivity%2F180921%2Fact0921_6.png') no-repeat top center/100%;
  }
  .header7 {
    width: 100%;
    height: 4.09rem;
    background: url('https://youwatch.oss-cn-beijing.aliyuncs.com/app%2Factivity%2F180921%2Fact0921_7.png') no-repeat top center/100%;
  }
  .header8 {
    width: 100%;
    height: 0.24rem;
    background: url('https://youwatch.oss-cn-beijing.aliyuncs.com/app%2Factivity%2F180921%2Ftitle1.png') no-repeat top center/contain;
    margin-bottom: 0.4rem;
  }

  ul.actList {
    padding: 0 0.22rem;
  }

  ul.actList li {
    height: 2.60rem;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0 2px 16px 0 rgba(0, 0, 0, 0.08);
    border-radius: 0.06rem;
    padding: 0.2rem;
    display: flex;
    align-items: center;
    overflow: hidden;
    margin-bottom: 0.2rem;
  }

  ul.actList li .img {
    width: 2.2rem;
    height: 2.2rem;
    margin-right: .2rem;
  }

  ul.actList li .info {
    flex: 1;
    height: 2.2rem;
    position: relative;
  }

  ul.actList li .info h6 {
    font-size: .24rem;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(153, 153, 153, 1);
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    margin-top: 0.1rem;
  }

  ul.actList li .info div {
    height: 1.3rem;
    display: flex;
    align-items: center;
    margin-bottom: 0.15rem;
  }

  ul.actList li .info h5 {
    font-size: .28rem;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(0, 0, 0, 1);
    line-height: 0.35rem;
    /* height: 0.7rem; */
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    margin-top: 0.1rem;
    word-wrap: break-word;
    word-break: break-all;
  }

  ul.actList li .info p {
    font-size: .24rem;
    color: rgba(254, 61, 54, 1);
    /* margin-top: 0.24rem; */
  }

  ul.actList li .info p span {
    font-size: .28rem;
    font-weight: bold;
    font-family: DINAlternate-Bold;
  }

  ul.actList li .info del {
    font-size: .20rem;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(153, 153, 153, 1);
    display: block;
    width: 2rem;
    margin-left: 0.05rem;
  }

  .btn {
    width: 1.70rem;
    height: .50rem;
    position: absolute;
    right: 0.1rem;
    bottom: 0.1rem;
    border-radius: 1rem;
    font-size: .22rem;
    font-family: PingFangSC-Medium;
    font-weight: 500;
    color: rgba(255, 255, 255, 1);
  }

  .btn.buy {
    background: linear-gradient(172deg, rgba(228, 202, 167, 1) 0%, rgba(211, 162, 112, 1) 100%);

  }

  .btn.noBuy {
    background: rgba(204, 204, 204, 1);
  }

  .topBtnRight {
    width: .6rem;
    height: .6rem;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    background-image: url('https://youwatch.oss-cn-beijing.aliyuncs.com/app%2Factivity%2F180918%2Fshare.png');
    position: absolute;
    top: 0.3rem;
    right: 0.3rem;
    z-index: 2;
    background-color: #fff;
    border-radius: 1rem;
  }

</style>
