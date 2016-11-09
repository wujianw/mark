import * as types from '../mutation-types'
const state = {
    location:{
        currentCode:'330100'
    },
    countyList:[],
    areaList:[],
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
    // 获取区县
    [types.FETCH_ALL_AREA] (state,areaList) {
        state.areaList = areaList
    },
    // 切换城市
    [types.TOGGLE_FOCUS_AREA] (state,cityCode=state.location.currentCode) {
        state.countyList = state.areaList.filter(item => item.parentCode == cityCode)
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
