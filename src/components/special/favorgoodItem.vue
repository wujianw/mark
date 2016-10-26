<template>
    <router-link tag="li" :to="{name:''}"  class="unit" >
        <div class="good-pic">
            <img :src="good.goodsImages" alt="">
        </div>
        <div class="good-info">
            <div class="shop-name-wrap flex-space">
                <h3><i></i>{{good.goodsName}}</h3>
                <message-mark>
                    <span class="mark">7折</span>
                </message-mark>
            </div>
            <p class="title">{{good.goodsTitle}}</p>
            <div class="information flex-space">
                <p>{{good.salesPrice}}</p>
                <p>1.8km</p>
            </div>
        </div>
    </router-link>
</template>
<style lang="scss">
    /* 单个商品 */
    .unit{
        background-color:#fff;
        flex-grow:1;
        float:left;
        border:1px solid #f3f3f3;

    }
    .unit:nth-of-type(2n){margin:0 20px 20px 10px;}
    .unit:nth-of-type(2n+1){margin:0 10px 20px 20px;}
    .unit:last-of-type{flex-grow:0;}
    .unit .good-pic{border:1px solid #f2f2ef;width:340px;height:340px;}
    .unit .good-pic img{width:100%;height:100%;}
    .unit .good-info{
        .shop-name-wrap{
            height:54px;
            padding-left:20px;
            h3{
                font-size:20px;
                color:#838383;
            }
            .mark{
                display: inline-block;
                font-size:22px;
            }
        }
        .title{
            padding:0 20px;
            color:#505050;
            font-size:22px;
            line-height:1.2;
            white-space:nowrap;
            text-overflow:ellipsis;
            overflow:hidden;width:12em;
        }
        .information{
            height:80px;
            padding:0 20px;
            p:first-of-type{
                font-family:"Microsoft Yahei";
                font-size:26px;
                color:#e85352;
                &:before{content:"￥";font-size:20px;}
            }
            p:last-of-type{
                font-size:20px;
                color:#838383;
            }
        }
    }
</style>
<script type="text/babel">
    /*
     * 特产区商品组件 router-link
     * @params {to,good}
     */
    import messageMark from "../messageMark"
    export default{
        data(){
            return{

            }
        }
        ,components:{
            messageMark
        }
        ,props:{
            good:{
                type:Object,
                default() {
                    return{

                    }
                }
            }
        }
    }
</script>
