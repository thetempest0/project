import Vue from 'vue'
import Router from 'vue-router'
import * as names from './names'
import storage from '../module/storage'
Vue.use(Router)
const router = new Router({
  routes: [
    {
      // name: names.INDEX,
      path: '/',
      component (resolve) {
        require(['../components/index.vue'], resolve)
      },
      children: [
        {
          name: names.CONSOLE,
          path: 'console',
          component (resolve) {
            require(['../components/console/index.vue'], resolve)
          }
        },
        {
          name: names.RESOURCE__SHARE,
          path: '',
          component (resolve) {
            require(['../components/resource-share/index.vue'], resolve)
          }
        },
        {
          name: names.RESOURCE__RECORD,
          path: '/resource-record',
          component (resolve) {
            require(['../components/resource-record/index.vue'], resolve)
          }
        },
        {
          name: names.RESOURCE__MANAGER,
          path: '/resource-manager',
          component (resolve) {
            require(['../components/resource-manager/index.vue'], resolve)
          }
        }
      ]
    },
    {
      name: names.LOGIN,
      path: '/login',
      component (resolve) {
        require(['../components/login.vue'], resolve)
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.path !== '/login') {
    if (!storage.getUser()) {
      next({path: '/login'})
    }
  }
  next()
})

export default router
