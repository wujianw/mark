export const getToken = state => {return state.member.member.token}

//扫码代金券
export const chitOrder = state => {return state.member.chitOrder}
export const chitOrderChange = state => {return state.member.chitOrderChange}
export const chit = state => {return state.member.chit}

//扫码订单
export const scanOrder = state => {return state.member.scanOrder}
export const scanOrderChange = state => {return state.member.scanOrderChange}
export const scan = state => {return state.member.scan}

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

export const mAuth_flag=state=>{return state.member.member.mAuth_flag}
