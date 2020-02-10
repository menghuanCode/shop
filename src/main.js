import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import 'scss/reset.css'
import 'scss/main.scss'

import 'amfe-flexible'

import './plugins/vant'
import './plugins/fastclick'

Vue.config.productionTip = false
Vue.config.performace = true

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
