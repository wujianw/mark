/**
 * API
 */
import Vue from 'vue'

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
              window.localStorage.token=data.data.token;
          }
          return cb(data.data)
      }).catch(res => {
          errorCb()
          return Promise.reject()
      })
  }
}
