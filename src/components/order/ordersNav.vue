<template>
    <div>
        <header-nav :links="links"></header-nav>
    </div>
</template>
<style lang="scss" rel="stylesheet/scss">

</style>

<script type="text/babel">
    /*
     * orders导航
     * @params
     */
    import headerNav from "../headerNav"
    export default{
        data(){
            return{
                links:{
                    left:{
                        to:{name:"orders",params:{type:"chit"},query:this.$route.query},
                        name:"代金券"
                    }
                    ,right:{
                        to:{name:"orders",params:{type:"scan"},query:this.$route.query},
                        name:"到店买单"
                    }
                }
            }
        }
        ,components:{
            headerNav
        }
    }
</script>
