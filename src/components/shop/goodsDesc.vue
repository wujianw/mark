<template>
    <div class="message-count" v-html="goodsDesc"></div>
</template>
<style lang="scss" rel="stylesheet/scss">

</style>
<script type="text/babel">
    /*
     * 箭头标签组件
     * @params
     */
    import {mapGetters} from 'vuex'
    export default{
        data(){
            return{

            }
        }
        ,computed:{
            ...mapGetters({
                goodsDesc:'goodsDesc'
            })
        }
        ,components:{

        }
    }
</script>
