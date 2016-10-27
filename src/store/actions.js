import member from '../api/member'
import * as types from './mutation-types'

export const login = ({ commit },option) => {
    return member.getLoginInformation(
        option,
        data => commit(types.LOGIN_SUCCESS,data),
        data => commit(types.LOGIN_FAILURE,data)
    )
}
