<template>
    <div class="order-details-el">
        <good-block></good-block>
        <div class="ticket-block-wrap">
            <ticket-block :to="to" ticketType="代金券" validity="2323" :btnClass="btnClass"><span>有效期至：</span></ticket-block>
            <ticket-block ticketType="代金券" validity="2323" :btnClass="btnClass"></ticket-block>
            <ticket-block ticketType="代金券" validity="2323" :btnClass="btnClass"></ticket-block>
        </div>
        <div class="details-block">
            <link-list :title="title"></link-list>
            <div class="flex-space details-wrap shop">
                <div class="shop-details">
                    <p class="shop-name">杭州积分宝体验点</p>
                    <p class="shop-address">商家地址</p>
                    <p><i class="icon icon-orders"></i>定位。。。。</p>
                </div>
                <div class="iphone flex-space"><i class="icon icon-orders"></i></div>
            </div>
        </div>
        <div class="details-block">
            <div class="details-title">套餐使用</div>
            <div class="details-wrap combo">
                <p class="combo-details">杭州积分宝体验点</p>
                <p class="combo-details">杭州积分宝体验点</p>
                <div class="flex-center go-details"><p class="">查看图文详情</p></div>
            </div>
        </div>
        <div class="details-block">
            <div class="details-title">订单信息</div>
            <div class="details-wrap order">
                <p class="order-details">杭州积分宝体验点</p>
                <p class="order-details">杭州积分宝体验点</p>
                <p class="order-details">杭州积分宝体验点</p>
                <p class="order-details">杭州积分宝体验点</p>
                <p class="order-details">杭州积分宝体验点</p>
                <p class="order-details">杭州积分宝体验点</p>
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
            }
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
                title:'商家信息',
                btnClass:'refund-btn',
                to:{
                    name:'applyRefund',
                    query:{
                        orderNum:'1212111212'
                    }
                },
                information:null
            }
        }
        ,computed:{
//            good() {
//                console.log(this.information.merchantName)
//                return{
//                    merchantName:this.information.merchantName,
//                    goodsName:this.information.goodsName,
//                    buyerAmount:this.information.buyerAmount,
//                    to:{
//                        name:""
//                    }
//                }
//            }
        }
        ,beforeRouteEnter(to,from,next){
            console.log(to.query.orderId)
            member.postOrderDetails({orderId:to.query.orderId}).then(data => {
                next(vm => {
                    vm.information = data
                })
            })
        }
        ,components: { goodBlock,linkList,ticketBlock }
    }
</script>
