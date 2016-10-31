import * as types from '../mutation-types'

// initial state
// shape: [{ id, quantity }]
const state = {
    member: {
        // token:window.localStorage.token
        token:'token'
    }
}

// mutations
const mutations = {
    [types.LOGIN_SUCCESS] (state,member) {
        state.member = member
    },
    [types.LOGIN_FAILURE] (state) {
        state.member = null
    }
}

export default {
    state,
    mutations
}
