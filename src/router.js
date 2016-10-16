// 登入
const loadMobile = resolve => require(['./components/load_mobile'], resolve)
const loadUser = resolve => require(['./components/load_user'], resolve)

// 会员中心 --
const user = resolve => require(['./components/user'], resolve)

// 个人信息
const userInformation = resolve => require(['./components/userInformation'], resolve)

//绑定
const bound = resolve => require(['./components/bound'], resolve)


const orders = resolve => require(['./components/orders'], resolve)

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
]
