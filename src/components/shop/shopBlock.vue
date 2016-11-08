<template>
    <div class="shop-block-el">
        <router-link tag="div" :to="{name:'shopDetails'}" class="flex-space">
            <div class="flex-start content-wrap">
                <div class="pic">
                    <img :src="imgUrl" alt="">
                </div>
                <div class="content">
                    <div class="shop-name">{{obj.merchant_name}}<i class="icon icon-yen"></i></div>
                    <div class="evaluate">
                        <star :score="obj.score"></star>
                        <span>{{obj.score}}评价</span>
                    </div>
                </div>
            </div>
            <div class="integral-distance">
                <div class="distance">{{obj.distance | distance}}km</div>
                <message-mark class="integral"><span>赠{{obj.fraction | percentage}}养老金</span></message-mark>
            </div>
        </router-link>
        <div class="benefit-special">
            <div class="benefit"><i class="icon icon-benefit"></i>到店买单<span>9折（扫码立减）</span></div>
            <div class="special"><i class="icon icon-special"></i>商家E&nbsp店<span>多件特价正在进行中</span></div>
        </div>
    </div>
</template>
<style lang="scss" rel="stylesheet/scss">
    .shop-block-el{
        background:#fff;
        border-top:6px solid #f2f2f2;
        .pic{
            height:146px;
            width:226px;
            padding:12px;
            img{width:100%;height:100%;}
        }
        .content{
            padding-left:15px;
            max-width: 300px;
            .shop-name{
                font-size:30px;
                color:#505050;
                i{font-size:30px;color:#e95453;}
            }

        }
        /* 积分率&距离 */
        .integral-distance{
            align-self:flex-start;
            .distance{
                text-align:center;
                line-height:68px;
                font-size:20px;
                color:#838383;
            }
            .integral{
                margin-top:16px;
            }
        }
        /* 活动简介--> 优惠&特殊 */
        .benefit-special{
            border-top:1px solid #f2f2f2;
            border-bottom:1px solid #f2f2f2;
            color:#505050;
            font-size:22px;
            i{padding:12px;font-size:26px;}
            .benefit{
                padding:16px 0 8px;
                i{color:#f7a926;}
            }
            .special{
                padding:8px 0 16px;
                i{color:#e85350;}
            }
            span{padding-left:40px;color:#afafaf;}
        }
    }
    /* 评价 */
    .evaluate{
        padding-top:26px;
        font-size:20px;
        color:#afafaf;
    }
</style>
<script type="text/babel">
    import messageMark from "../messageMark"
    import star from "../star"
    import {imgLoad} from "../../assets/js/public"
    import shopPic from "../../assets/img/default-shop.jpg"

    export default {
        data() {
            return {
                evaluate:0,
                imgUrl:shopPic
            }
        }
        ,computed:{
//            imgUrl() {
//            http://p-shop.jfb315.cn/htdocs/upload/shop/2016_05_08/1ad448a6-503b-47ed-b679-5bc246f0543c.jpg@226_146h
//                let img = new Image()
//                let url = this.obj.background+'@226_146h'
//                img.src = url
//                img.onerror = function () {
//                    return '../../assets/img/default-shop.jpg'
//                }
//                img.onload = function () {
//                    return url
//                }
//            }
        },
        created() {
            let self = this
            let img = new Image()
            img.src = this.obj.background+'@226_146h'
            img.onload = function () {
                self.imgUrl = self.obj.background+'@226_146h'
            }
        }
        ,filters:{
            percentage(value){
                return (value*100).toFixed(2)+"%"
            },
            distance(value){
                return (value/1000).toFixed(2)
            }
        }
        ,props:{
            obj:{
                type:Object,
                default() {
                    return {
                        merchant_name:null,
                        fraction:0,
                        score:0,
                        background:null,
                        distance:'计算中...'
                    }
                }
            }
        }

        ,methods:{
        }
        ,components:{ messageMark, star }
    }
</script>
