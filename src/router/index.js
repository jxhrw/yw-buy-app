import Vue from 'vue'
import Router from 'vue-router'

// const Test1 = ()=> import('../views/test1.vue');
// const Test2 = ()=> import('../views/test2.vue');

Vue.use(Router);


export default new Router({
  scrollBehavior (to, from, savedPosition) {
    // return { x: 0, y: 0 }
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
      path: '/list',
      component: resolve => { return require([ '@/views/shopList' ], resolve) },
      meta: {
        keepAlive: true,
        isBack:false,
      }
    },
    {
      path: '/shopDetail',
      component: resolve => { return require([ '@/views/shopDetail' ], resolve) },
      meta: {
        keepAlive: true,
        isBack:false,
      }
    },
    {
      path: '/shopDetail2',
      component: resolve => { return require([ '@/views/shopDetail' ], resolve) },
      meta: {
        keepAlive: true,
        isBack:false,
      }
    },
    {
      path: '/shopOnline',
      component: resolve => { return require([ '@/views/shopOnline' ], resolve) },
      meta: {
        keepAlive: true,
        isBack:false,
      }
    },
    {
      path: '/notice',
      component: resolve => { return require([ '@/views/notice' ], resolve) },
      meta: {
        keepAlive: true,
        isBack:false,
      }
    },
    {
      path: '/noticeDetail',
      component: resolve => { return require([ '@/views/noticeDetail' ], resolve) },
      meta: {
        keepAlive: true,
        isBack:false,
      }
    },
  ]
})
