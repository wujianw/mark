// action 会收到 store 作为它的第一个参数
// 既然我们只对事件的分发（dispatch 对象）感兴趣。（state 也可以作为可选项放入）
// 我们可以利用 ES6 的解构（destructuring）功能来简化对参数的导入
import Vue from 'vue'
function makeAction (type) {
    return ({ dispatch }, ...args) => dispatch(type, ...args)
}
//我的积分
export const fetchMyPoint =({dispatch,state}) =>{
  dispatch('FETCH_MY_POINT')
  return Vue.http.get('app/integralTask.json',{params:{"token":state.token}})
    .then(res => {
      let data = res.json()
      return data.code ? "" : dispatch('FETCH_MY_POINT_SUCCESS', data.data)
    })
    .catch(res => {
      dispatch('FETCH_MY_POINT_FAILURE', res)
      return Promise.reject()
    })
}
export const updateMyPoint = makeAction('UPDATE_MY_POINT')
export const updateSign = makeAction('UPDATE_SIGN')


//获取商品列表
export const fetchShopList = ({dispatch,state}) => {
  dispatch('FETCH_SHOP_LIST')
  // 重要！記得要 return ，data那裡才取得到 Promise
  return Vue.http.get('app/exchangeGoodsList.json',{params:{"page":"1","pageSize":"20","type":state.takeTypeId}})
    .then(res => {
      let data = res.json()
      return data.code ? "" : dispatch('FETCH_SHOP_SUCCESS', data.data)
    })
    .catch(res => {
      dispatch('FETCH_SHOP_FAILURE', res)
      return Promise.reject() // 手动 reject
    })
}
//商品详情focus
export const focusShopDetails = makeAction('FOCUS_SHOP_DETAILS')
//兑换记录前十条
export const fetchExchangeList =({dispatch,state}) => {
  dispatch('EXCHANGE_LIST')
  return Vue.http.get('app/exchangeList.json')
    .then(res => {
      let data = res.json()
      return data.code ? "" : dispatch('EXCHANGE_LIST_SUCCESS', data.data)
    })
    .catch(res => {
      dispatch('EXCHANGE_LIST_FAILURE', res)
      return Promise.reject() // 手动 reject
    })
}
//获取默认地址
export const fetchRemakeAddress =({dispatch,state}) => {
  return Vue.http.get('app/getAddress.json',{params:{"token":state.token}})
    .then(res => {
      let data = res.json()
      return data.code ? "" : dispatch('REMAKE_ADDRESS_SUCCESS', data.data)
    })
    .catch(res => {
      dispatch('REMAKE_ADDRESS_FAILURE', res)
      return Promise.reject() // 手动 reject
    })
}
//明细or兑换
export const  intDelOrDetails = makeAction('INT_DEL_OR_DETAILS')
//切换兑换类型
export const  toggleTakeTypeId = makeAction('TOGGLE_TAKE_TYPE_ID')
//热门商品
export const fetchHotsGoods =({dispatch,state}) => {
  dispatch('HOTS_GOODS')
  return Vue.http.get('app/hotsGoods.json',{params:{type:17}})
    .then(res => {
      let data = res.json()
      return data.code ? "" : dispatch('HOTS_GOODS_SUCCESS', data.data)
    })
    .catch(res => {
      dispatch('HOTS_GOODS_FAILURE', res)
      return Promise.reject() // 手动 reject
    })
}
//获取token,address
export const readToken = makeAction('READ_TOKEN')
export const readAddress = makeAction('REMAKE_ADDRESS_SUCCESS')
