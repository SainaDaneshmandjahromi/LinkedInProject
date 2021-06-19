import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import App from './App.vue'
import router from './router'
import {createTables, openDb, closeDb} from "@/db"

Vue.config.productionTip = false

openDb().then(async () => { // Yes, I know I'm suck! but this is working!
    await createTables()

    new Vue({
        router,
        render: h => h(App)
    }).$mount('#app')

})
