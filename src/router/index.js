import Vue from 'vue'
import Router from 'vue-router'

// const Test1 = ()=> import('../views/test1.vue');
// const Test2 = ()=> import('../views/test2.vue');

Vue.use(Router);


export default new Router({
  scrollBehavior (to, from, savedPosition) {
    console.log(savedPosition)
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  },
  routes: [
    {
      path: '/',
      redirect:'/shopOnline'
    },
    {
      // 商品详情，适用我的商店，需要token（由shopOnline进,不需要询价按钮）
      path: '/goodsDetail',
      component: resolve => { return require([ '@/views/goodsDetail' ], resolve) },
      meta: {
        keepAlive: true,
        isBack:false,
      }
    },
    {
      // 商品详情，适用其他商家，不需要token（由shopHv进）
      path: '/goodsDetHv',
      component: resolve => { return require([ '@/views/goodsDetailH5' ], resolve) },
      meta: {
        keepAlive: true,
        isBack:false,
      }
    },
    {
      // 商品详情，适用有表市集，需要token（由app进）,唯一区别：返回直接关闭webview
      path: '/goodsDetail2',
      component: resolve => { return require([ '@/views/goodsDetail2' ], resolve) },
      meta: {
        keepAlive: true,
        isBack:false,
      }
    },
    {
      // 商家信息，本商家，需要token
      path: '/shopOnline',
      component: resolve => { return require([ '@/views/shopOnline' ], resolve) },
      meta: {
        keepAlive: true,
        isBack:false,
      }
    },
    {
      // 商家信息，其他商家，不需要token
      path: '/shopHv',
      component: resolve => { return require([ '@/views/shopOnlineH5' ], resolve) },
      meta: {
        keepAlive: true,
        isBack:false,
      }
    },
    //消息列表
    {
      path: '/notice',
      component: resolve => { return require([ '@/views/notice' ], resolve) },
      meta: {
        keepAlive: true,
        isBack:false,
      }
    },
    //消息详情
    {
      path: '/noticeDetail',
      component: resolve => { return require([ '@/views/noticeDetail' ], resolve) },
      meta: {
        keepAlive: true,
        isBack:false,
      }
    },
    //帮助中心
    {
      path: '/problem',
      component: resolve => { return require([ '@/views/problem' ], resolve) },
      meta: {
        keepAlive: true,
        isBack:false,
      }
    },
    //关于我们
    {
      path: '/about',
      component: resolve => { return require([ '@/views/about' ], resolve) },
      meta: {
        keepAlive: true,
        isBack:false,
      }
    },
    //关于我们
    {
      path: '/policy',
      component: resolve => { return require([ '@/views/about_policy' ], resolve) },
      meta: {
        keepAlive: true,
        isBack:false,
      }
    },
  ]
})
