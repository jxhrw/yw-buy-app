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

//轮播图的插件（muse-ui的轮播图效果不好）
import wcSwiper from 'wc-swiper'
import 'wc-swiper/style.css'
Vue.use(wcSwiper);

//toast引入组件
// import { Toast } from 'mint-ui';
import 'mint-ui/lib/style.css'

//自定义组件
import Prolist from './components/proList'
import ywBtn from './components/ywButton'
import ywLoading from './components/ywLoading'
import scrollToTop from './components/scrollToTop'
import ywBar from './components/ywTopBar'
Vue.component('Prolist', Prolist);
Vue.component('ywBtn', ywBtn);
Vue.component('ywLoading', ywLoading);
Vue.component('scrollToTop', scrollToTop);
Vue.component('ywBar', ywBar);

Vue.config.productionTip = false;
// simple history management
const history = window.sessionStorage;
let historyCount = history.getItem('count') * 1;
router.beforeEach(function (to, from, next) {
  const toIndex = history.getItem(to.path);
  const fromIndex = history.getItem(from.path);

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
