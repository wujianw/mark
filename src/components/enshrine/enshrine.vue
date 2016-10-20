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
                        to:{name:"enshrineList",params:{type:"shops"}},
                        name:"收藏店铺"
                    }
                    ,right:{
                        to:{name:"enshrineList",params:{type:"goods"}},
                        name:"收藏商品"
                    }
                }
            }
        }
        ,components:{
            headerNav
        }
    }
</script>
