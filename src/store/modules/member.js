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
    markOrderSubmit:null
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
