import * as types from '../mutation-types'
const state = {
    location:{
        cityCode:'330100',
        provinceCode:'330000'
    },
    provinceList:[],// 所有省
    cityAllList:[],// 所有市
    areaAllList:[],//所有区
    cityList:[],// 市
    areaList:[],// 区
    shopList:[],
    shopPages:1,
    menu:[]
}
// mutations
const mutations = {
    // 获取商家分类菜单
    [types.FETCH_SHOP_MENU] (state,menu) {
        state.menu = menu
    },
    // 获取全部城市，全部省，全部区县列表
    [types.FETCH_ALL_AREA] (state,{provinceList,cityAllList,areaAllList}) {
        state.provinceList = provinceList
        state.cityAllList = cityAllList
        state.areaAllList = areaAllList
    },
    // 切换省获得城市
    [types.TOGGLE_FOCUS_CITY] (state,provinceCode=state.location.provinceCode) {
        state.cityList = state.cityAllList.filter(item => item.parentCode == provinceCode)
    },
    // 切换城市获得区域
    [types.TOGGLE_FOCUS_AREA] (state,cityCode=state.location.cityCode) {
        state.areaList = state.areaAllList.filter(item => item.parentCode == cityCode)
    },

    // 附近商家列表处理
    [types.FETCH_SHOP_LIST] (state,{data,way=false,more=true}) {
        if(way) {
            state.shopPages = 2
            state.shopList = data
        }else {
            state.shopList.push(...data)
            more && state.shopPages++
        }
    }
}

export default {
    state,
    mutations
}
