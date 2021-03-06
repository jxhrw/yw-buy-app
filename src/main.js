// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router'
import App from './App.vue'
import store from './store/'


/*引入移动端手势库*/
import directives from './directives/touch'
directives(Vue);

// 引入公用方法
import publicJs from './public/publicJs'
Vue.use(publicJs);

//css组件
import MuseUI from 'muse-ui';
import 'muse-ui/dist/muse-ui.css';
Vue.use(MuseUI);

import 'material-icons/iconfont/material-icons.css';

//提示框
import {Alert,Confirm} from 'wc-messagebox'
import 'wc-messagebox/style.css'
Vue.use(Alert);
Vue.use(Confirm);
// Vue.use(Prompt, options)
// Vue.use(Toast, options)

//轮播图的插件（muse-ui的轮播图效果不好）
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
Vue.component('swiper', swiper);
Vue.component('swiperSlide', swiperSlide);

//toast引入组件
// import { Toast } from 'mint-ui';
import 'mint-ui/lib/style.css'

//图片懒加载
//error 图片路径错误时加载图片
//loading 预加载图片
import VueLazyLoad from 'vue-lazyload'
Vue.use(VueLazyLoad,{
    error:'https://youwatch.oss-cn-beijing.aliyuncs.com/app%2Fimg_default.png',
    loading:'https://youwatch.oss-cn-beijing.aliyuncs.com/app%2Fimg_default.png'
})

//复制到剪切板
import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard)

//自定义组件
import Prolist from './components/proList'
import ywBtn from './components/ywButton'
import ywLoading from './components/ywLoading'
import scrollToTop from './components/scrollToTop'
import ywBar from './components/ywTopBar'
import ywTopLoad from './components/ywTopLoad'
Vue.component('Prolist', Prolist);
Vue.component('ywBtn', ywBtn);
Vue.component('ywLoading', ywLoading);
Vue.component('scrollToTop', scrollToTop);
Vue.component('ywBar', ywBar);
Vue.component('ywTopLoad', ywTopLoad);

Vue.config.productionTip = false;
// simple history management
const history = window.sessionStorage;
let historyCount = history.getItem('count') * 1;
router.beforeEach(function (to, from, next) {
  const toIndex = history.getItem(to.path);
  const fromIndex = history.getItem(from.path);
  let index={'from':fromIndex,'to':toIndex};
  history.setItem('pageIndex',JSON.stringify(index));

  if(!fromIndex || parseInt(fromIndex, 10)<1){
    store.commit('UPDATE_DIRECTION', {direction: 'firstward'});
    if(!toIndex){
      ++historyCount;
      history.setItem('count', historyCount);
      to.path !== '/' && history.setItem(to.path, historyCount);
    }
  }else if (toIndex) {
    if (!fromIndex || parseInt(toIndex, 10) > parseInt(fromIndex, 10) || (toIndex === '0' && fromIndex === '0')) {
      store.commit('UPDATE_DIRECTION', {direction: 'in'})//forward,向前
      to.meta.isBack = false;
    } else {
      store.commit('UPDATE_DIRECTION', {direction: 'out'})//reverse,向后
      to.meta.isBack = true;
    }
  } else {
    ++historyCount;
    history.setItem('count', historyCount);
    to.path !== '/' && history.setItem(to.path, historyCount);
    store.commit('UPDATE_DIRECTION', {direction: 'in'})//forward,向前
  }

  //百度统计
  if (to.path) {
    _hmt.push(['_trackPageview', '/#' + to.fullPath]);
  }

  if (/\/http/.test(to.path)) {
    let url = to.path.split('http')[1];
    window.location.href = `http${url}`
  } else {
    next()
  }
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
});
