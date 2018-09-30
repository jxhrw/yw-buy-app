<template>
  <div id="payChannel">
    <ywBar :title="'选择付款方式'" type="white" :finishView="isBreak" :backFuc="sureBack" :hasBackFuc="true"></ywBar>
    <footer>
      <ywBtn :class="{'no':!canClick}" class="cBtn cBtn-buy" text="
确认付款" @click.native="toPay"></ywBtn>
    </footer>
    <div class="content">
      <ul class="payList">
        <li v-if="bond" class="bondShow">
          <h6>￥{{bond}}</h6>
          <p class="bondTitle">有表门店终端设备保证金</p>
          <p class="bondDesc">该保证金为有表门店终端的设备押金，若退还设备，该保证金将退还。</p>
        </li>
        <template v-for="(item,index) in payMethodList">
          <li :key="index" :class="[item.code,item.code==paySelected?'select':'',item.description && item.description.indexOf('余额不足')>-1?'no':'']"
            @click="payChosen(item.code)">
            <div class="pay-single">
              <h3>{{item.name}}</h3>
              <p v-if="item.description">{{item.description}}</p>
            </div>
          </li>
        </template>
      </ul>
    </div>
  </div>
</template>

<script>
  import {
    paymentMethod
  } from '../api/api'
  export default {
    data() {
      return {
        isBreak: false, //是否要结束页面
        canClick: false, //按钮是否可点击
        paySelected: '', //选中的支付方式wxpay
        payMethodList: [], //可选的支付方式,非固定
        bond: '', //保证金金额
      }
    },
    methods: {
      toPay() {
        this.canClick = false;
        let device = this.whichDevice();
        let orderNum = this.$route.query.orderId;
        let ts_method = ''
        if (this.paySelected == 'balance_pay') {
          ts_method = 'ywpay';
        } else if (this.paySelected == 'wechat_pay') {
          ts_method = 'wxpay';
        } else if (this.paySelected == 'ali_pay') {
          ts_method = 'alipay';
        }
        if (device == "androidApp") {
          window.Android.payOrder(orderNum, ts_method);
        } else if (device == "iosApp") {
          window.webkit.messageHandlers.payOrder.postMessage({
            'orderId': orderNum,
            'channel': ts_method
          });
        }
        setTimeout(() => {
          this.canClick = true;
        }, 500);
      },
      //返回执行
      sureBack() {
        this.$confirm({
          title: '确认要放弃付款？',
          content: '订单会保留一段时间，请尽快支付',
          yesText: "确认离开",
          noText: '继续支付'
        }).then(res => {
          this.toBack();
          console.log("13");
        }).catch(err => {});
      },
      //返回
      toBack() {
        let device = this.whichDevice();
        let index = JSON.parse(window.sessionStorage.getItem("pageIndex"));
        if (device == "androidApp") {
          try {
            if (this.bond && this.bond!='') {
              window.Android.goBond();
            } else {
              window.Android.goOrderList();
            }
          } catch (err) {
            try {
              window.Android.finish();
            } catch (err) {
              window.history.back();
            }
          }
        } else if (device == "iosApp") {
          try {
            if (this.bond && this.bond!='') {
              window.webkit.messageHandlers.goBond.postMessage('');
            } else {
              window.webkit.messageHandlers.goOrderList.postMessage('');
            }
          } catch (err) {
            try {
              window.webkit.messageHandlers.finish.postMessage('');
            } catch (err) {
              window.history.back();
            }
          }
        } else {
          window.history.back();
        }
      },
      //所有支付方式
      paymentMethodFuc() {
        let orderId = this.$route.query.orderId;
        paymentMethod({
          "orderNo": orderId
        }).then(res => {
          let $this = this;
          this.canClick = true;
          this.ajaxResult(res, function () {
            $this.payMethodList = res.data.body;
            if ($this.payMethodList.length > 0) {
              $this.paySelected = $this.payMethodList[0].code;
            }
          });
        }).catch((err) => {
          this.canClick = true;
          this.axiosCatch(err);
        });
      },
      //选择支付方式
      payChosen(channel) {
        this.paySelected = channel;
      },
    },
    mounted() {

    },
    activated() {
      this.isBreak = this.$route.query.isBreak == "1";
      this.bond = this.$route.query.bond;
      this.paymentMethodFuc();
    },
  };

</script>

<style scoped>
  #payChannel {
    background: #FAFAFA;
    height: 100%;
  }

  .content {
    height: 100%;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
    padding: 1.1rem 0.3rem 0.5rem 0.3rem;
    text-align: justify;
    font-size: .28rem;
  }

  ul {
    padding: 0;
  }

  .cBtn.no {
    pointer-events: none;
    opacity: 0.2;
  }

  .cBtn-buy {
    width: 6.90rem;
    height: .80rem;
    margin: auto;
    background: linear-gradient(32deg, rgba(251, 104, 89, 1) 0%, rgba(254, 61, 54, 1) 100%);
    border-radius: .44rem;
    font-size: .33rem;
    color: #ffffff;
  }

  footer {
    position: absolute;
    width: 100%;
    bottom: 0.5rem;
    z-index: 15;
  }

  .payList {
    background: #ffffff;
    padding: 0 0.3rem;
    list-style: none;
  }

  .payList li {
    padding: 0.3rem 0 0.3rem 0.9rem;
    background-repeat: no-repeat;
    background-position: center left;
    background-size: 0.7rem;
    border-bottom: 1px solid #f5f6f6;
    min-height: 1.3rem;
    display: flex;
    align-items: center;
  }

  .payList li:last-child {
    border-bottom: none;
  }

  .payList .bondShow {
    display: block;
    padding: 0.3rem 0.2rem;
  }

  .payList .bondShow h6 {
    font-size: .33rem;
    font-family: PingFangSC-Medium;
    font-weight: 500;
    color: rgba(234, 60, 60, 1);
    line-height: .28rem;
  }

  .payList .bondShow .bondTitle {
    font-size: .24rem;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
    line-height: .24rem;
    margin-top: 0.22rem;
  }

  .payList .bondShow .bondDesc {
    font-size: .24rem;
    font-weight: 400;
    color: rgba(153, 153, 153, 1);
    line-height: .28rem;
    margin-top: 0.14rem;
    margin-bottom: 0.2rem;
  }

  .ali_pay {
    background-image: url('https://youwatch.oss-cn-beijing.aliyuncs.com/app/icon_alipay.png');
  }

  .wechat_pay {
    background-image: url('https://youwatch.oss-cn-beijing.aliyuncs.com/app/icon_wxpay.png');
  }

  .balance_pay {
    background-image: url('https://youwatch.oss-cn-beijing.aliyuncs.com/app/icon_ywpay.png');
  }

  .pay-single {
    width: 100%;
    padding-right: 0.96rem;
    background: url('https://youwatch.oss-cn-beijing.aliyuncs.com/app/icon_radio.png') no-repeat center right/0.3rem;
  }

  .payList li.select .pay-single {
    background-image: url('https://youwatch.oss-cn-beijing.aliyuncs.com/app/icon_radio_selected.png');
  }

  .payList li.no {
    pointer-events: none;
  }

  .payList li.no .pay-single {
    background-image: none;
  }

  .pay-single h3 {
    font-size: .28rem;
    font-weight: normal;
    color: #333333;
    line-height: .3rem;
  }

  .pay-single p {
    margin-top: 0.15rem;
    font-size: .24rem;
    color: #999999;
    line-height: .34rem;
    margin-bottom: -0.05rem;
  }

</style>

<style>


</style>
