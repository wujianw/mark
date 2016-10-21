// 登入
const loadMobile = resolve => require(['./components/load_mobile'], resolve)
const loadUser = resolve => require(['./components/load_user'], resolve)

// 会员中心 --
const user = resolve => require(['./components/user'], resolve)

// 个人信息
const userInformation = resolve => require(['./components/userInformation'], resolve)

//绑定
const bound = resolve => require(['./components/bound'], resolve)

//订单列表 {query:{token,goodId},params:{type}}
const orders = resolve => require(['./components/orders'], resolve)

//订单详情 {query:{orderName},params:{type}}
const orderDetails = resolve => require(['./components/orderDetails'], resolve)

//退款详情
const applyRefund = resolve => require(['./components/applyRefund'], resolve)

//代金券列表
const chitList = resolve => require(['./components/chit/chitList'], resolve)
const chitDetails = resolve => require(['./components/chit/chitDetails'], resolve)

//优惠券列表
const coupon = resolve => require(['./components/coupon/coupon'], resolve)
const couponList = resolve => require(['./components/coupon/couponList'], resolve)

//协议列表
const agreement = resolve => require(['./components/agreement'], resolve)

//协议详情
const agreementDetails = resolve => require(['./components/agreementDetails'], resolve)

//我的钱包
const mineWallet = resolve => require(['./components/mineWallet'], resolve)


//钱包设置
const walletSet = resolve => require(['./components/walletSet'], resolve)

//现金红包
const redMoney = resolve => require(['./components/redMoney'], resolve)

//收支明细
const income = resolve => require(['./components/income'], resolve)

//充值
const recharge = resolve => require(['./components/recharge'], resolve)

export const routes = [
    {
        path: '/login/mobile',
        name: 'loadMobile',
        component: loadMobile
    }
    ,{
        path: '/login/user',
        name: 'loadUser',
        component: loadUser
    }
    ,{
        path: '/login/success',
        name: 'user',
        component: user
    }
    ,{
        path: '/user/details',
        name: 'userInformation',
        component: userInformation
    }
    ,{
        path: '/user/bound',
        name: 'bound',
        component: bound
    }
    ,{
        path: '/user/orders/:type',
        name: 'orders',
        component: orders
    }
    ,{
        path: '/user/orders/:type/details',
        name: 'orderDetails',
        component: orderDetails
    }
    ,{
        path: '/user/orders/applyRefund',
        name: 'applyRefund',
        component: applyRefund
    }
    ,{
        path: '/user/chitList',
        name: 'chitList',
        component: chitList
    }
    ,{
        path: '/user/chitDetails',
        name: 'chitDetails',
        component: chitDetails
    }
    ,{
        path: '/user/coupon', name: 'coupon', component: coupon,
        children:[{path: '/list/:type',name: 'couponList',component: couponList}]
    }

    ,{
        path: '/agreement',
        name: 'agreement',
        component: agreement
    }
    ,{
        path: '/agreementDetails',
        name: 'agreementDetails',
        component: agreementDetails
    }
    , {
        path: '/mineWallet' ,
        name: 'mineWallet' ,
        component: mineWallet
    },
     {
        path: '/walletSet' ,
        name: 'walletSet' ,
        component: walletSet
    },
    {
        path: '/redMoney' ,
        name: 'redMoney' ,
        component: redMoney
    }
    ,
    {
        path: '/income' ,
        name: 'income' ,
        component: income
    }
    ,
    {
        path: '/recharge' ,
        name: 'recharge' ,
        component: recharge
    }




]
