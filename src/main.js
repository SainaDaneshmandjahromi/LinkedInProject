import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import App from './App.vue'
import router from './router'
import { initTable } from './utils/db'

Vue.config.productionTip = false

initTable()

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
