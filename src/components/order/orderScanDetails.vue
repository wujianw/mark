<template>
    <div class="order-details-el">
        <header class="flex-center streamer">
            <i class="icon icon-ok"></i>
            <span>买单成功</span>
        </header>
        <div class="details-block" >
            <link-list :title="title" :to="{name:'shopDetails',query:{shopId:details.shopId}}"></link-list>
            <div class="flex-space details-wrap shop">
                <div class="shop-details">
                    <p class="shop-name">{{details.merchantName}}</p>
                    <p class="shop-address">{{details.merchantAddress}}</p>
                </div>
                <a class="iphone flex-space" :href="'tel:'+details.tel"><i class="icon icon-tel"></i></a>
            </div>
        </div>
        <div class="details-block">
            <div class="details-title">订单信息</div>
            <div class="details-wrap order">
                <p>订单编号：{{order.orderNum}}</p>
                <p>下单时间：{{order.gmtCreate}}</p>
                <p>付款手机：{{order.buyerMobile}}</p>
                <p>消费金额：{{order.orderAmount}}</p>
                <p>实付金额：{{order.paidAmount}}</p>
                <p>优惠方案：消费金额满{{order.campaginAmount}}元减{{order.discntAmount}}</p>
                <p>获养老金：{{order.merchantPension}}</p>
            </div>
        </div>
    </div>
</template>
<style lang="scss" rel="stylesheet/scss">
    .order-details-el{
        background:#fff;
        font-family:"Microsoft Yahei";
        .streamer{
            height:200px;
            font-size:36px;
            i{font-size:40px;color:#e85352;}
            span{padding-left:20px;}
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
        }
        .refund-apply-btn:before{content:"申请退款"}
        .refund-close-btn:before{content:"取消退款"}
    }
</style>
<script>
    import linkList from './../linkList'
    import member from '../../api/member'
    import MessageBox from '../../msgbox';
    export default{
        data(){
            return {
                title:'商家信息'
                ,details:{ // 商家详情
                    shopId:'',
                    tel:"",
                    merchantName:"",
                    merchantAddress:""
                }
                ,order:{ // 订单信息
                    orderNum:"",
                    campaginAmount:'',
                    discntAmount:'',
                    paidAmount:'',
                    gmtCreate:"",
                    buyerMobile:"",
                    orderAmount:"",
                    merchantPension:""
                }
            }
        }
        ,filters: {
            date(value) {
                return value.slice(0,10)
            }
        }
        ,beforeRouteEnter(to,from,next){
            member.postScanOrderDetails({cashOrderId:to.query.orderId}).then(data => {
                console.log(JSON.stringify(data))
                next(vm => {
                    vm.initialize(data)
                })
            })
        }
        ,methods:{
            // 重置数据
            initialize(data) {
                let vm = this
                vm.details = {
                    shopId:data.shop.id,
                    merchantName:data.shop.name,
                    merchantAddress: data.shop.address,
                    tel: data.shop.mobile || data.shop.telephone
                }
                //订单信息
                vm.order = {
                    orderNum:data.orderNum,
                    campaginAmount:data.campaign.campaginAmount,
                    discntAmount:data.campaign.discntAmount,
                    paidAmount:data.paidAmount,
                    orderAmount:data.orderAmount,
                    gmtCreate:data.gmtCreate,
                    buyerMobile:data.buyerMobile,
                    merchantPension:data.goodsAmount,
                }
            }
        }
        ,components: { linkList }
    }
</script>
