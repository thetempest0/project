// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import './assets/css/site.scss'
import Vue from 'vue'
import App from './app'
import router from './router'
import './module/xhook'
import './module/filters'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import './mock'
import './module/permission'
Vue.config.productionTip = true
Vue.use(ElementUI)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {App}
})
