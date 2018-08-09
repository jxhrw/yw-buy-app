import {
  Toast
} from 'mint-ui';

export default (Vue) => {
  Vue.prototype.objToStr = function (param, key, encode) {

  };

  //同意处理接口返回结果
  Vue.prototype.ajaxResult = function (data, successFuc, failFuc) {
    if (data.data.status == "200") {
      successFuc(data.data);
    } else {
      this.toast(`HTTP ${data.data.status}`);
      if (failFuc) {
        failFuc(data.data);
      }
    }
  };

  //滚动到指定位置的动作
  Vue.prototype.goTop = function (dom,top) {
    let $dom = dom || document.documentElement;
    let endTop = top||0;
    let a = setInterval(() => {
      if (dom.scrollTop >= endTop+100) {
        dom.scrollTop -= 100;
      } else {
        dom.scrollTop = endTop;
        clearInterval(a);
      }
    }, 10);
  };

  Vue.prototype.linkApp = function (dom,top) {
    
  };

  //判断当前设备及环境
  Vue.prototype.whichDevice = function(){
    let device = "";
    let ua = window.navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
        device = 'weixin';
    }
    if (/(Android|Adr)/i.test(navigator.userAgent)) {
      device = 'androidApp';
  }
    if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
        device = 'iosApp';
    }
    if (ua.match(/WeiBo/i) == "weibo") {
        device = 'weibo';
    }
    if (ua.match(/AliPay/i) == "alipay") {
        device = 'alipay';
    }
    return device;
  }

  //toast方法
  Vue.prototype.toast = function(info,positon){
    Toast({
      message: info,
      position: positon||'bottom',
      duration: 2000
    });
  }
};
