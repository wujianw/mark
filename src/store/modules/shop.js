import * as types from '../mutation-types'
const state = {
    location:{
        province:'浙江省',
        city:'杭州市',
        cityCode:'330100',
        provinceCode:'330000'
    },
    address:"",
    geography:{
        longitude:'',// 纬度
        latitude:''// 纬度
    },
    specialGoods:[], //特卖商品
    start:0,
    provinceList:[],// 所有省
    cityAllList:[],// 所有市
    areaAllList:[],//所有区
    cityList:[],// 市
    areaList:[],// 区
    shopList:[],
    shopPages:1,
    menu:[],
    evaluate:{ // 评论条数
        countAll:0,
        countIsReply:0,
        countNoReply:0,
        countDownScore:0
    },
    goods:{// 商品详情数据
        goodsImages:null
        ,goodsName:""
        ,goodsTitle:""
        ,buyPension:""
        ,buyPrice:""
        ,marketPrice:""
        ,virtualBuy:""
        ,canBuyNum:""
        ,couponUseDesc:""
        ,couponGmtStart:""
        ,couponGmtEnd:""
        ,buyerTips:""
        ,stockNumber:0
        ,id:''
    },
    shop:{// 商家名称数据
        name:""
        ,address:""
        ,telephone:""
    },
    activeNum:1,
    markCoupon:{
        id:'',
        discntAmount:'',
        changeUse:false
    },
    goodsDesc:null,
    shopDetails:{}
}
// mutations
const mutations = {

    // 获取经纬度&当前城市
    [types.INSET_GEOGRAPHY]  (state,{latitude,longitude}) {
        state.geography.latitude = latitude
        state.geography.longitude = longitude
    },
    // 当前城市及其定位信息
    [types.INSET_LOCATION]  (state,{area,address}) {
        state.location = area
        state.address = address.split(area.area)[1]
    },
    // 特卖商品列表
    [types.SPECIAL_GOODS] (state,{data,first,rows}){
        if(first){
            state.start = rows + 1
            state.specialGoods = data
        }else {
            state.specialGoods.push(...data)
            state.start+=rows
        }
    },
    // 获取商家分类菜单
    [types.FETCH_SHOP_MENU] (state,menu) {
        state.menu = menu
    },
    // 获取全部城市，全部省，全部区县列表
    [types.FETCH_ALL_AREA] (state,{provinceList,cityAllList,areaAllList}) {
        state.provinceList = provinceList
        state.cityAllList = cityAllList
        state.areaAllList = areaAllList
    },
    // 切换省获得城市
    [types.TOGGLE_FOCUS_CITY] (state,provinceCode) {
        state.cityList = provinceCode ? state.cityAllList.filter(item => item.parentCode == provinceCode) : []
        state.areaList = state.areaAllList.filter(item => item.parentCode == state.cityList[0].currentCode)
        state.location.provinceCode = provinceCode
    },
    // 切换城市获得区域
    [types.TOGGLE_FOCUS_AREA] (state,cityCode) {
        state.areaList = cityCode ? state.areaAllList.filter(item => item.parentCode == cityCode) : []
        state.location.cityCode = cityCode
    },
    // 附近商家列表处理
    [types.FETCH_SHOP_LIST] (state,{data,way=false,more=true}) {
        if(way) {
            state.shopPages = 2
            state.shopList = data
        }else {
            state.shopList.push(...data)
            more && state.shopPages++
        }
    },


    // 评价条数统计
    [types.EVALUATE_COUNT] (state,data) {
        state.evaluate.countAll = data.countall
        state.evaluate.countIsReply = data.countisreply
        state.evaluate.countNoReply = data.countnoreply
        state.evaluate.countDownScore = data.countdownscore
    },
    /*
    * 商家详情数据，商家详情页面&优惠买单页面
    *
    * */
    [types.FETCH_SHOP_DETAILS] (state,data) {
        state.shopDetails = data
    },

    /*
    * 商品详情数据 创建订单
    * */
    [types.FETCH_GOOD_DETAILS] (state,data) {
        state.goods = data.goodsdata
        state.shop = data.shop
        state.activeNum = 1
        state.markCoupon.changeUse = false
    },
    /*
    * 保存将要购买的商品数量 ---用于选择优惠券
    * */
    [types.CREATE_ACTIVE_NUM] (state,num) {
        state.activeNum = num
    },
    /*
    * 保存修改的优惠券信息 or 清空优惠券信息
    * */
    [types.MARK_COUPON] (state,option) {
        state.markCoupon = option
    },
    // 商品图文详情
    [types.GOODS_DESC] (state,goodsDesc) {
        state.goodsDesc = goodsDesc
    }
}

export default {
    state,
    mutations
}
