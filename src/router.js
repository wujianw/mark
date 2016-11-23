//header-view 组件
const login = resolve => require(['./components/login/load'], resolve)
// 登入
const loadMobile = resolve => require(['./components/login/load_mobile'], resolve)
const loadUser = resolve => require(['./components/login/load_user'], resolve)

// 忘记密码
const findPassword = resolve => require(['./components/login/findPassword'], resolve)
const setPassword = resolve => require(['./components/login/setPassword'], resolve)
//优惠券列表
const coupon = resolve => require(['./components/coupon/couponList'], resolve)
const getCoupon = resolve => require(['./components/coupon/getCoupon'], resolve)

//我的收藏
const enshrine = resolve => require(['./components/enshrine/enshrine'], resolve)
const enshrineList = resolve => require(['./components/enshrine/enshrineList'], resolve)

//footer-view 组件
const footerView = resolve => require(['./components/footerNav'], resolve)
// 会员中心
const user = resolve => require(['./components/user'], resolve)

// 附近商家
const shopList = resolve => require(['./components/shop/shopList'], resolve)
const goodDetails = resolve => require(['./components/shop/goodDetails'], resolve)
const shopDetails = resolve => require(['./components/shop/shopDetails'], resolve)


// 评价
const evaluateNav = resolve => require(['./components/evaluate/evaluateNav'], resolve)
const evaluateList = resolve => require(['./components/evaluate/evaluateList'], resolve)
// 特产区商品
const specialGoods = resolve => require(['./components/special/specialGoods'], resolve)

// 个人信息
const userInformation = resolve => require(['./components/setting/userInformation'], resolve)
const password = resolve => require(['./components/login/password'], resolve)

//绑定
const bound = resolve => require(['./components/setting/bound'], resolve)

//实名认证
const activation = resolve => require(['./components/setting/activation'], resolve)


//订单列表 {query:{token,goodId},params:{type}}
const ordersNav = resolve => require(['./components/order/ordersNav'], resolve)
const orders = resolve => require(['./components/order/orders'], resolve)

//订单详情 {query:{orderName},params:{type}}
const orderChitDetails = resolve => require(['./components/order/orderChitDetails'], resolve)
const orderScanDetails = resolve => require(['./components/order/orderScanDetails'], resolve)
// 创建订单
const createOrder = resolve => require(['./components/shop/createOrder'], resolve)
// 去评论
const goEvaluate = resolve => require(['./components/order/goEvaluate'], resolve)

// 申请退款
const applyRefund = resolve => require(['./components/order/applyRefund'], resolve)
//退款详情
const refundDetail =resolve=>require(['./components/order/refundDetail'],resolve);

//代金券列表
const chitList = resolve => require(['./components/chit/chitList'], resolve)
const chitDetails = resolve => require(['./components/chit/chitDetails'], resolve)



//协议列表
const agreement = resolve => require(['./components/setting/agreement'], resolve)

//协议详情
const agreementDetails = resolve => require(['./components/setting/agreementDetails'], resolve)

//我的钱包
const mineWallet = resolve => require(['./components/wallet/mineWallet'], resolve)


//我的养老金
const annuityList = resolve => require(['./components/annuity/annuityList'], resolve)

//钱包设置
const walletSet = resolve => require(['./components/wallet/walletSet'], resolve)

//现金红包
const redMoney = resolve => require(['./components/wallet/redMoney'], resolve)

//收支明细
const income = resolve => require(['./components/wallet/income'], resolve)

//充值
const recharge = resolve => require(['./components/wallet/recharge'], resolve)

//附近热卖
const nearbyHot = resolve => require(['./components/special/nearbyHot'],resolve);
//附近热卖搜索
const search = resolve => require(['./components/special/search'],resolve);


//扫码买单
const scanBill = resolve => require(['./components/scan/scan_bill'],resolve);

//扫码买单支付
const scanBillPay = resolve => require(['./components/scan/scan_bill_pay'],resolve);

//支付成功
const success = resolve => require(['./components/order/success'],resolve);
// 确认支付
const verifyPay = resolve => require(['./components/order/verifyPay'],resolve);

//消息列表1级
const messageList = resolve => require(['./components/messages/messageList'],resolve);

//消息列表2级
const shopAllMessage = resolve => require(['./components/messages/shopAllMessage'],resolve);

//消息详情3级
const messageDetails = resolve => require(['./components/messages/messageDetails'],resolve);



// 已登入重定向
const loginRedirect = (to, from, next) => {
    if(typeof window.localStorage.token != 'undefined' && window.localStorage.token.length > 5) {
        next({name:'user'})
    }
    next()
}
//
const scrollTop = (to, from, next) => {
    document.body.scrollTop = 0
    next()
}

export const routes = [
    {
        path: '/login',name: 'login',component:login,
        children:[
            //手机验证码登入
            { path: 'mobile', name:'loadMobile', component: loadMobile, beforeEnter: loginRedirect },

            //帐号密码登入
            { path: 'user', name:'loadUser', component: loadUser , beforeEnter:loginRedirect }
        ]
    }
    ,{ path: '/user/findPassword' , name: 'findPassword' , component: findPassword }
    ,{ path: '/user/setPassword' , name: 'setPassword' , component: setPassword }

    ,{
        path: '/',name: 'footerView', component: footerView,redirect: '/nearbyHot',beforeEnter:scrollTop,
        children:[
            // 会员中心
            { path: '/user', name: 'user', component: user, beforeEnter: (to, from, next) => {
                if(typeof window.localStorage.token == 'undefined' || window.localStorage.token.length < 6) {
                    next({name:'loadMobile'})
                }
                next()
            }}
            // 附近商家
            ,{ path: '/shopList' , name: 'shopList' , component: shopList }
            // 特价商品列表
            ,{ path: '/nearbyHot/specialGoods' , name: 'specialGoods' , component: specialGoods }
            ,{ path: '/nearbyHot/search' , name: 'search' , component: search }
            //商家详情
            ,{ path: '/shopList/shopDetails' , name: 'shopDetails' , component: shopDetails }
            //特卖专区
            ,{ path: '/nearbyHot', name: 'nearbyHot', component: nearbyHot }
            // 消息模块
            ,{ path: '/messageList', name: 'messageList', component: messageList }
            ,{ path: '/shopAllMessage', name: 'shopAllMessage', component: shopAllMessage }
            ,{ path: '/messageDetails', name: 'messageDetails', component: messageDetails }
        ]
    }

    // 我的收藏
    ,{
        path: '/user/enshrine',name: 'enshrine',component: enshrine,
        children:[
            // 商品&店铺
            {path: 'list/:type',name: 'enshrineList',component: enshrineList}
        ]
    }

    // 商品详情模块
    ,{ path: '/goodDetails' , name: 'goodDetails' , component: goodDetails }

    // 商家&商品评论详情模块
    ,{ path: '/evaluate', name: 'evaluate', component: evaluateNav,
        children:[
            //
            {path: 'list/:mode', name: 'evaluateList', component: evaluateList}
        ]
    }
    // 全部订单
    ,{ path: '/user/orders', name: 'ordersNav', component: ordersNav,
        children:[
            // 订单类型
            {path: 'list/:type', name: 'orders', component: orders}
        ]
    }
    // 我的优惠券
    ,{ path: '/user/coupon', name: 'coupon', component: coupon }
    ,{ path: '/user/getCoupon', name: 'getCoupon', component: getCoupon }

    // 我的订单详情 ----代金券&扫码
    ,{ path: '/user/details/chit', name: 'orderChitDetails', component: orderChitDetails }
    ,{ path: '/user/details/scan', name: 'orderScanDetails', component: orderScanDetails }

    // 创建订单
    ,{ path: '/user/createOrder', name: 'createOrder', component: createOrder }

    // 扫码买单
    ,{ path: '/user/scanBillPay', name: 'scanBillPay', component: scanBillPay }
    ,{ path: '/user/scanBill', name: 'scanBill', component: scanBill }

    // 普通支付模块
    ,{ path: '/success', name: 'success', component: success }
    ,{ path: '/verifyPay', name: 'verifyPay', component: verifyPay }

    //去评论
    ,{ path: '/user/goEvaluate' , name: 'goEvaluate' , component: goEvaluate }

    // 退款模块
    ,{ path: '/user/applyRefund' , name: 'applyRefund' , component: applyRefund }
    ,{ path: '/user/refundDetail', name: 'refundDetail', component: refundDetail }

    // 我的代金券模块
    ,{ path: '/user/chitList' , name: 'chitList' , component: chitList }
    ,{ path: '/user/chitDetails' , name: 'chitDetails' , component: chitDetails }

    // 个人信息模块
    ,{ path: '/user/userInformation' , name: 'userInformation' , component: userInformation }
    ,{ path: '/user/password' , name: 'password' , component: password }
    ,{ path: '/user/bound' , name: 'bound' , component: bound }
    ,{ path: '/user/activation' , name: 'activation' , component: activation }

    // 相关协议模块
    ,{ path: '/agreement', name: 'agreement', component: agreement }
    ,{ path: '/agreementDetails', name: 'agreementDetails', component: agreementDetails }

    // 我的钱包模块
    ,{ path: '/user/mineWallet',  name: 'mineWallet', component: mineWallet }
    ,{ path: '/user/walletSet' , name: 'walletSet' , component: walletSet }
    ,{ path: '/user/redMoney' , name: 'redMoney' , component: redMoney }
    ,{ path: '/user/income' , name: 'income' , component: income }
    ,{ path: '/user/recharge' , name: 'recharge' , component: recharge }

    // 我的养老金模块
    ,{ path: '/user/annuityList',  name: 'annuityList', component: annuityList }
]
