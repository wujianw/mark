// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import './assets/css/reset.css'
import './assets/fonts/iconfont.css'
import './assets/js/mobile-initialize'

import Vue from 'vue'
import App from './App'
import { routes } from './router'
import store from './store'
//开启debug模式
Vue.config.debug = true
Vue.filter('gold', function (value) {
    return value.toFixed(2)
})
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const router = new VueRouter({
    // mode: 'history',
    base: __dirname,
    saveScrollPosition: false,
    routes : routes,
    // scrollBehavior (to, from, savedPosition) {
    //     if (savedPosition) {
    //         return savedPosition
    //     } else {
    //         return { x: 0, y: 0 }
    //     }
    // }
})
//无限加载指令
import infiniteScroll from 'vue-infinite-scroll';
Vue.use(infiniteScroll)
import VueResource from 'vue-resource'
Vue.use(VueResource);
Vue.http.options.xhr = { withCredentials: true }
Vue.http.options.root = '/';
Vue.http.options.emulateJSON = true;
const app = new Vue({
    router:router,
    store:store,
    render: h => h(App)
}).$mount('#app')
