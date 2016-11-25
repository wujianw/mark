import * as types from '../mutation-types'

// initial state
// shape: [{ id, quantity }]
const state = {
    token:window.localStorage.token,
    member: {
        mActivate:0,
        mName:"",
        mIdentityId:"",
        location:"",
        mEmail:"",
        mCurrentAddress:''
    },
    refundReason:null,

    markOrderDetails:null,
    markOrderSubmit:null,
    indexData:{
        "couponnum": "0",
        "redBalance": "0",
        "coupondeliveryednum": "0",
        "goodsordernum": "0",
        "couponfinishednum": "0",
        "goodsrefundingnum": "0",
        "collectnum": "0",
        "ordernum": "0",
        "couponrefundingnum": "0",
        "goodscreatednum": "0",
        "cashBalance": "0",
        "couponordernum": "0",
        "goodspayednum": "0",
        "persion": "0.0"
    },
}

// mutations
const mutations = {
    [types.LOGIN_SUCCESS] (state,member) {
        state.token = member.token
    },
    [types.LOGIN_FAILURE] (state) {
        state.token = null
    },

    //实名认证数据
    [types.MEMBER] (state,member) {
        state.member = member
    },
    [types.MEMBER_CLEAR] (state) {
        state.token='',
        state.member = {
            mActivate:0,
            mName:"",
            mIdentityId:"",
            location:"",
            mEmail:"",
            mCurrentAddress:''
        }
    },
    // 首页数据
    [types.INDEX_DATA] (state,data) {
        state.indexData = data
    },

    // 退款 ----原因模板
    [types.REFUND_REASON] (state,data) {
        state.refundReason = data
    },
    [types.MARK_ORDER] (state,{option,information}) {
        state.markOrderSubmit = option
        state.markOrderDetails = information
    }
}

export default {
    state,
    mutations
}
