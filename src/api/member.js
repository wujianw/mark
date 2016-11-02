/**
 * API
 */
import Vue from 'vue'
import store from '../store'
import MessageBox from '../msgbox';
// const TOKEN = store.getters.getToken
/**
 * 数据请求 code:0 成功
 * @params
 */
const postData = (url,params) => {
    return Vue.http.post(url,params).then(res => {
        let data = JSON.parse(res.data)
        if(data.code != 0) {
            MessageBox.alert(data)
            return Promise.reject()
        }
        console.log(JSON.stringify(data.data))
        return Promise.resolve(data.data)
    }).catch(res => {
        return Promise.reject()
    })
}
export default {
    /**
     * 验证码和普通登入
     * @params  option:接口参数 ,cb：成功回调 ,errorCb：失败回调
     */
    getLoginInformation (option,cb,errorCb) {
        let url,params;
        if(typeof option.vcode != 'undefined') {
            url = '/api/open/member/vcodelogin.json'
            params = {"userType":"member","loginId":option.loginId,"vcode":option.vcode}
        } else {
            url = '/api/open/member/login.json'
            params = {"userType":"member","loginId":option.loginId,"password":option.password}
        }
        return Vue.http.post(url,params).then(res => {
            let data = JSON.parse(res.data)
            if(data.code != 0) {
                errorCb()
                return Promise.reject()
            }else {
                window.localStorage.token = data.data.token
            }
            return cb(data.data)
        }).catch(res => {
            errorCb()
            return Promise.reject()
        })
    }
    /**
     * 代金券列表
     * @params  token,start,rows
     */
    ,getChit({token=store.getters.getToken,start=0,rows=10}={}) {
        let url,params;
        url = '/api/pri/coupon/list.json'
        params = {"token":token,"start":start,"rows":rows}
        return postData(url,params)
    }
    /**
     * 订单列表
     * @params  function
     * @option  type 接口类型
     */
    ,postOrder(type,{token=store.getters.getToken,start=0,rows=10}={}) {
        let url,params;
        if(type=="chit") {
            url = '/api/pri/order/listcoupon.json'
        } else if(type=="scan") {
            url = '/api/pri/scancode/cashOrderMember.json'
        }
        params = {"token":token,"start":start,"rows":rows}
        return postData(url,params)
    }

    /**
     * 订单列表
     * @params  function
     * @option  type 接口类型
     */
    ,postOrderDetails({token=store.getters.getToken,orderId}={}) {
        let url,params;
        url = '/api/pri/order/detail.json'
        params = {"token":token,"orderId":orderId}
        return postData(url,params)
    }
}
