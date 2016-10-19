import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

// 创建一个对象来保存应用启动时的初始状态
const state = {
    member:{}
}


// 创建一个对象存储一系列我们接下来要写的 mutation 函数
const mutations = {
    //登入---手机验证码
    LOGIN_MOBILE_SUCCESS(state , data){
        state.member = data
    }

}
export default new Vuex.Store({
    state,
    mutations
})
