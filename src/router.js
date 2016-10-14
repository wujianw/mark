const LoadMobile = resolve => require(['./components/load_mobile'], resolve)
const LoadUser = resolve => require(['./components/load_user'], resolve)
const User = resolve => require(['./components/user'], resolve)

export const routes = [
  { path: '/login/mobile',
    name: 'loadMobile',
    component: LoadMobile
  }
  ,{
    path: '/login/user',
    name: 'loadUser',
    component: LoadUser
  }
  ,{
    path: '/load/:token',
    name: 'user',
    component: User
  }
]
