<template>
    <div>
        <header-nav :links="links"></header-nav>
    </div>
</template>
<style lang="scss">
    .load-wrap{ background: #fff; text-align: center; }
    .load-link{ flex-grow: 1; font: 28px/76px "Microsoft Yahei"; border-bottom: 5px solid #afafaf; }
    .load-link span{ color: #505050; }
    .load-active{ border-bottom: 5px solid #e85350; }
    .load-active span{ color: #e85352; }

    .left-enter-active, .left-leave-active {
        transition: opacity .5s;
    }
    .left-enter, .left-leave-active {
        opacity: 0;
    }
</style>
<script type="text/babel">
    import headerNav from '../headerNav'
    export default{
        data(){
            return{
                links:{
                    left:{
                        to:{name:"loadMobile",params:{type:"all"}},
                        name:"手机验证登录"
                    }
                    ,right:{
                        to:{name:"loadUser",params:{type:"olnShop"}},
                        name:"账号密码登录"
                    }
                }
            }
        }
        ,components:{
            headerNav
        }
    }
</script>
