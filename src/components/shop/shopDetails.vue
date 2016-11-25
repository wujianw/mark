<template>
    <div class="shop-details-el">
        <header class="hd">
            <div class="enshrine" @click="collect"><i>收藏</i></div>
            <div class="img-wrap">
                <img :src="info.background" alt="">
            </div>
        </header>
        <section>
            <div class="title-wrap flex-space">
                <h3>{{info.merchant_name}}</h3>
                <div class="integral">{{info.fraction | percentage}}</div>
            </div>
            <div class="position-wrap flex-space">
                <div class="position">
                    <i class="icon icon-position"></i>
                    <span>{{info.address}}</span>
                </div>
                <a class="phone" :href="'tel:'+ tel">
                    <i class="icon icon-tel"></i>
                </a>
            </div>
        </section>
        <section class="sweep-pay-wrap section" v-if="info.isCashpayment==1">
            <div class="sweep-pay title-wrap flex-space">
                <div class="title">
                    <i class="icon icon-benefit"></i>
                    <span>到店买单</span>
                </div>
                <router-link :to="{name:'scanBill',query:{shopName:info.merchant_name,shopId:info.merchant_id}}" class="sweep-pay-link" >我要买单</router-link>
            </div>
            <div class="active-rule">
                <!--<p>{{info.campaign.title}}</p>-->
            </div>
        </section>
        <section class="coupon-wrap section" v-if="info.listBenefit">
            <div class="coupon title-wrap flex-space">
                <div class="title">
                    <i class="icon icon-special"></i>
                    <span>商家优惠券</span>
                </div>
            </div>
            <coupon-item v-for="item in info.listBenefit" :obj="item"></coupon-item>
        </section>
        <section class="good-wrap section" v-if="goods.length">
            <div class="good title-wrap flex-space">
                <div class="title">
                    <i class="icon icon-special"></i>
                    <span>代金券</span>
                </div>
            </div>
            <ul class="good-list">
                <good-item v-for="item in goods" :obj="item"></good-item>
            </ul>
        </section>
        <section class="review-wrap section" v-if="review.length != 0">
            <div class="review title-wrap flex-space">
                <div class="title">
                    <span>商家评论({{reviewLen}})</span>
                </div>
            </div>
            <div class="good-list">
                <good-review :reviews="review" :merchantId="info.merchant_id"></good-review>
            </div>
        </section>
    </div>
</template>
<style lang="scss" rel="stylesheet/scss">
    .shop-details-el{
        background:#fff;
        .hd{
            position:relative;
            .enshrine{
                position:absolute;
                top:0;
                width:90%;
                padding:0 5%;
                line-height:78px;
                background:rgba(0,0,0,.3);
                text-align: right;
                i{font-size:28px;}
            }
            .img-wrap{
                height:380px;
                img{width:100%;height:100%;}
            }

        }
        /* 标题&积分率 */
        .title-wrap{
            height:90px;
            h3{
                padding-left:26px;
                text-align:center;
                font-size:32px;
                color:#505050;
            }
            .integral{
                padding:0 20px 0 30px;
                background:#f9a929;
                background:
                        linear-gradient(135deg,transparent 15px , #f9a929 0) top left,
                        linear-gradient(45deg,transparent 15px , #f9a929 0) bottom left;
                background-size:100% 50%;
                background-repeat:no-repeat;
                line-height:30px;
                color:#fff;
                &:before{content:"赠";}
                &:after{content:"养老金";}
            }
        }
        /* 位置 */
        .position-wrap{
            height:66px;
            padding-left:26px;
            border-top:1px solid #f2f2f2;
            .position{

                font-size:26px;
                color:#807f7f;
                span{padding-left:12px;}
                i{font-size:26px;}
            }
            .phone{
                padding:2px 22px;
                border-left:1px solid #f2f2f2;
                color:#e85352;
                i{font-size:40px;}
            }
        }
        /* 活动规则 */
        .active-rule{
            text-align:center;
            p{line-height:66px;font-size:22px;color:#505050;}
        }
        /* section 通用样式 */
        .section{
            border-top:16px solid #f2f2f2;
            .title-wrap{
                height:84px;
                padding:0 22px 0 26px;
                border-bottom:1px solid #f2f2f2;
                .title{
                    span{
                        padding-left:26px;
                        font-size:28px;
                        color:#505050;
                    }
                    i{font-size:26px;}
                }
                .sweep-pay-link{
                    display: inline-block;
                    width:138px;
                    border-radius: .2em;
                    background:#e85352;
                    text-align: center;
                    line-height:52px;
                    font-size:24px;
                    color:#fff;
                }
            }
            &:last-of-type{
                margin-bottom:98px;
            }
        }
        /* 到店买单 */
        .sweep-pay{
            i{color:#f8ac20;}
        }
        /* 商家优惠券 */
        .coupon{
            i{color:#f8ac20;}
        }

        .good{
            i{color:#e65150;}
        }
        .link-picword{
            margin-bottom:88px;
            text-align:center;font:20px/78px "微软雅黑";color:#505050;background:#e3e3e3;
            background:linear-gradient(0deg,#e3e3e3 38px,#a4a4a4 1px,#e3e3e3 39px) top left,
            linear-gradient(0deg,#e3e3e3 38px,#a4a4a4 1px,#e3e3e3 39px) bottom right,
            linear-gradient(0deg,#e3e3e3 38px,#e3e3e3 1px,#e3e3e3 39px) center;
            background-size: 266px 100%;background-repeat:no-repeat;
        }
    }
</style>
<script type="text/babel">
    import goodReview from './goodReview'
    import goodItem from "./goodItem"
    import couponItem from "./couponItem"
    import shop from "../../api/shop"
    import member from "../../api/member"
    import MessageBox from "../../msgbox"
    export default{
        data(){
            return{
                tel:'',
                info:{
                    background:'',
                    merchant_name:'',
                    fraction:0,
                    merchant_id:'',
                    isCashpayment:0,
                    campaign:{
                        title:''
                    },
                    listBenefit:null
                },
                goods:[],
                review:[],
                reviewLen:0
            }
        }
        ,beforeRouteEnter(to,from,next) {
            let shopId = to.query.shopId
            shop.getShopDetails({shopId}).then(data => {
                next(vm => {
                    vm.info = data.info
                    vm.review = data.reviews.datas.slice(0,2)
                    vm.reviewLen = data.reviews.total
                    vm.goods = data.goods.filter(item => item.consumeMode == 'offline')
                    vm.tel = data.info.tel || data.info.mobile_number
                })
            })
        }
        ,methods:{
            collect() {
                member.getCollect({collectType:"1",collectId:this.$route.query.shopId}).then(() => {
                        MessageBox.alert("收藏成功")
                }).catch(() =>{
                        MessageBox.alert("您已经收藏该商家")
                })
            }
        }
        ,components:{goodItem, goodReview,couponItem}
    }
</script>
