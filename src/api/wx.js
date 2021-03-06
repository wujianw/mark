import Vue from 'vue'
import store from '../store'
import shop from './shop'
import MessageBox from '../msgbox'
const appid = process.env.NODE_ENV != 'production' ? 'wx5a45a2b5222a07da' : 'wx32df88fb43e04fbf'
export default {
    getSignature() {
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
    onBridgeReady(option,orderNum,cb) {
        // console.log(option)
        let self = this
        WeixinJSBridge.invoke(
            'getBrandWCPayRequest', option,
            function(res){
                if(res.err_msg && res.err_msg.indexOf('ok') > -1) {
                    cb.call(self,orderNum)
                }
            }
        )
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
                }
            })
        })
    },
    getGeography({latitude,longitude}={}) {
        let params = { gcjLon:longitude,gcjLat:latitude }
        return shop.getLonLat(params).then(data => {
            let latitude = data.bdlat,
                longitude = data.bdlon
            window.localStorage.lon = longitude // 经度
            window.localStorage.lat = latitude // 纬度
            return store.dispatch('fetchGeography',{latitude,longitude})
        })
    },
    getCityName(lngLatXY) {  //逆地理编码
        var geocoder = new AMap.Geocoder({
            radius: 400,
            extensions: "base"
        })
        geocoder.getAddress(lngLatXY, function(status, result) {
            if (status === 'complete' && result.info === 'OK') {
                let cityName = result.regeocode.addressComponent.city
                store.dispatch('cityName',cityName)
            }
        })
    }
}

