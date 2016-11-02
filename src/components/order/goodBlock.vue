<template>
    <router-link :to="to" tag="div" class="good-block-el flex-space">
        <div class="good-pic"><img src="../../../static/img/good-pic.jpg" alt=""></div>
        <div class="good-details flex-space">
            <div>
                <p class="shop-name">商家名称</p>
                <p class="good-name">商品名称</p>
                <p class="gold">300.33</p>
            </div>
            <p><i class="icon icon-arrow-right"></i></p>
        </div>
    </router-link>
</template>
<style lang="scss" rel="stylesheet/scss">
    .good-block-el{
        font-family:"Microsoft Yahei";
        .good-pic{
            width:160px;
            height:160px;
            padding:12px;
            img{
                width:100%;
                height:100%;
            }
        }
        .good-details{
            flex-grow:3;
            padding:8px 26px 0 6px;
            font-size:26px;
            line-height:40px;
            font-family:"sans-serif";
            .shop-name{
                color:#505050;
            }
            .good-name{
                color:#afafaf;
            }
            .gold{
                padding-top:10px;
                color:#e85352;
                &:before{content:"￥"}
            }
            i{font-size:30px;color:#505050;}
        }
    }
</style>
<script>
    export default{
        data(){
            return{

            }
        }
        ,components:{

        }
        ,props:{
            to:{
                type:Object,
                default:function() {
                    return {
                        name:""
                    }
                }
            }
        }
    }
</script>
