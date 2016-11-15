<template>
    <div class="good-review-el">
        <ul >
            <li v-for="review in reviews" class="good-review-li">
                <div class="flex-space">
                    <p class="info info-js evaluate">
                        <span class="info-name">{{review.memberName}}</span>
                        <star :score="review.score"></star>
                    </p>
                    <p class="time">{{review.reviewTime}}</p>
                </div>
                <p class="content">{{review.content}}</p>
            </li>
        </ul>
        <div class="btn-wrap flex-center">
            <router-link tag="span" :to="{name:'evaluateList',params:{mode:0},query:{goodsId,merchantId}}">查看全部</router-link>
        </div>
    </div>
</template>
<style lang="scss" rel="stylesheet/scss">
    /* 评论 */
    .good-review-el{
        .good-review-li{
            padding:0 26px;
            border-bottom:1px solid #e6e6e6;
            &:last-of-type{
                 border:none;
                .content{margin:0;}
            }
            p{
                padding:10px 0;
                font-size:20px;
                font-family:"Microsoft Yahei";
                &.time{
                     font-size:18px;
                     color:#bab9b9;
                 }
            }
            .info{color:#f90;}
            .info-name{padding-right:46px;}
            .content{
                margin:2px 0 6px;
                line-height:1.2;
                color:#505050;
            }
        }
        .btn-wrap{
            padding:20px 0;
            span{
                padding:0.2em .6em;
                border:1px solid #e85453;
                border-radius: .2em;
                font-size:24px;
                color:#e85352;
            }
        }
    }
</style>
<script type="text/babel">
    import star from "../star"
    export default{
        components:{
            star
        }
        ,props:{
            reviews:{
                type:Array
            },
            goodsId:{
                type:[String,Number],
                default:''
            },
            merchantId:{
                type:[String,Number],
                default:''
            }
        }
  }
</script>
