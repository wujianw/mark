import member from '../api/member'
import shop from '../api/shop'
import * as types from './mutation-types'

export const login = ({commit},option) => {
    return member.getLoginInformation(
        option,
        data => commit(types.LOGIN_SUCCESS,data),
        data => commit(types.LOGIN_FAILURE,data)
    )
}

//全部订单列表处理，获取&更新
export const fetchOrder = ({commit},{type,rows}) => {
    let name = type =="chit" ? types.FETCH_CHIT_ORDER : types.FETCH_SCAN_ORDER
    return member.postOrder(type,{rows:rows}).then(data => commit(name,{list:data.rows,rows}))

}

//全部订单列表处理，无限加载
export const pushOrder = ({commit,state},{type,rows}) => {
    let name,start
    if(type =="chit"){
        name = types.PUSH_CHIT_ORDER
        start = state.member.chitStart
    }else {
        name = types.PUSH_SCAN_ORDER
        start = state.member.scanStart
    }
    return member.postOrder(type,{start:start,rows:rows}).then(data => commit(name,{list:data.rows,rows}))
}

//获取退款原因模板
export const refundReason = ({commit}) => {
    return member.postRefundReason().then(data => commit(types.REFUND_REASON,data))
}

// 取消退款申请
export const refundClose = ({commit},orderNum) => {
    return member.postRefundClose({orderNum}).then(data => commit(types.UPDATE))
}

// 获取商家分类
export const shopMenu = ({commit}) => {
    return shop.getMenu().then(data => commit(types.FETCH_SHOP_MENU,data))
}

// 获取所有区域
export const allArea = ({commit}) => {
    if(!window.localStorage.provinceList) {
        return shop.getArea().then(data => {
            let provinceList = [],
                cityAllList = [],
                areaAllList = []
            for(let item of data){
                if(item.type == 2){
                    provinceList.push(item)
                }else if(item.type == 3){
                    cityAllList.push(item)
                }else if(item.type == 4){
                    areaAllList.push(item)
                }
            }
            commit(types.FETCH_ALL_AREA,{provinceList,cityAllList,areaAllList})
            window.localStorage.provinceList = JSON.stringify(provinceList)
            window.localStorage.cityAllList = JSON.stringify(cityAllList)
            window.localStorage.areaAllList = JSON.stringify(areaAllList)
        })
    } else {
        let provinceList = JSON.parse(window.localStorage.provinceList)
        let cityAllList = JSON.parse(window.localStorage.cityAllList)
        let areaAllList = JSON.parse(window.localStorage.areaAllList)
        return commit(types.FETCH_ALL_AREA,{provinceList,cityAllList,areaAllList})
    }
}

// 切换城市
export const toggleCity = ({commit},cityCode) => {
    return commit(types.TOGGLE_FOCUS_AREA,cityCode)
}
// 切换省
export const toggleProvince = ({commit},provinceCode) => {
    return commit(types.TOGGLE_FOCUS_CITY,provinceCode)
}
// 附近商家列表
export const shopList = ({commit,state},{params,way}) => {
    params.page = way ? 1 : state.shop.shopPages // 是否首页
    return shop.postShopList(params).then(data => {
        let more = data.length // 是否有更多，无限加载开关
        commit(types.FETCH_SHOP_LIST,{data,way,more})
        return Promise.resolve(more)
    })
}

//获取养老金数据
export const getAnnuityList =({commit,state},rows)=>{
    return member.getAnnuityList({pageSize:rows,pageIndex:state.member.annuityStart}).then(data=>commit(types.FETCH_ANNUITY_LIST,{list:data,rows}))
}
//清除养老金缓存
export const cleanAnnuityList=({commit})=>{
    commit(types.CLEAN_ANNUITY_LIST)
}
