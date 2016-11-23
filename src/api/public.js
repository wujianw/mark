import Vue from 'vue'
import MessageBox from '../msgbox'
const url = window.location.href
export const domain = url.indexOf('?')>-1 ? url.split("?")[0] : url.split("#")[0]
export const  postData = (url,params)=>{
    return Vue.http.post(url,params).then(res => {
        let data = JSON.parse(res.data)
        if(data.code != 0) {
            MessageBox.alert(data)
            return Promise.reject()
        }
        // console.log(JSON.stringify(data.data))
        return Promise.resolve(data.data)
    }).catch(res => {
        return Promise.reject()
    })
}
export const  getData = (url,params) => {
    return Vue.http.get(url,params).then(res => {
        let data = JSON.parse(res.data)
        if(data.code != 0) {
            MessageBox.alert(data)
            return Promise.reject()
        }
        // console.log(JSON.stringify(data.data))
        return Promise.resolve(data.data)
    }).catch(res => {
        return Promise.reject()
    })
}
