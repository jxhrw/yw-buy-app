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
};
