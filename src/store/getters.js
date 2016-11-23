export const getToken = state => {return state.member.token}
export const getMember =state=>{return state.member.member}

// 退款原因目标
export const refundReason = state => {return state.member.refundReason}

// 获取分类信息
export const shopMenu = state => {return state.shop.menu}

// 获取区域数据
export const provinceList = state => {return state.shop.provinceList}
export const cityList = state => {return state.shop.cityList}
export const areaList = state => {return state.shop.areaList}

// 获取当前城市区县数据
export const provinceCode = state => {return state.shop.location.provinceCode}
export const cityCode = state => {return state.shop.location.cityCode}

//附近商家列表
export const shopList = state => { return state.shop.shopList }

// 评论数量
export const evaluateCount = state => { return state.shop.evaluate }

export const goodDetails = state => { return state.shop.goods }
export const goodDetailsShop = state => { return state.shop.shop }

// 谭绍飞---- 特卖商品
export const specialGoods = state => {return state.shop.specialGoods}

// 获取经纬度
export const geography = state => {return state.shop.geography}
export const getLocation = state => {return state.shop.location}
export const address = state => {return state.shop.address}

export const markOrderDetails = state => {return state.member.markOrderDetails}
export const markOrderSubmit = state => {return state.member.markOrderSubmit}

// 商品图文详情
export const goodsDesc = state => {return state.shop.goodsDesc}


