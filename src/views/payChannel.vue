<template>
  <div id="payChannel">
    <ywBar :title="'选择付款方式'" type="white" :finishView="finish"></ywBar>
    <footer>
      <ywBtn :class="{'no':!canClick}" class="cBtn cBtn-buy" text="
确认付款" @click.native="toPay"></ywBtn>
    </footer>
    <div class="content">
      <ul class="payList">
        <li v-if="payChannelList.indexOf('alipay')>-1" class="pay_ali" :class="{'select':'alipay'==paySelected}" @click="payChosen('alipay')">
          <div class="pay-single">
            <h3>支付宝</h3>
            <p v-if="!false">文案文案文案文案文案文案文案</p>
          </div>
        </li>
        <li v-if="payChannelList.indexOf('wxpay')>-1" class="pay_wx" :class="{'select':'wxpay'==paySelected}" @click="payChosen('wxpay')">
          <div class="pay-single">
            <h3>微信支付</h3>
            <p v-if="false"></p>
          </div>
        </li>
        <li v-if="payChannelList.indexOf('ywpay')>-1" class="pay_yw" :class="{'select':'ywpay'==paySelected}" @click="payChosen('ywpay')">
          <div class="pay-single">
            <h3>余额支付</h3>
            <p v-if="false"></p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import {
    helpCenterList
  } from '../api/api'
  export default {
    data() {
      return {
        finish:false,//是否要结束页面
        canClick: true, //按钮是否可点击
        paySelected: 'wxpay', //选中的支付方式
        payChannelList: ['wxpay'], //可选的支付方式['alipay','wxpay','ywpay']
      }
    },
    methods: {
      toPay() {
        this.canClick = false;
        let device = this.whichDevice();
        let orderNum = this.$route.query.orderId;
        if (device == "androidApp") {
          window.Android.payOrder(orderNum,this.paySelected);
        } else if (device == "iosApp") {
          window.webkit.messageHandlers.payOrder.postMessage({
            'orderId': orderNum,
            'channel': this.paySelected
          });
        }
        setTimeout(() => {
            this.canClick = true;
        },500);
      },
      //选择支付方式
      payChosen(channel) {
        this.paySelected = channel;
      }
    },
    mounted() {

    },
    activated() {
      this.finish = this.$route.query.isBreak == "1";
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

  .pay_ali {
    background-image: url('https://youwatch.oss-cn-beijing.aliyuncs.com/app/icon_alipay.png');
  }

  .pay_wx {
    background-image: url('https://youwatch.oss-cn-beijing.aliyuncs.com/app/icon_wxpay.png');
  }

  .pay_yw {
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
