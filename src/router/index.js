import Vue from 'vue'
import Router from 'vue-router'

const Test1 = ()=> import('../views/test1.vue');
const Test2 = ()=> import('../views/test2.vue');

Vue.use(Router);


export default new Router({

  //mode: 'history',
  scrollBehavior (to, from, savedPosition) {
    // return { x: 0, y: 0 }
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  },
  routes: [
    {
      path: '/',
      redirect:'/test1'
    },
    {
      path: '/test1',
      component: resolve => { return require([ '@/views/test1' ], resolve) },
      meta: {
        keepAlive: true
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
