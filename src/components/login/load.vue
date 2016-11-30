<template>
    <div>
        <header-nav :links="links"></header-nav>
    </div>
</template>
<script type="text/babel">
    import headerNav from '../headerNav'
    export default{
        data(){
            return{
                links:{
                    left:{
                        to:{name:"loadMobile",params:{type:"all"},query:this.$route.query},
                        name:"手机验证登录"
                    }
                    ,right:{
                        to:{name:"loadUser",params:{type:"olnShop"},query:this.$route.query},
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
