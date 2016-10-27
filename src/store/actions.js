import member from '../api/member'
import * as types from './mutation-types'

export const loginMobile = ({ commit },option) => {
    //commit(types.LOGIN_MOBILE_SUCCESS,option)
    member.getLoginInformation(
        option,
        data => commit(types.LOGIN_SUCCESS,data),
        data => commit(types.LOGIN_FAILURE,data)
    )
}
