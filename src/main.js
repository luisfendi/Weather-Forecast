import Vue from 'vue'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'
import VueRouter from 'vue-router'



import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import router from './router'
Vue.config.productionTip = false

Vue.use(BootstrapVue)
Vue.use(VueRouter)

export const eventEmitter = new Vue()

new Vue({
  render: h => h(App),
  router
}).$mount('#app')


