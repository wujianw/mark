<template>
    <router-link tag="li" :to="{name:'goodDetails' ,query:{goodsId:good.id}}" class="special-index-good-el flex-space">
        <div class="flex-start">
            <div class="good-pic"><img :src="good.goodsImages" alt=""></div>
            <div class="good-details">
                <p class="shop-name"><i class="icon icon-shop"></i>{{good.merchantName}}</p>
                <p class="title">{{good.goodsName}}</p>
                <p class="gold">{{good.salesPrice}}<span>{{good.marketPrice}}</span></p>
            </div>
        </div>
        <mark class="position">{{good.distance}}m</mark>
    </router-link>
</template>
<script type="text/babel">
    /*
     * 商品组件  --- 用于：特产区首页
     * @params
     */
    export default{
        props:{
            good:Object
        }
    }
</script>
<style lang="scss" rel="stylesheet/scss">
    .special-index-good-el{
        height:176px;
        border-bottom: 18px solid #f2f2f2;
        .good-pic{
            width:144px;
            height:144px;
            padding:12px;
            img{
                width:100%;
                height:100%;
            }
        }
        .good-details{
            padding-left:12px;
            .shop-name{
                font-size:20px;
                color:#838383;
                i{font-size:20px;color:#fda524;}
            }
            .title{
                line-height:68px;
                font-size:26px;
                color:#505050;
            }
            .gold{
                line-height: 46px;
                font-size:32px;
                color:#e85352;
                font-family:"Microsoft Yahei";
                &:before{content:"￥";font-size:24px;}
                span{
                    display:inline-block;
                    padding-left:10px;
                    font-size:24px;
                    color:#afafaf;
                    &:before{content:"￥";font-size:20px;}
                }
            }
        }
        .position{
            align-self: flex-start;
            padding:32px;
            background:transparent;
            font-size:26px;
            color:#838383;
        }
    }
</style>
