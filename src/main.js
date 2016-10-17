// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import './assets/css/reset.css'
import './assets/fonts/iconfont.css'
import './assets/js/mobile-initialize'
import Vue from 'vue'
import App from './App'
import { routes } from './router'
//开启debug模式
Vue.config.debug = true;

import VueRouter from 'vue-router'
Vue.use(VueRouter)

const router = new VueRouter({
    //mode: 'history',
    base: __dirname,
    routes : routes
})

const app = new Vue({
    router:router,
    render: h => h(App)
}).$mount('#app')

