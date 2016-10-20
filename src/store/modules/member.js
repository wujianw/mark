import * as types from '../mutation-types'

// initial state
// shape: [{ id, quantity }]
const state = {
    member: null
}

// mutations
const mutations = {
    [types.LOGIN_MOBILE_SUCCESS] (state,member) {
        console.log(member)
        state.member = member
    },
    [types.LOGIN_MOBILE_FAILURE] (state) {
        state.member = null
    }
}

export default {
    state,
    mutations
}
