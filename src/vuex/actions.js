// action 会收到 store 作为它的第一个参数
// 既然我们只对事件的分发（dispatch 对象）感兴趣。（state 也可以作为可选项放入）
// 我们可以利用 ES6 的解构（destructuring）功能来简化对参数的导入
import Vue from 'vue'
function makeAction (type) {
    return ({ dispatch }, ...args) => dispatch(type, ...args)
}
//登入---手机验证码
export const loginMobile =({dispatch,state}) =>{
    return Vue.http.post('api/open/member/vcodelogin.json',{params:{"userType":"member","loginId":this.mobile,"vcode":this.vcode}})
        .then(res => {
            let data = res.json()
            return data.code ? dispatch('LOGIN_MOBILE_SUCCESS', data.data) : Promise.reject()
        })
        .catch(res => {
            dispatch('LOGIN_MOBILE_FAILURE', res)
            return Promise.reject()
        })
}
export const updateMyPoint = makeAction('UPDATE_MY_POINT')
export const updateSign = makeAction('UPDATE_SIGN')

