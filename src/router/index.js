import Vue from 'vue'
import Router from 'vue-router'

// const Test1 = ()=> import('../views/test1.vue');
// const Test2 = ()=> import('../views/test2.vue');

Vue.use(Router);


export default new Router({

  mode: 'history',
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
      redirect:'/list'
    },
    {
      path: '/list',
      component: resolve => { return require([ '@/views/shopList' ], resolve) },
      meta: {
        keepAlive: true
      }
      
    },
    {
      path: '/shopDetail',
      component: resolve => { return require([ '@/views/shopDetail' ], resolve) },
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/test2',
      component: resolve => { return require([ '@/views/test2' ], resolve) },
      meta: {
        keepAlive: false
      }
    },
  ]
})
