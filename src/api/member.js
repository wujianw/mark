/**
 * Mocking client-server processing
 */
import Vue from 'vue'
export default {
    //{ "userType": "member", loginId, vcode }
  getLoginInformation (option,cb,errorCb) {
      return Vue.http.post(
          'api/open/member/vcodelogin.json',
          {params:{"userType":"member","loginId":option.mobile,"vcode":option.vcode}
      }).then(res => {
          let data = res.json()
          console.log(res.data)
          return cb(data)
      }).catch(res => {
          errorCb({name :1})
          console.log(0)
          return Promise.reject()
      })
  }
}
