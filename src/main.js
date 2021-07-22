import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import App from './App.vue'
import router from './router'
import { openDb, createTables, generateRealData, generateFakeData } from '@/db'

Vue.config.productionTip = false;

(async () => {

    try {
        await openDb()
        await createTables()
        await generateRealData()
        await generateFakeData()
    } catch (err) {
        console.log(err)
    }

    new Vue({
        router,
        render: h => h(App)
    }).$mount('#app')

})()
