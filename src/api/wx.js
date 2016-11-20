import Vue from 'vue'
import store from '../store'
import shop from './shop'
const appid = process.env.NODE_ENV != 'production' ? 'wx5a45a2b5222a07da' : 'wx32df88fb43e04fbf'
export default {
    async getSignature(cb) {
        let fullPath = window.location.href.split("#")[0],
            url = '/wechatpay/get_signature.json',
            params = {url:fullPath,appid:appid},
            wxJson = null
        return Vue.http.get(url,{params}).then(res =>{
            let data = JSON.parse(res.data)
            wxJson = data.data
            return Promise.resolve(wxJson)
        })
    },
    getLocation(cb) {
        let latitude,longitude
        wx.ready(function(){
            wx.getLocation({
                type: 'gcj02', // 默认为wgs84的gps坐标,'gcj02'
                success: function (res) {
                    latitude = res.latitude // 纬度，浮点数，范围为90 ~ -90
                    longitude = res.longitude // 经度，浮点数，范围为180 ~ -180。
                    cb({latitude,longitude})
                    console.log("ready")
                }
            })
        })
        console.log("getLocation")
    },
    getGeography({latitude,longitude}={}) {
        let params = { gcjLon:latitude,gcjLat:longitude }
        return shop.getLonLat(params).then(data => {
            let latitude = data.bdlat,
                longitude = data.bdlon
            window.localStorage.lon = longitude // 经度
            window.localStorage.lat = latitude // 纬度
            console.log("getGeography")
            return store.dispatch('fetchGeography',{latitude,longitude})
        })
    }
}

