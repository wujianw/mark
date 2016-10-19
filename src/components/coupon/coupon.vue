<template>
    <div>
        <header-nav :links="links"></header-nav>
    </div>
</template>
<style lang="scss">

</style>
<script type="text/babel">
    import headerNav from '../headerNav'
    export default{
        data(){
            return{
                links:{
                    left:{
                        to:{name:"couponList",params:{type:"all"}},
                        name:"通用红包"
                    }
                    ,right:{
                        to:{name:"couponList",params:{type:"olnShop"}},
                        name:"商家优惠券"
                    }
                }
            }
        }
        ,components:{
            headerNav
        }
    }
</script>
