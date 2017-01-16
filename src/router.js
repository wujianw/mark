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
const goodsDesc = resolve => require(['./components/shop/goodsDesc'], resolve)


// 评价
const evaluateNav = resolve => require(['./components/evaluate/evaluateNav'], resolve)
const evaluateList = resolve => require(['./components/evaluate/evaluateList'], resolve)
// 特产区商品
const specialGoods = resolve => require(['./components/special/specialGoods'], resolve)

// 个人信息
const userInformation = resolve => require(['./components/setting/userInformation'], resolve)
const password = resolve => require(['./components/login/password'], resolve)
const telBound = resolve => require(['./components/setting/telBound'], resolve)

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
const useCoupon = resolve => require(['./components/shop/useCoupon'], resolve)
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
const keyboard = resolve => require(['./components/keyboard/keyboard'], resolve)

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
        console.log("loginRedirect")
        next({name:'user'})
    }else{
        next()
    }
}
//
// 已登入重定向
const indexRedirect = () => {
    let search = window.location.search,
        reg_state = /^state=(.+)/
    let qs = search.length > 0 ? search.substring(1) : "",
        state = qs.split("&").filter(item => reg_state.test(item))
    if(state && state.length > 0){
        let stateVal = state[0].split("=")[1]
        let shopId = stateVal.match(/\d+/)[0],
            name = stateVal.match(/[a-zA-Z]+/)[0]
        return {name,query:{shopId}}
    }
    return '/nearbyHot'
}
const scrollTop = (to, from, next) => {
    document.body.scrollTop = 0
    next()
}
const setDocumentTitle = (title="商桥",next) => {
    document.title = title;
    document.body.scrollTop = 0
    if (/ip(hone|od|ad)/i.test(navigator.userAgent)) {
        var i = document.createElement('iframe');
        i.src = '/favicon.ico';
        i.style.display = 'none';
        i.onload = function() {
            setTimeout(function(){
                i.remove();
            }, 9)
        }
        document.body.appendChild(i);
    }
    next()
}
export const routes = [
    {
        path: '/login',name: 'login',component:login,
        children:[
            { path: 'mobile', name:'loadMobile', component: loadMobile,beforeEnter:(to,from,next) => setDocumentTitle("手机验证码登入",next)},
            { path: 'user', name:'loadUser', component: loadUser,beforeEnter:(to,from,next) => setDocumentTitle("帐号密码登入",next) }
        ]
    }
    ,{ path: '/user/findPassword' , name: 'findPassword' , component: findPassword,beforeEnter:(to,from,next) => setDocumentTitle("找回密码",next) }
    ,{ path: '/user/setPassword' , name: 'setPassword' , component: setPassword ,beforeEnter:(to,from,next) => setDocumentTitle("设置密码",next)}
    // ,{ path: '*', component: footerView,beforeEnter:scrollTop}
    ,{
        path: '/',name: 'footerView', component: footerView,redirect: indexRedirect,
        children:[
            //
            { path: '/user', name: 'user', component: user,beforeEnter:(to,from,next) => setDocumentTitle("会员中心",next)}
            //
            ,{ path: '/shopList' , name: 'shopList' , component: shopList,beforeEnter:(to,from,next) => setDocumentTitle("附近商家",next) }
            //
            ,{ path: '/nearbyHot/specialGoods' , name: 'specialGoods' , component: specialGoods,beforeEnter:(to,from,next) => setDocumentTitle("特卖商品",next) }

            ,{ path: '/nearbyHot/search' , name: 'search' , component: search,beforeEnter:(to,from,next) => setDocumentTitle("搜索",next) }
            //商家详情
            ,{ path: '/shopList/shopDetails' , name: 'shopDetails' , component: shopDetails,beforeEnter:(to,from,next) => setDocumentTitle("商家详情",next) }
            //特卖专区
            ,{ path: '/nearbyHot', name: 'nearbyHot', component: nearbyHot,beforeEnter:(to,from,next) => setDocumentTitle("商桥",next) }
            // 消息模块
            ,{ path: '/messageList', name: 'messageList', component: messageList,beforeEnter:(to,from,next) => setDocumentTitle("我的消息",next) }
            ,{ path: '/messageList/shopAllMessage', name: 'shopAllMessage', component: shopAllMessage,beforeEnter:(to,from,next) => setDocumentTitle("消息列表",next) }

        ]
    }
    ,{ path: '/messageDetails', name: 'messageDetails', component: messageDetails,beforeEnter:(to,from,next) => setDocumentTitle("消息详情",next) }
    // 我的收藏
    ,{
        path: '/user/enshrine',name: 'enshrine',component: enshrine,
        children:[
            // 商品&店铺
            {path: 'list/:type',name: 'enshrineList',component: enshrineList,beforeEnter:(to,from,next) => setDocumentTitle("我的收藏",next)}
        ]
    }

    // 商品详情模块
    ,{ path: '/goodDetails' , name: 'goodDetails' , component: goodDetails,beforeEnter:(to,from,next) => setDocumentTitle("商品详情",next) }
    ,{ path: '/goodsDesc' , name: 'goodsDesc' , component: goodsDesc,beforeEnter:(to,from,next) => setDocumentTitle("图文详情",next) }

    // 商家&商品评论详情模块
    ,{ path: '/evaluate', name: 'evaluate', component: evaluateNav,
        children:[
            //
            {path: 'list/:mode', name: 'evaluateList', component: evaluateList,beforeEnter:(to,from,next) => setDocumentTitle("评价列表",next)}
        ]
    }
    // 全部订单
    ,{ path: '/user/orders', name: 'ordersNav', component: ordersNav,
        children:[
            // 订单类型
            {path: 'list/:type', name: 'orders', component: orders,beforeEnter:(to,from,next) => setDocumentTitle("我的订单",next)}
        ]
    }
    // 我的优惠券
    ,{ path: '/user/coupon', name: 'coupon', component: coupon,beforeEnter:(to,from,next) => setDocumentTitle("我的优惠券",next) }
    ,{ path: '/user/getCoupon', name: 'getCoupon', component: getCoupon,beforeEnter:(to,from,next) => setDocumentTitle("领取优惠券",next) }

    // 我的订单详情 ----代金券&扫码
    ,{ path: '/user/details/chit', name: 'orderChitDetails', component: orderChitDetails,beforeEnter:(to,from,next) => setDocumentTitle("代金券-订单详情",next) }
    ,{ path: '/user/details/scan', name: 'orderScanDetails', component: orderScanDetails,beforeEnter:(to,from,next) => setDocumentTitle("优惠买单详情",next) }

    // 创建订单
    ,{ path: '/user/createOrder', name: 'createOrder', component: createOrder,beforeEnter:(to,from,next) => setDocumentTitle("提交订单",next) }
    ,{ path: '/user/useCoupon', name: 'useCoupon', component: useCoupon,beforeEnter:(to,from,next) => setDocumentTitle("选择可用优惠券",next) }

    // 扫码买单
    ,{ path: '/user/scanBillPay', name: 'scanBillPay', component: scanBillPay ,beforeEnter:(to,from,next) => setDocumentTitle("优惠买单",next)}
    ,{ path: '/user/scanBill', name: 'scanBill', component: scanBill ,beforeEnter:(to,from,next) => setDocumentTitle("确认支付",next)}

    // 普通支付模块
    ,{ path: '/success', name: 'success', component: success ,beforeEnter:(to,from,next) => setDocumentTitle("支付成功",next)}
    ,{ path: '/verifyPay', name: 'verifyPay', component: verifyPay ,beforeEnter:(to,from,next) => setDocumentTitle("确认支付",next)}

    //去评论
    ,{ path: '/user/goEvaluate' , name: 'goEvaluate' , component: goEvaluate ,beforeEnter:(to,from,next) => setDocumentTitle("我要评价",next)}

    // 退款模块
    ,{ path: '/user/applyRefund' , name: 'applyRefund' , component: applyRefund ,beforeEnter:(to,from,next) => setDocumentTitle("申请退款",next)}
    ,{ path: '/user/refundDetail', name: 'refundDetail', component: refundDetail ,beforeEnter:(to,from,next) => setDocumentTitle("退款详情",next)}

    // 我的代金券模块
    ,{ path: '/user/chitList' , name: 'chitList' , component: chitList ,beforeEnter:(to,from,next) => setDocumentTitle("我的代金券",next)}
    ,{ path: '/user/chitDetails' , name: 'chitDetails' , component: chitDetails ,beforeEnter:(to,from,next) => setDocumentTitle("代金券详情",next)}

    // 个人信息模块
    ,{ path: '/user/userInformation' , name: 'userInformation' , component: userInformation ,beforeEnter:(to,from,next) => setDocumentTitle("个人中心",next)}
    ,{ path: '/user/password' , name: 'password' , component: password ,beforeEnter:(to,from,next) => setDocumentTitle("修改密码",next)}
    ,{ path: '/user/bound' , name: 'bound' , component: bound ,beforeEnter:(to,from,next) => setDocumentTitle("商桥卡绑定",next)}
    ,{ path: '/user/activation' , name: 'activation' , component: activation ,beforeEnter:(to,from,next) => setDocumentTitle("实名认证",next)}
    ,{ path: '/user/telBound' , name: 'telBound' , component: telBound ,beforeEnter:(to,from,next) => setDocumentTitle("手机绑定",next)}

    // 相关协议模块
    ,{ path: '/agreement', name: 'agreement', component: agreement ,beforeEnter:(to,from,next) => setDocumentTitle("相关协议",next)}
    ,{ path: '/agreementDetails', name: 'agreementDetails', component: agreementDetails ,beforeEnter:(to,from,next) => setDocumentTitle("协议详情",next)}

    // 我的钱包模块
    ,{ path: '/user/mineWallet',  name: 'mineWallet', component: mineWallet ,beforeEnter:(to,from,next) => setDocumentTitle("我的钱包",next)}
    ,{ path: '/user/walletSet' , name: 'walletSet' , component: walletSet ,beforeEnter:(to,from,next) => setDocumentTitle("我的钱包--帮助",next)}
    ,{ path: '/user/keyboard/:type' , name: 'keyboard' , component: keyboard ,beforeEnter:(to,from,next) => setDocumentTitle("我的钱包--密码设置",next)}
    ,{ path: '/user/redMoney' , name: 'redMoney' , component: redMoney ,beforeEnter:(to,from,next) => setDocumentTitle("我的红包明细",next)}
    ,{ path: '/user/income' , name: 'income' , component: income ,beforeEnter:(to,from,next) => setDocumentTitle("我的钱包--收支明细",next)}
    ,{ path: '/user/recharge' , name: 'recharge' , component: recharge ,beforeEnter:(to,from,next) => setDocumentTitle("钱包充值",next)}

    // 我的养老金模块
    ,{ path: '/user/annuityList',  name: 'annuityList', component: annuityList ,beforeEnter:(to,from,next) => setDocumentTitle("我的养老金",next)}
]
