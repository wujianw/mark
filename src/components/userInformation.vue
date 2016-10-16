<template>
    <div class="user-information-bg">
        <div class="user-information-wrap">
            <link-list v-for="item in lists" :title="item.title" :icon="item.icon" :to="item.to" :details="item.details"></link-list>
        </div>
    </div>
</template>
<style lang="scss">
    .user-information-bg{
        background:#fff;
    }
    .user-information-wrap{
        border-top:18px solid #f2f2f2;
        .link-li{
            height:75px;
            padding-left:0;
            margin-left:54px;
            .title-name{
                color:#505050;
                i{font-size:40px;padding:0 33px 0 3px;}
            }
            .link-details{
                font-size:20px;
                &:before{color:#e85352;padding:0 10px;}
            }
        }
    }
</style>
<script type="text/babel">
    import linkList from './linkList'
    export default {
        data() {
            return {
                lists:{
                    nickname:{
                        title:"微信昵称",
                        icon:{
                            iconClass:'icon-nickname'
                        },
                        to: {name: 'loadMobile' },
                        details:'去认证'
                    }
                    ,block:{
                        title:"积分宝卡",
                        icon:{
                            iconClass:'icon-block'
                        },
                        to: {name: 'bound' },
                        details:"去绑定"
                    }
                    ,address:{
                        title:"收货地址",
                        icon:{
                            iconClass:'icon-address'
                        },
                        to: {name: 'loadMobile' },
                        details:"添加/修改"
                    }
                    ,bound:{
                        title:"手机绑定",
                        icon:{
                            iconClass:'icon-bound'
                        },
                        to: {name: 'loadMobile' },
                        details:"添加/修改"
                    }
                    ,password:{
                        title:"登入密码",
                        icon:{
                            iconClass:'icon-password'
                        },
                        to: {name: 'loadMobile' },
                        details:"修改/找回"
                    }
                    ,agreement:{
                        title:"相关协议",
                        icon:{
                            iconClass:'icon-address'
                        },
                        to: {name: 'loadMobile' }
                    }
                }
            }
        }
        ,components:{
            linkList
        }
    }
</script>
