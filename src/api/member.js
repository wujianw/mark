/**
 * API
 */
import Vue from 'vue'
import MessageBox from '../msgbox';
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
    ,getChit({token,start=0,rows=10}={}) {
        let url,params;
        url = '/api/pri/coupon/list.json'
        params = {"token":token,"start":start,"rows":rows}
        return Vue.http.post(url,params).then(res => {
            let data = JSON.parse(res.data)
            if(data.code != 0) {
                return Promise.reject()
            }
            return Promise.resolve(data.data)
        }).catch(res => {
            return Promise.reject()
        })
    }
    /**
     * 订单列表
     * @params  token,start,rows
     */
    ,getOrder({token,start=0,rows=10,state,isComment}={}) {
        let url,params;
        url = '/api/pri/order/list.json'
        params = {"token":token,"start":start,"rows":rows}
        return Vue.http.post(url,params).then(res => {
            let data = JSON.parse(res.data)
            if(data.code != 0) {
                return Promise.reject()
            }
            return Promise.resolve(data.data)
        }).catch(res => {
            return Promise.reject()
        })
    }
}
