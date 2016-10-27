/**
 * Mocking client-server processing
 */
import Vue from 'vue'
export default {
    //{ "userType": "member", loginId, vcode }
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
          let data = res.json()
          //window.localStorage.token=data.token;
          return cb(data)
      }).catch(res => {
          errorCb({name :1})
          return Promise.reject()
      })
  }
}
