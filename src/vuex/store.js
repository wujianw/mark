import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

// 创建一个对象来保存应用启动时的初始状态
const state = {

}


// 创建一个对象存储一系列我们接下来要写的 mutation 函数
const mutations = {
  //明细or兑换
  INT_DEL_OR_DETAILS(state,type){
    state.type = state.typeName[type]
  },

  //获取我的积分信息
  FETCH_MY_POINT(state){},
  FETCH_MY_POINT_SUCCESS(state,myPointInfo){
    state.myPointInfo = myPointInfo
    state.sign = parseInt(myPointInfo.sign) || 0
    state.myPoint = parseInt(myPointInfo.credit) || 0
  },
  FETCH_MY_POINT_FAILURE(state){ state.myPointInfo = {"credit":"","exchange":"","share":"","binding":""} },
  UPDATE_MY_POINT(state,num){state.myPoint = num + parseInt(state.myPoint) },
  UPDATE_SIGN(state){ state.sign = 1 },

  //商品详情
  FOCUS_SHOP_DETAILS(state,shopId){
    for(let item of state.shopList){
      if(item.id == shopId){
        state.shopDetails = item
        break
      }
    }
    for(let item of state.hotsList){
      if(item.id == shopId){

        state.shopDetails = item
        break
      }
    }
  },
  //商品列表
  FETCH_SHOP_LIST(state) {},
  FETCH_SHOP_FAILURE(state) { state.goodsShow = false },
  FETCH_SHOP_SUCCESS(state, shopList) {
    state.goodsShow = true
    shopList && (state.shopList = shopList)
  },
  //切换兑换类型
  TOGGLE_TAKE_TYPE_ID(state,takeTypeId) {
    state.takeTypeId = takeTypeId
    state.takeName = state.takeNameList[takeTypeId]
  },
//兑换记录前十条
  EXCHANGE_LIST(state) {},
  EXCHANGE_LIST_SUCCESS(state,exchangeList) {state.exchangeList = exchangeList},
  EXCHANGE_LIST_FAILURE(state) {},
//获取热门商品
  HOTS_GOODS(state) {},
  HOTS_GOODS_FAILURE(state) { state.goodsShow = false },
  HOTS_GOODS_SUCCESS(state, hotsList) {
    state.hots = true
    hotsList && (state.hotsList = hotsList)
  },
  //写入token,address
  READ_TOKEN(state,token){state.token = token},
  //READ_ADDRESS(state,address){ state.address = address },
  //获取默认地址
  REMAKE_ADDRESS_SUCCESS(state,data){
    state.addressId = data.id || ""
    state.consigneeName = data.consigneeName || ""
    state.mobile = data.mobile || data.tel || ""
    state.address = (data.fullName+data.address) || ""
  },
  REMAKE_ADDRESS_FAILURE(state){ state.addressShow = false }
}
export default new Vuex.Store({
  state,
  mutations
})
