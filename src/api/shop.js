/**
 * API
 */
import Vue from 'vue'
import store from '../store'
import MessageBox from '../msgbox';
const postData = (url,params) => {
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
const getData = (url,params) => {
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
export default {
    /*
     * 商品详情
     */
    getGoodsDetails({token=store.getters.getToken,goodsId}={}){
        let url,params;
        url = '/api/open/goods/get.json'
        params = {token,goodsId}
        return postData(url,params)
    },
    /*
     * 展示商户分类
     */
    getMenu() {
        let url = '/api/open/appmenu/list.json'
        return getData(url)
    },
    /*
     * 区域数据
     */
    getArea() {
        let url = '/api/open/area/list.json'
        return getData(url)
    },
    /*
     * 区域数据版本号
     */
    getAreaVersion() {
        let url = '/api/open/interface_version/get_version.json?fname=GETAREA'
        return getData(url).then(data => {
            if(window.localStorage.areaVersion != data) {
                window.localStorage.areaVersion = data
                return Promise.resolve(true)
            } else {
                return Promise.resolve(false)
            }
        })
    },
    /*
     * 商户周边查询
     */
    postShopList({
        lon=window.localStorage.lon,lat=window.localStorage.lat,
        limit=30,page=0,sortrule='intelligence',
        local,cityCode,areaCode,consumePtype,keywords}={}) {
        let url,params
        url = '/api/open/shop/around.json'
        // url = '/api/open/shop/list.json'
        params= {lon,lat,local,keywords,cityCode,areaCode,sortrule,limit,page,consumePtype}
        return postData(url,params)
    },
    /*
     * 商户详情
     */
    getShopDetails({
        lon=window.localStorage.lon,
        lat=window.localStorage.lat,
        token=window.localStorage.token,
        shopId}={}) {
        let url,params
        url = '/api/open/shop/get.json'
        params= {lon,lat,shopId,token}
        return getData(url,{params})
    }
}
