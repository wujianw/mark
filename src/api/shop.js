/**
 * API
 */
import Vue from 'vue'
import store from '../store'
import {postData,getData} from './public'
export default {
    /*
     *转成百度经纬度
     */
    getLonLat({gcjLon,gcjLat}={}){
        let url = '/api/open/geopoint/gcj2bd.json',
            params = { gcjLon, gcjLat }
        return postData(url,params)
    },

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
        limit,page=1,sortrule='intelligence',
        local='',cityCode='',areaCode='',consumePtype='',keywords=''}={}) {
        let url,params
        if(sortrule != 'distance'){
            url = '/api/open/shop/list.json'
            params= {cityCode,areaCode,sortrule,limit,page,consumePtype,keywords}
        }else {
            url = '/api/open/shop/around.json'
            params= {lon,lat,local,keywords,cityCode,areaCode,sortrule,limit,page,consumePtype}
        }

        return postData(url,params)
    },
    /*
     * 商户详情
     */
    getShopDetails({
        lon=window.localStorage.lon,
        lat=window.localStorage.lat,
        token=window.localStorage.token||"",
        shopId}={}) {
        let url,params
        url = '/api/open/shop/get.json'
        params= {lon,lat,shopId,token}
        return getData(url,{params})
    },

    /*
     * 附近特卖商品列表
     * cityId:城市,areaId:区县  -----附近特卖暂时不传
     * type:特卖类型 特卖类别（18,19,20,21），不传为特卖首页商品列表,
     * lon:经度,lat:纬度,
     * start,rows,
     * goodsName :模糊查找,
     * @params
     */
    getSpecialGoods({cityId="",areaId='',type='',lon,lat,start=0,rows,goodsName=''}={}){
        let url,params;
        url = '/api/open/goods/special.json'
        params = { cityId,areaId,type,lon,lat,start,rows,goodsName }
        return postData(url,params)
    },
    // pri/campaign/useablePacketRed      pri/campaign/sendPacketRed
    useAblePacketRed({token=store.getters.getToken,goodsId,number}={}){
        let url,params;
        url = '/api/pri/campaign/useablePacketRed'
        params = {token, goodsId, number}
        return postData(url,params)
    },
    sendPacketRed({token=store.getters.getToken,goodsId,number}={}){
        let url,params
        url = '/api/pri/campaign/sendPacketRed'
        params = {token, goodsId, number}
        return postData(url,params)
    },
    benefitMemberBest({token=store.getters.getToken,shopId,campaginAmount}={}){
        let url,params
        url = '/api/benefit/benefitmember/benefitMemberBest.json'
        params = {token, shopId, campaginAmount}
        return postData(url,params)
    }
}
