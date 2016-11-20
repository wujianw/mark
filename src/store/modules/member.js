import * as types from '../mutation-types'

// initial state
// shape: [{ id, quantity }]
const state = {
    token:window.localStorage.token,
    member: {
        mActivate:0,
        mName:"",
        mIdentityId:"",
        mNativeAddress:"",
        mEmail:"",
        mCurrentAddress:''
    },
    chitOrder: [],
    chitOrderChange:true,
    chitStart:0,
    chit:true,
    scanOrder: [],
    scanOrderChange:true,
    scanStart:0,
    scan:true,
    refundReason:null,


}

// mutations
const mutations = {
    [types.LOGIN_SUCCESS] (state,member) {
        state.token = member.token
    },
    [types.LOGIN_FAILURE] (state) {
        state.token = null
    },
    [types.MEMBER] (state,member) {
        state.member = member
    },

    // 订单 ------代金券&扫码买单
    [types.FETCH_CHIT_ORDER] (state,{list,rows}) {
        state.chitStart = rows // 初始化数量
        state.chit = list.length != rows //true 关闭加载
        state.chitOrder = list
        state.chitOrderChange = false // true 需要重新刷新
    },
    [types.PUSH_CHIT_ORDER] (state,{list,rows}) {
        state.chitStart += rows // 统计数量
        state.chit = list.length != rows //true 关闭加载
        state.chitOrder.push(...list)
    },
    [types.FETCH_SCAN_ORDER] (state,{list,rows}) {
        state.scanStart = rows
        state.scanOrder = list
        state.scan = list.length != rows
        state.scanOrderChange = false
    },
    [types.PUSH_SCAN_ORDER] (state,{list,rows}) {
        state.scanStart += rows
        state.scan = list.length != rows
        state.scanOrder.push(...list)
    },
    //重新刷新 chit
    [types.UPDATE] (state) {
        state.chitOrderChange = true
    },
    // 退款 ----原因模板
    [types.REFUND_REASON] (state,data) {
        state.refundReason = data
    }
}

export default {
    state,
    mutations
}
