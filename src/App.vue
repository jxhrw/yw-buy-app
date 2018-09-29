<template>
  <div id="app">
    <transition :name="'vux-pop-' + (direction === 'firstward' ? 'er' :direction)">
      <keep-alive>
        <router-view class="router-view"></router-view>
      </keep-alive>
    </transition>
  </div>
</template>

<script>
  //该跳转结构的问题：不能用fixed定位，不然返回页面的话fixed元素会过早出现，可以使用absolute替代，需设置页面最高100%，overflow:auto
  import {
    mapState,
    mapActions
  } from 'vuex'
  import Vue from "vue"
  export default {
    name: 'app',
    data() {
      return {}
    },
    components: {

    },
    computed: {
      ...mapState({
        direction: state => state.mutations.direction,
      })
    },
    mounted() {
      //rem html：font-size自适应
      (function (doc, win) {
        var docEl = doc.documentElement,
          resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
          recalc = function () {
            var clientWidth = docEl.clientWidth;
            if (!clientWidth) return;
            //固定宽度750px 基准像素100px
            docEl.style.fontSize = 100 * (clientWidth / 750) + 'px';
          };

        if (!doc.addEventListener) return;
        win.addEventListener(resizeEvt, recalc, false);
        doc.addEventListener('DOMContentLoaded', recalc, false);
      })(document, window);
    },
  }

</script>

<style>
  html {
    font-size: 50px;
  }

  #app>div {
    position: relative;
    font-size: .26rem;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
  }


  @font-face {
    /* font-properties */
    font-family: DINAlternate-Bold;
    src: url('assets/font/DIN_Alternate_Bold.ttf');
  }

</style>

<style scoped>
  #app {
    width: 100%;
    height: 100%;
  }

  /* .vux-pop-in-leave-active
  .vux-pop-out-enter-active, */

  /* 以上效果不好，去掉 */

  .vux-pop-out-leave-active,
  .vux-pop-in-enter-active {
    will-change: transform;
    transition: all 200ms;
    height: 100%;
    top: 0;
    position: absolute;
    backface-visibility: hidden;
    perspective: 1000;
  }

  .vux-pop-out-enter {
    opacity: 0;
    transform: translate3d(-100%, 0, 0);
  }

  .vux-pop-out-leave-active {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
  }

  .vux-pop-in-enter {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
  }

  .vux-pop-in-leave-active {
    opacity: 0;
    transform: translate3d(-100%, 0, 0);
  }

</style>

<style>
  body,
  html {
    width: 100%;
    height: 100%;
  }

  * {
    margin: 0;
  }

  /* toast样式 */

  .mint-toast {
    padding: 5px 10px !important;
  }

  .mint-toast-text {
    font-size: .24rem;
  }


  /* 加载更多的样式 */

  .mu-infinite-scroll {
    background-color: #fafafa !important;
    height: 1rem !important;
    padding: .2rem 0 0.2rem 0 !important;
  }

  .mu-circle-wrapper {
    width: .24rem !important;
    height: .24rem !important;
  }

  .mu-infinite-scroll-text {
    font-size: .24rem !important;
    color: #999 !important;
    margin-right: 16px !important;
  }

  /* alert,confirm弹窗的样式 */

  .wc-popup {
    border-radius: 4px !important;
  }

  .wc-popup-inner {
    border-radius: 4px 4px 0 0 !important;
    padding: 0.4rem 0.48rem 0.4rem 0.48rem !important;
  }

  .wc-popup-button {
    border-radius: 0 0 4px 4px !important;
  }

  .wc-popup-button:first-child {
    border-radius: 0 0 0 4px !important;
  }

  .wc-popup-button:last-child {
    border-radius: 0 0 4px 0 !important;
  }

  .wc-popup-inner:after,
  .wc-popup-button:after {
    display: none !important;
    width: 0 !important;
    height: 0 !important;
  }

  .wc-popup-button {
    font-size: .32rem !important;
    font-weight: 500 !important;
    color: #999 !important;
  }

  .wc-popup-button:last-child {
    color: #fff !important;
    background: linear-gradient(60deg, rgba(251, 100, 85, 1) 0%, rgba(254, 61, 54, 1) 100%) !important;
  }

  .wc-popup-title {
    font-size: .34rem !important;
    line-height: .36rem !important;
    font-weight: 500 !important;
    color: #000;
    text-align: left !important;
    margin-bottom: .25rem !important;
  }

  .wc-popup-text {
    font-size: .28rem !important;
    color: #999 !important;
    line-height: .4rem !important;
    text-align: left !important;
    word-wrap: break-word !important;
  }

</style>
