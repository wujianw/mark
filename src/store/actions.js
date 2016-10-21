import member from '../api/member'
import * as types from './mutation-types'

export const loginMobile = ({ commit },option) => {
<<<<<<< HEAD
    console.log(option)
=======
>>>>>>> 7c6bba66ebdc46888a8e7b270da403a03b171902
    commit(types.LOGIN_MOBILE_SUCCESS,option)
    member.getLoginInformation(
        option,
        data => commit(types.LOGIN_MOBILE_SUCCESS,data),
        data => commit(types.LOGIN_MOBILE_FAILURE,data)
    )
}
