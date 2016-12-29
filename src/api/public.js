import Vue from 'vue'
import MessageBox from '../msgbox'
export const domain = window.location.protocol+ "//" + window.location.host
export const  postData = (url,params)=>{
    return Vue.http.post(url,params).then(res => {
        let data = JSON.parse(res.data)
        // console.log(JSON.stringify(data))
        if(data.code != 0) {
            return MessageBox.alert(data.message).then(() => {
                return Promise.reject(data.message)
            })
        }
        return Promise.resolve(data.data)
    }).catch(res => {
        return Promise.reject(res)
    })
}
export const  getData = (url,params) => {
    return Vue.http.get(url,params).then(res => {
        let data = JSON.parse(res.data)
        if(data.code != 0) {
            return MessageBox.alert(data.message).then(() => {
                return Promise.reject(data.message)
            })
        }
        // console.log(JSON.stringify(data.data))
        return Promise.resolve(data.data)
    }).catch(res => {
        return Promise.reject(res)
    })
}
