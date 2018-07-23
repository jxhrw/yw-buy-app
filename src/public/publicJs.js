export default (Vue) => {
  Vue.prototype.objToStr = function (param, key, encode) {

  };

  Vue.prototype.ajaxResult = function (data, successFuc, failFuc) {
    if (data.data.status == "200") {
      successFuc(data.data);
    } else {
      if (failFuc) {
        failFuc(data.data);
      }
    }
  };

  Vue.prototype.goTop = function (dom) {
    let $dom = dom || document.documentElement;
    let a = setInterval(() => {
      if (dom.scrollTop > 0) {
        dom.scrollTop -= 100;
      } else {
        clearInterval(a);
      }
    }, 10);
  };
};
