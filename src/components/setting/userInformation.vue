<template>
    <div class="user-information-bg">
        <div class="user-information-wrap">
            <link-list v-for="item in lists" :title="item.title" :icon="item.icon" :to="item.to" :details="item.details"></link-list>
        </div>
        <submit class="submit" @commit="logout" value="退出登录" :dis="!1"></submit>
    </div>
</template>
<style lang="scss" rel="stylesheet/scss">
    .user-information-bg{
        .submit{
            margin:200px 20px;
        }
    }
    .user-information-wrap{
        background:#fff;
        border-top:18px solid #f2f2f2;
        .link-li{
            height:88px;
            padding-left:0;
            margin-left:54px;
            .title-name{
                color:#505050;
                i{font-size:40px;padding:0 33px 0 3px;}
                &:after{font-size:30px;}
            }
            .link-details{
                font-size:24px;
                &:before{color:#e85352;padding:0 10px;}
            }
        }
    }
</style>
<script type="text/babel">
    import linkList from './../linkList'
    import submit from './../submit'
    import member from '../../api/member'
    import store from '../../store'
    import {mapGetters} from 'vuex'
    export default {
        computed:{
            ...mapGetters({
                getMember:'getMember'
            }),
            mActivate(){
                let reg  = /^9[1,9]/g
                return reg.test(this.getMember.mIdentityId)
            },
            mBinding() {
                let reg  = /^00/g
                return reg.test(this.getMember.cId)
            },
            lists() {
                return {
                    nickname:{
                        title:"微信昵称",
                        icon:{
                            iconClass:'icon-nickname'
                        },
                        to: {name: 'activation',query:{mActivate:this.getMember.mActivate}},
                        details:this.mActivate ? "去认证" :  "已认证"
                    }
                    ,block:{
                        title:"积分宝卡",
                        icon:{
                            iconClass:'icon-block'
                        },
                        to: {
                            name: this.getMember.mBinding == 0 ? 'bound' : ''
                        },
                        details:this.mBinding ? "去绑定" : "已绑定"
                    }
//                    ,address:{
//                        title:"收货地址",
//                        icon:{
//                            iconClass:'icon-address'
//                        },
//                        to: {name: 'loadMobile' },
//                        details:"添加/修改"
//                    }
                    ,bound:{
                        title:"手机绑定",
                        icon:{
                            iconClass:'icon-bound'
                        },
                        to: {name: 'telBound' },
                        details:this.getMember.mMobile.length == 11 ? "换绑" : "去绑定"
                    }
                    ,password:{
                        title:"登入密码",
                        icon:{
                            iconClass:'icon-password'
                        },
                        to: {name: 'password'},
                        details:"修改/找回"
                    }
                    ,agreement:{
                        title:"相关协议",
                        icon:{
                            iconClass:'icon-agreement'
                        },
                        to: {name: 'agreement' }
                    }
                }
            }
        },
        beforeRouteEnter(to,from,next) {
            if(typeof window.localStorage.token == 'undefined' || window.localStorage.token.length < 6) {
                next({name:'nearbyHot'})
            }else {
                store.dispatch("getUser").then(() => {
                    next()
                }).catch(() => {
                    next({name:'loadMobile',query:{from:'user'}})
                })
            }
        }
        ,methods:{
            logout() {
                this.$router.replace({name:'loadMobile',query:{from:'user'}})
            }
        }
        ,components:{linkList,submit}
    }
</script>
