import * as types from '../mutation-types'
const state = {
    location:{
        currentCode:'330100'
    },
    countyList:[],
    areaList:[],
    shopList:[],
    menu:[]
}
// mutations
const mutations = {
    // 获取商家分类菜单
    [types.FETCH_SHOP_MENU] (state,menu) {
        state.menu = menu
    },
    // 获取区县
    [types.FETCH_ALL_AREA] (state,areaList) {
        state.areaList = areaList
    },
    // 切换城市
    [types.TOGGLE_FOCUS_AREA] (state,cityCode) {
        state.countyList = state.areaList.filter(item => item.parentCode == cityCode)
        console.log(state.countyList)
    }
}

export default {
    state,
    mutations
}
