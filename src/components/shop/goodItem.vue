<template>
    <router-link tag="li" :to="{name:'goodDetails',query:{goodsId:obj.id}}" class="good-list-el flex-space">
        <div class="flex-start">
            <div class="good-pic"><img :src="obj.goodsImages" alt=""></div>
            <div class="good-details">
                <p class="title">{{obj.goodsName}}</p>
                <p class="gold">{{obj.salesPrice}}<span>{{obj.marketPrice}}</span></p>
            </div>
        </div>
        <p class="btn">购买</p>
    </router-link>
</template>
<script type="text/babel">
    /*
     * 商品组件  --- 商家详情使用
     * @params
     */
    export default{
        data(){
            return {

            }
        }
        ,props:{
            obj:{
                type:Object
            }
        }
    }
</script>
<style lang="scss" rel="stylesheet/scss">
    .good-list-el{
        border-bottom:1px solid #f2f2f2;
        height:176px;
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
            .title{
                line-height:68px;
                font-size:26px;
                color:#505050;
            }
            .gold{
                line-height: 46px;
                font-size:28px;
                color:#e85352;
                font-family:"Microsoft Yahei";
                &:before{content:"￥";font-size:22px;}
                span{
                    display:inline-block;
                    padding-left:28px;
                    font-size:24px;
                    color:#afafaf;
                    &:before{content:"￥";font-size:20px;}
                }
            }
        }
        .btn{
            margin-right:24px;
            width: 138px;
            border-radius: .2em;
            background:#e85352;
            text-align: center;
            line-height:52px;
            font-size:26px;
            color:#fff;
        }
    }
</style>
