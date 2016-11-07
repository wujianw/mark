import member from '../api/member'
import * as types from './mutation-types'

export const login = ({ commit },option) => {
    return member.getLoginInformation(
        option,
        data => commit(types.LOGIN_SUCCESS,data),
        data => commit(types.LOGIN_FAILURE,data)
    )
}

//全部订单列表处理，获取&更新
export const fetchOrder = ({ commit },{type,rows}) => {
    let name = type =="chit" ? types.FETCH_CHIT_ORDER : types.FETCH_SCAN_ORDER
    return member.postOrder(type,{rows:rows}).then(data => commit(name,{list:data.rows,rows}))

}

//全部订单列表处理，无限加载
export const pushOrder = ({ commit,state },{type,rows}) => {
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
export const refundReason = ({ commit }) => {
    return member.postRefundReason().then(data => commit(types.REFUND_REASON,data))
}

export const refundClose = ({ commit },orderNum) => {
    return member.postRefundClose({orderNum}).then(data => commit(types.UPDATE))
}
