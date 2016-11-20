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
//地理位置
export const fetchGeography = ({commit},{latitude,longitude}) => {
    commit(types.INSET_GEOGRAPHY,{latitude,longitude})
    return Promise.resolve()
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

// 评论数量修改
export const evaluateCount = ({commit},data) => {
    commit(types.EVALUATE_COUNT,data)
}

// 当前商品详情数据，用于创建订单
export  const goodDetails = ({commit},{goodsId}) => {
    return shop.getGoodsDetails({goodsId}).then(data => {
        commit(types.FETCH_GOOD_DETAILS,data)
        let obj = {
            countreview:data.reviews.rows.slice(0,2),
            vcountreviewLen:data.reviews.total
        }
        return Promise.resolve(obj)
    })
}


/*
 * 附近特卖商品列表
 * @params   first 是否重置
 */
export const specialData = ({commit,state},{params,first}) => {
    params.start = first ? 0 : state.shop.start
    return shop.getSpecialGoods(params).then(data => {
        let more = data.goods.length
        commit(types.SPECIAL_GOODS,{data:data.goods,first,rows:params.rows})
        return Promise.resolve(more)
    })
}

