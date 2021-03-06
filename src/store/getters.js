export const getToken = state => {return state.member.token}
export const getMember =state=>{return state.member.member}
export const getIndexData =state=>{return state.member.indexData}

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
export const location = state => {return state.shop.location}

//附近商家列表
export const shopList = state => { return state.shop.shopList }

// 评论数量
export const evaluateCount = state => { return state.shop.evaluate }

// 订单用数据
export const goodDetails = state => { return state.shop.goods }
export const goodDetailsShop = state => { return state.shop.shop }
export const activeNum = state => { return state.shop.activeNum }
export const getMarkCoupon = state => { return state.shop.markCoupon }

// 商家详情数据，商家详情&扫码买单共用
export const shopDetails = state => { return state.shop.shopDetails }


// 谭绍飞---- 特卖商品
export const specialGoods = state => {return state.shop.specialGoods}
export const specialBanner = state => {return state.shop.banner}
export const specialMode = state => {return state.shop.mode}

// 获取经纬度
export const geography = state => {return state.shop.geography}
export const getLocation = state => {return state.shop.location}
export const address = state => {return state.shop.address}

export const markOrderDetails = state => {return state.member.markOrderDetails}
export const markOrderSubmit = state => {return state.member.markOrderSubmit}
export const markScanOrderDetails = state => {return state.member.markScanOrderDetails}
export const markScanOrderSubmit = state => {return state.member.markScanOrderSubmit}

// 商品图文详情
export const goodsDesc = state => {return state.shop.goodsDesc}


