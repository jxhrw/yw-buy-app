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
      this.errorTips(data.data.status, data.data.message);
      if (failFuc) {
        failFuc(data.data);
      }
    }
  };

  //滚动到指定位置的动作
  Vue.prototype.goTop = function (dom, top) {
    let $dom = dom || document.documentElement;
    let endTop = top || 0;
    let a = setInterval(() => {
      if (dom.scrollTop >= endTop + 100) {
        dom.scrollTop -= 100;
      } else {
        dom.scrollTop = endTop;
        clearInterval(a);
      }
    }, 10);
  };

  Vue.prototype.linkApp = function (dom, top) {

  };

  //接口请求失败,非正常状态通用显示,bol是否需要去登陆
  Vue.prototype.axiosCatch = function (err, bol) {
    this.errorTips(err.response.status);
    if (bol && bol == 'on' && err.response.status == "401") {
      this.appSignIn();
    }
    //load 可下载app
    if (bol && bol == 'load' && err.response.status == "401") {
      let device = this.whichDevice();
      if (device == "androidApp") {
        window.Android.TokenDiss();
      } else if (device == "iosApp") {
        window.webkit.messageHandlers.TokenDiss.postMessage('');
      } else if (device == "androidWx" || device == "android") {

      } else if (device == "iosWx" || device == "ios") {

      }
    }
  }

  //调用app登录
  Vue.prototype.appSignIn = function () {
    let device = this.whichDevice();
    if (device == "androidApp") {
      window.Android.TokenDiss();
    } else if (device == "iosApp") {
      window.webkit.messageHandlers.TokenDiss.postMessage('');
    }
  }

  //打电话
  Vue.prototype.goTel = function (phone) {
    let device = this.whichDevice();
    if (device == "androidApp") {
      window.Android.getTel(phone.toString());
    } else {
      window.location.href = 'tel:' + phone;
    }
  }

  //判断当前设备及环境
  Vue.prototype.whichDevice = function () {
    let device = "";
    let ua = window.navigator.userAgent.toLowerCase();
    if (/(Android|Adr)/i.test(navigator.userAgent)) {
      if (/youwatch/i.test(navigator.userAgent)) {
        device = 'androidApp';
      } else if (ua.match(/MicroMessenger/i) == 'micromessenger') {
        device = 'androidWx';
      } else {
        device = 'android';
      }
    } else if (/(iPhone|iPad|iPod|iOS|iphone|ipad|ipod|ios)/i.test(navigator.userAgent)) {
      if (/youwatch/i.test(navigator.userAgent)) {
        device = 'iosApp';
      } else if (ua.match(/MicroMessenger/i) == 'micromessenger') {
        device = 'iosWx';
      } else {
        device = 'ios';
      }
    } else {
      device = 'other';
    }
    return device;
  }

  //toast方法
  Vue.prototype.toast = function (info, positon) {
    Toast({
      message: info,
      position: positon || 'bottom',
      duration: 2000
    });
  }

  //错误提示
  Vue.prototype.errorTips = function (status, message) {
    if (status == "401") {
      this.toast(`登录超时`);
    } else if (status == "500") {
      this.toast(`服务器错误`);
    } else if (status == "fund_error_001") {
      this.toast('该商品库存不足');
    } else if (!status && message) {
      this.toast(`${message}`);
    } else if (message && message.length < 10) {
      this.toast(`${message}`);
    } else {
      this.toast(`HTTP ${status}`);
    }
  }

  //页面埋点
  Vue.prototype.pagePointBurial = function (id, name) {
    let device = this.whichDevice();
    if (device == "androidApp") {
      try {
        window.Android.pointBurial(id, name);
      } catch (err) {}
    } else if (device == "iosApp") {
      try {
        window.webkit.messageHandlers.pointBurial.postMessage({
          'id': id,
          'name': name
        });
      } catch (err) {}
    }
  }
};
