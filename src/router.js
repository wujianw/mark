// 登入
const loadMobile = resolve => require(['./components/load_mobile'], resolve)
const loadUser = resolve => require(['./components/load_user'], resolve)

// 会员中心 --
const user = resolve => require(['./components/user'], resolve)

// 个人信息
const userInformation = resolve => require(['./components/userInformation'], resolve)
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
        path: '/load/:token',
        name: 'user',
        component: user
    }
    ,{
        path: '/user/details',
        name: 'userInformation',
        component: userInformation
    }
]
