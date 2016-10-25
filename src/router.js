//header-view 组件
const login = resolve => require(['./components/login/load'], resolve)
// 登入
const loadMobile = resolve => require(['./components/login/load_mobile'], resolve)
const loadUser = resolve => require(['./components/login/load_user'], resolve)

//优惠券列表
const coupon = resolve => require(['./components/coupon/coupon'], resolve)
const couponList = resolve => require(['./components/coupon/couponList'], resolve)

//我的收藏
const enshrine = resolve => require(['./components/enshrine/enshrine'], resolve)
const enshrineList = resolve => require(['./components/enshrine/enshrineList'], resolve)

//footer-view 组件
const footerView = resolve => require(['./components/footerNav'], resolve)
    // 会员中心 --
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

//订单列表 {query:{token,goodId},params:{type}}
const orders = resolve => require(['./components/order/orders'], resolve)

//订单详情 {query:{orderName},params:{type}}
const orderDetails = resolve => require(['./components/order/orderDetails'], resolve)

//退款详情
const applyRefund = resolve => require(['./components/order/applyRefund'], resolve)

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


export const routes = [
    {
        path: '/login',name: 'login',component:login,
        children:[
            //手机验证码登入
            { path: 'mobile', name:'loadMobile', component: loadMobile },
            //帐号密码登入
            { path: 'user', name:'loadUser', component: loadUser }
        ]
    }

    ,{
        path: '/',name: 'footerView',component: footerView,
        children:[
            // 会员中心
            { path: '/user' , name: 'user' , component: user }
            // 附近商家
            ,{ path: '/shopList' , name: 'shopList' , component: shopList }
            // 特价商品列表
            ,{ path: '/shopList/specialGoods' , name: 'specialGoods' , component: specialGoods }
            //商家详情
            ,{ path: '/shopList/shopDetails' , name: 'shopDetails' , component: shopDetails }
        ]
    }

    ,{ path: '/goodDetails' , name: 'goodDetails' , component: goodDetails }
    ,{
        path: '/user/enshrine',name: 'enshrine',component: enshrine,
        children:[
            // 商品&店铺
            {path: 'list/:type',name: 'enshrineList',component: enshrineList}
        ]
    }


    ,{ path: '/evaluate' , name: 'evaluate' , component: evaluateNav,
        children:[
            // 商品&店铺
            {path: 'list',name: 'evaluateList',component: evaluateList}
        ]
    }


    ,{ path: '/user/details' , name: 'userInformation' , component: userInformation }
    ,{ path: '/user/password' , name: 'password' , component: password }
    ,{ path: '/user/bound' , name: 'bound' , component: bound }
    ,{ path: '/user/orders/:type' , name: 'orders' , component: orders }
    ,{ path: '/user/orders/:type/details' , name: 'orderDetails' , component: orderDetails }
    ,{ path: '/user/applyRefund' , name: 'applyRefund' , component: applyRefund }
    ,{ path: '/user/chitList' , name: 'chitList' , component: chitList }
    ,{ path: '/user/chitDetails' , name: 'chitDetails' , component: chitDetails }
    ,{
        path: '/user/coupon', name: 'coupon', component: coupon,
        children:[
            //通用红包 & 商家优惠券
            {path: 'list/:type',name: 'couponList',component: couponList}
        ]
    }
    ,{ path: '/agreement', name: 'agreement', component: agreement }
    ,{ path: '/agreementDetails', name: 'agreementDetails', component: agreementDetails }
    ,{ path: '/mineWallet',  name: 'mineWallet', component: mineWallet }
    ,{ path: '/user/annuityList',  name: 'annuityList', component: annuityList }
    ,{ path: '/walletSet' , name: 'walletSet' , component: walletSet }
    ,{ path: '/redMoney' , name: 'redMoney' , component: redMoney }
    ,{ path: '/income' , name: 'income' , component: income }
    ,{ path: '/recharge' , name: 'recharge' , component: recharge }
]
