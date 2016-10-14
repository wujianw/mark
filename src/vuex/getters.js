// 这个 getter 函数会返回 count 的值
// 在 ES6 里你可以写成：
// export const getCount = state => state.count

export function shopList (state) {
    return state.shopList
}
export function shopDetails (state) {
    return state.shopDetails
}
export function myPointInfo (state){
  return state.myPointInfo
}
export function getMyPoint (state) {
  return state.myPoint
}
export function goodsShow (state) {
    return state.goodsShow
}

export function getType (state) {
    return state.type
}
export function exchangeList (state) {
    return state.exchangeList
}
export function takeName (state) {
  return state.takeName
}
export function takeNameList (state) {
    return state.takeNameList
}
export function takeTypeId (state) {
    return state.takeTypeId
}
export function hotsShow (state) {
    return state.hots
}
export function getHotsList (state) {
    return state.hotsList
}
export function getToken (state) {
    return state.token
}
export function getSign (state) {
    return state.sign
}
export function getAddress (state) {
    return state.address
}
export function getMobile (state) {
    return state.mobile
}
export function getConsignee (state) {
    return state.consigneeName
}
export function getAddressId (state) {
    return state.addressId
}
