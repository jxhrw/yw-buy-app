<template>
  <div id="orderFirm">
    <ywBar :title="'订单确认'" type="white"></ywBar>
    <footer>
      <div class="shadow"></div>
      <div class="btnBox">
        <p class="footer_price">实付：
          <span style="color:#EA3C3C;">￥{{goodsInfo.price}}</span>
        </p>
        <ywBtn :class="{'no':!canClick}" class="cBtn cBtn-buy" text="
确认支付" @click.native="toOrder"></ywBtn>
      </div>
    </footer>
    <div class="content">
      <div class="my_address">
        <ywBtn v-if="!myAddress.isHave" type="icon" text="新增收货地址" iconUrl="https://youwatch.oss-cn-beijing.aliyuncs.com/app/arrow_right.png"
          class="s_btn" @click.native="toChangeAddress"></ywBtn>
        <div class="addressDetail" v-if="myAddress.isHave" @click="toChangeAddress">
          <div class="address_name_mobile">
            <p class="address_name">{{suolve(myAddress.detail.person,13)}}
              <span v-if="myAddress.detail.deft == '1'">默认</span>
            </p>
            <p class="address_mobile">{{myAddress.detail.phone}}</p>
          </div>
          <div class="address_location">{{myAddress.detail.provinceName}}{{myAddress.detail.cityName}}{{myAddress.detail.countryName}}{{myAddress.detail.address}}</div>
        </div>
      </div>
      <div class="c_goodsInfo" v-if="loadingFinish">
        <h3>{{shopInfo.cnName}}</h3>
        <div class="goodsDetail">
          <div class="goodImg" :style="{'background-image':'url('+goodsInfo.image+')'}"></div>
          <div class="goodinfo">
            <h6 class="goodName">{{goodsInfo.name}}</h6>
            <div class="good_nums_price">
              <span class="nums">数量 1</span>
              <span class="amount">¥ {{goodsInfo.price}}</span>
            </div>
          </div>
        </div>
        <ul class="priceBox">
          <li>
            <span class="p_title">商品金额</span>
            <span class="p_amout">¥ {{goodsInfo.price}}</span>
          </li>
          <li>
            <span class="p_title">运费</span>
            <span class="p_amout">¥ 0</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    loadGoodsDetail,
    listReceiverAddress,
    submitOrder,
    loadReceiverAddress
  } from '../api/api'
  export default {
    data() {
      return {
        canClick: true, //按钮是否可点击
        myAddress: {
          isHave: true, //是否存在
          detail: {}, //具体信息
        }, //我的地址
        shopInfo: {}, //商家信息
        goodsInfo: {}, //商品信息
        loadingFinish: false, //数据请求完成
      }
    },
    methods: {
      //基本信息
      baseInfo(goodsId) {
        let data = {
          "goodsId": goodsId
        };
        this.getAddressInfo();
        this.getGoodsInfo(data);
      },
      //地址信息
      getAddressInfo() {
        listReceiverAddress().then(res => {
          let $this = this;
          this.ajaxResult(res, function () {
            $this.myAddress.isHave = res.data.body.length > 0;
            let index = res.data.body.length > 0 ? 0 : -1;
            for (let i in res.data.body) {
              if (res.data.body[i].deft == "1") {
                index = i;
              }
            }
            $this.myAddress.detail = index >= 0 ? res.data.body[index] : {};
          });
        }).catch((err) => {
          this.axiosCatch(err);
        });
      },
      //商品信息
      getGoodsInfo(data) {
        loadGoodsDetail(data).then(res => {
          let $this = this;
          this.ajaxResult(res, function () {
            $this.loadingFinish = true;
            $this.shopInfo = res.data.body.shopInfo;
            $this.goodsInfo.image = res.data.body.imgUrlList.length > 0 ? res.data.body.imgUrlList[0] :
              'https://youwatch.oss-cn-beijing.aliyuncs.com/app/img_default.png';
            $this.goodsInfo.name = res.data.body.name;
            $this.goodsInfo.price = res.data.body.shopPurchasePrice;
          });
        }).catch((err) => {
          this.axiosCatch(err);
        });
      },
      //截取字符串，汉字占2字符
      suolve(str, sub_length) {
        if (str == "" || str == null)
          return "";
        let temp1 = str.replace(/[^\x00-\xff]/g, "**"); //精髓   
        let temp2 = temp1.substring(0, sub_length);
        //找出有多少个*   
        let x_length = temp2.split("\*").length - 1;
        let hanzi_num = x_length / 2;
        sub_length = sub_length - hanzi_num; //实际需要sub的长度是总长度-汉字长度   
        let res = str.substring(0, sub_length);
        let end = '';
        if (sub_length < str.length) {
          end = res + "…";
        } else {
          end = res;
        }
        return end;
      },
      //提交订单
      toOrder() {
        let obj = {
          'goodsId': this.$route.query.goodsId,
          'addressId': this.myAddress.detail.id,
          'goodsNum': 1,
          'transportFee': 0
        };
        this.canClick = false;
        submitOrder(obj).then(res => {
          let $this = this;
          let isBreak = this.$route.query.isBreak;
          this.canClick = true;
          this.ajaxResult(res, function () {
            $this.$router.replace({
              path: '/payChannel',
              query: {
                'orderId': res.data.body,
                'isBreak': isBreak
              }
            });
          });
        }).catch((err) => {
          this.canClick = true;
          this.axiosCatch(err, "on");
        });
      },
      //去重选地址
      toChangeAddress() {
        this.$router.push({
          path: '/address'
        });
      }
    },
    mounted() {

    },
    activated() {
      if (!this.$route.meta.isBack) { //初次
        let goodsId = this.$route.query.goodsId;
        this.baseInfo(goodsId);
      } else {
        let addressId = sessionStorage.getItem("addressId");
        this.myAddress.isHave = true;
        if (addressId && addressId != '') {
          sessionStorage.setItem("addressId", '');
          loadReceiverAddress({
            'id': addressId
          }).then(res => {
            let $this = this;
            this.ajaxResult(res, function () {
              $this.myAddress.detail = res.data.body;
            });
          }).catch((err) => {
            this.axiosCatch(err, "on");
          });
        }
      }
    },
  };

</script>

<style scoped>
  #orderFirm {
    background: #FAFAFA;
    height: 100%;
  }

  .content {
    height: 100%;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
    padding: 1.1rem 0.3rem 1.2rem 0.3rem;
    text-align: justify;
    font-size: .28rem;
  }

  ul {
    padding: 0;
  }

  .my_address {
    width: 100%;
    height: 1.74rem;
    background: #ffffff url('https://youwatch.oss-cn-beijing.aliyuncs.com/app/bottomLine.png') no-repeat bottom center/100%;
    box-shadow: 0rem 0.02rem 0.12rem 0rem rgba(0, 0, 0, 0.08);
    border-radius: 0.06rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .s_btn {
    width: 2.46rem;
    height: 0.60rem;
    border-radius: 0.30rem;
    border: 1px solid rgba(51, 51, 51, 1);
    background: #fff;
    font-size: 0.28rem;
    font-weight: bold;
    color: rgba(51, 51, 51, 1);
  }

  .addressDetail {
    width: 100%;
    padding-left: 0.3rem;
    padding-right: 1.1rem;
    background: url('https://youwatch.oss-cn-beijing.aliyuncs.com/app/arrow_right_gray.png') no-repeat center right 0.3rem/.12rem;
  }

  .address_name span {
    color: #EA3C3C;
    display: inline-block;
    margin-left: .2rem;
    font-size: .22rem;
    line-height: .22rem;
    padding: 0.02rem 0.04rem;
    border-radius: .04rem;
    border: 1px solid #EA3C3C;
  }

  .address_name_mobile {
    display: flex;
    justify-content: space-between;
    font-size: .28rem;
    color: #333333;
  }

  .address_location {
    font-size: .26rem;
    color: #999999;
    height: .7rem;
    line-height: 0.35rem;
    margin-top: 0.15rem;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    word-wrap: break-word;
    margin-bottom: -0.05rem;
  }


  .c_goodsInfo {
    margin-top: .2rem;
    padding: 0.26rem 0.3rem 0.3rem 0.3rem;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0rem 0.02rem 0.12rem 0rem rgba(0, 0, 0, 0.08);
    border-radius: 0.06rem;
  }

  .c_goodsInfo h3 {
    font-size: 0.24rem;
    font-weight: bold;
    color: #333333;
    padding-bottom: 0.18rem;
    border-bottom: 1px solid #f5f6f6;
  }

  .goodsDetail {
    padding: 0.3rem 0;
    border-bottom: 1px solid #f5f6f6;
    display: flex;
    align-items: center;
  }

  .goodImg {
    width: 1.5rem;
    height: 1.5rem;
    border-radius: .04rem;
    border: 1px solid #E6E6E6;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
  }

  .goodinfo {
    flex: 1;
    padding-left: .2rem;
    min-height: 1.5rem;
  }

  .goodName {
    min-height: 1rem;
    margin-bottom: .2rem;
    font-size: .24rem;
    font-weight: normal;
    color: #333333;
    line-height: .3rem;
    word-wrap: break-word;
  }

  .good_nums_price {
    font-size: .24rem;
    color: #999999;
    line-height: .24rem;
    display: flex;
    justify-content: space-between;
  }

  .good_nums_price .amount {
    font-weight: bold;
    color: #000000;
  }

  .priceBox li {
    margin-top: 0.26rem;
    display: flex;
    justify-content: space-between;
    font-size: .24rem;
    color: #333333;
  }

  .priceBox li .p_title {
    font-weight: bold;
  }


  footer {
    position: absolute;
    width: 100%;
    bottom: 0;
    z-index: 15;
  }

  footer .shadow {
    background: linear-gradient(180deg, rgba(238, 238, 238, 0) 0%, rgba(181, 181, 181, 0.96) 100%);
    opacity: 0.057800000000000004;
    height: .31rem;
  }

  footer .btnBox {
    height: 1rem;
    background: #fff;
    padding: 0 0.3rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  footer .btnBox button {
    background-image: linear-gradient(-57deg, #fb6455 10%, #fe3d36 100%);
    border-radius: 40px;
    width: 1.80rem;
    height: .6rem;
    color: #fff;
  }

  footer .footer_price {
    font-size: .28rem;
    color: #333333;
  }

  .cBtn.no {
    pointer-events: none;
    opacity: 0.2;
  }

  .cBtn-buy {
    background: linear-gradient(62deg, rgba(251, 100, 85, 1) 0%, rgba(254, 61, 54, 1) 100%) !important;
  }

</style>

<style>
  #orderFirm .s_btn span {
    background-size: .12rem .22rem;
    margin-left: .1rem;
  }

</style>
