import Vue from 'vue'
export default {
    getSignature() {
        let fullPath = window.location.href.split("#")[0],
            url = '/wechatpay/get_signature.json',
            params = {url:fullPath,appid:'wx32df88fb43e04fbf'},
            wxJson = null
        console.log(params)
        return Vue.http.get(url,{params}).then(res =>{
            let data = JSON.parse(res.data)
            wxJson = data.data
            wx.config({
                debug: false,
                appId: wxJson.appid,
                timestamp: wxJson.timestamp,
                nonceStr: wxJson.noncestr,
                signature: wxJson.signature,
                jsApiList: ['getLocation']
            });
            wx.error(function() {

            })

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
                }
            })
        })
    }
}

