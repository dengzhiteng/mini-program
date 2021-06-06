import Vue from 'vue'
import App from './App'
Vue.config.productionTip = false

import {myRequest} from "./util/request.js"
Vue.prototype.request = myRequest

App.mpType = 'app'
const app = new Vue({
    ...App
})
app.$mount()
