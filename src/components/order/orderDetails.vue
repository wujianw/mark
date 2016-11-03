<template>
    <div class="order-details-el">
        <good-block v-if="good" :good="good"></good-block>
        <div class="ticket-block-wrap">
            <div class="ticket-block-el">
                <div class="flex-space ticket-wrap">
                    <div class="ticket" :data-ticket-type="details.goodsName">
                        <span>有效期至：{{details.couponGmtEnd | date}}</span>
                    </div>
                    <router-link tag="div" :to="{name:'applyRefund'}" v-if="btnClass" class="refund-btn"></router-link>
                </div>
            </div>
            <ticket-block v-for="item in coupons" :obj="item"></ticket-block>
        </div>
        <!--<template v-if="state=='created'">-->
        <div class="details-block" >
            <link-list :title="title"></link-list>
            <div class="flex-space details-wrap shop">
                <div class="shop-details">
                    <p class="shop-name">{{details.merchantName}}</p>
                    <p class="shop-address">{{details.merchantAddress}}</p>
                    <p><i class="icon icon-orders"></i>定位。。。。</p>
                </div>
                <div class="iphone flex-space"><i class="icon icon-orders"></i></div>
            </div>
        </div>
        <div v-if="details.couponUseDesc && details.buyerTips" class="details-block">
            <div class="details-title">套餐使用</div>
            <div class="details-wrap combo">
                <p class="combo-details">{{details.couponUseDesc}}</p>
                <p class="combo-details">{{details.buyerTips}}</p>
                <div class="flex-center go-details"><p class="">查看图文详情</p></div>
            </div>
        </div>
        <!--</template>-->
        <div class="details-block">
            <div class="details-title">订单信息</div>
            <div class="details-wrap order">
                <p>订单编号：{{order.orderNum}}</p>
                <p>下单时间：{{order.gmtCreate}}</p>
                <p>付款手机：{{order.buyerMobile}}</p>
                <p>商品数量：{{order.buyNumber}}</p>
                <p>订单总价：{{order.orderAmount}}</p>
                <p class="mark">优惠抵扣：{{order.packetPayAmout || '0.00'}}</p>
                <p class="mark">实付金额：{{order.goodsAmount}}</p>
                <p class="mark">养老金：{{order.merchantPension}}</p>
            </div>
        </div>
    </div>
</template>
<style lang="scss" rel="stylesheet/scss">
    .order-details-el{
        background:#fff;
        font-family:"Microsoft Yahei";
        .ticket-block-wrap{
            border-top:18px solid #f2f2f2;
        }
        .details-block{
            border-top:18px solid #f2f2f2;
            .link-li{
                height:62px;
                padding:0 28px;
            }
            .details-wrap{
                padding:0 28px;
                font-size:20px;
            }
            .details-title{
                padding:0 28px;
                border-bottom:1px solid #f2f2f2;
                line-height:62px;
                font-size:26px;
                color:#373737;
            }
            .shop{
                height:130px;
                line-height:1.5;
                color:#838383;
                .shop-name{
                    color:#505050;
                    font-size:26px;
                }
                .iphone{
                    height:70px;
                    border-left:1px solid #f2f2f2;
                    i{font-size:48px;padding-left:10px;color:#e85352;}
                }
            }
            .combo{
                line-height:2;
                .go-details{
                    height:80px;
                    p{
                        width:168px;
                        height:1.5;
                        border-radius:3px;
                        border:1px solid #e2544f;
                        text-align:center;
                        font-family:"sans-serif";
                        font-size:24px;
                        color:#e95254;
                    }
                }
            }
            .order{
                font-family:"sans-serif";
                line-height:2.5;
                .mark{color:#e85352;}
            }
        }
        .refund-btn{
            padding:0 1em;
            border:1px solid #e85352;
            border-radius:0.2em;
            line-height:2;
            font-size:26px;
            color:#e85352;
            &:before{content:"申请退款"}
        }
    }
</style>
<script>
    import goodBlock from './goodBlock'
    import linkList from './../linkList'
    import ticketBlock from './ticketBlock'
    import member from '../../api/member'
    export default{
        data(){
            return {
                title:'商家信息'
                ,btnClass:'refund-btn'
                ,to:{
                    name:'applyRefund',
                    query:{
                        orderNum:'1212111212'
                    }
                }
                ,coupons:[]
                ,details:{
                    couponGmtEnd:"",
                    goodsName:"",
                    couponUseDesc:"",
                    buyerTips:"",
                    merchantName:""
                }
                ,order:{
                    orderNum:"",
                    gmtCreate:"",
                    buyerMobile:"",
                    buyNumber:"",
                    orderAmount:"",
                    packetPayAmout:"",
                    goodsAmount:"",
                    merchantPension:""
                }
                ,good:null
                ,state:null
            }
        }
        ,filters: {
            date(value) {
                return value.slice(0,10)
            }
        }
        ,beforeRouteEnter(to,from,next){
            member.postOrderDetails({orderId:to.query.orderId}).then(data => {
                next(vm => {
                    vm.details = {
                        couponGmtEnd: data.orderDetails[0].couponGmtEnd,
                        goodsName: data.orderDetails[0].goodsName,
                        merchantName:data.merchantName,
                        couponUseDesc: data.orderDetails[0].couponUseDesc,
                        buyerTips: data.orderDetails[0].buyerTips,
                        merchantAddress: data.merchantAddress
                    }
                    //订单信息
                    vm.order = {
                        orderNum:data.orderNum,
                        gmtCreate:data.gmtCreate,
                        buyerMobile:data.buyerMobile,
                        buyNumber:data.orderDetails[0].buyNumber,
                        orderAmount:data.orderAmount,
                        packetPayAmout:data.packetPayAmout,
                        goodsAmount:data.goodsAmount,
                        merchantPension:data.goodsAmount,
                    }
                    vm.coupons = data.coupons
                    vm.state = data.state
                    vm.good = {
                        to:{
                            name:""
                        },
                        goodsTitle: data.orderDetails[0].goodsTitle,
                        salesPrice: data.orderDetails[0].salesPrice,
                        goodsImages: data.orderDetails[0].goodsImages,
                        merchantName: data.merchantName,
                    }
                })
            })
        }
        ,methods:{

        }
        ,components: { goodBlock,linkList,ticketBlock }
    }
</script>
