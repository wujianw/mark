<template>
    <div class="order-el">
        <header class="flex-space" :data-status="state.name">
            <div class="title flex-space" :data-shop="obj.merchantName">
                <div class="hd-logo"></div>
            </div>
        </header>
        <router-link tag="main" :to="to">
            <div class="flex-start">
                <div class="good-pic"><img :src="orderDetails.goodsImages" alt=""></div>
                <div class="good-details">
                    <p>{{orderDetails.goodsName}}</p>
                    <p class="date">{{orderDetails.couponGmtEnd}}</p>
                    <p>&#215;{{orderDetails.buyNumber}}</p>
                </div>
            </div>
            <p class="total">合计:<span>{{obj.orderAmount}}</span></p>
        </router-link>
        <footer class="flex-space">
            <router-link class="go-next" tag="p" :to="state.to">{{state.btn}}</router-link>
        </footer>
    </div>
</template>
<style lang="scss" rel="stylesheet/scss">
    .order-el{
        background:#fff;
        border-top:18px solid #f2f2f2;
        font-family:"Microsoft Yahei";
        header{
            height:64px;
            color:#505050;
            .title{
                &:after{
                     content:attr(data-shop);
                     font-size:26px;
                     color:#505050;
                 }
                .hd-logo{
                    width:50px;
                    height:50px;
                    margin:0 12px;
                    border-radius:50%;
                    background:#ee4e51;
                    text-align:center;
                    line-height:50px;
                    font-size:24px;
                    font-weight:700;
                    font-family:'Microsoft Yahei';
                    color:#fff;
                    &:after{content:"券";}
                }
            }
            &:after{content:attr(data-status);padding-right:22px;font-size:28px;color:#fcb111;}
        }
        main{
            position:relative;
            border:1px solid #f2f2f2;
            color:#505050;
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
                padding:4px;
                font-family: sans-serif;
                line-height:44px;
                font-size:26px;
                .date:before{content:"有效期至";}
            }
            .total{
                position:absolute;
                right:22px;
                bottom:22px;
                font-size:28px;

                span{
                    font-size:30px;
                    color:#e85352;
                    &:before{content:"￥"}
                }
            }
        }
        footer{
            height:85px;
            padding:0 22px;
            &:before{content:"";}
            .go-next{
                width:138px;
                height:52px;
                border:1px solid #e85352;
                border-radius:5px;
                text-align:center;
                font-size:26px;
                line-height:52px;
                cursor:pointer;
                color:#e85352;
            }
        }
    }
</style>
<script type="text/babel">
    /*
     * @params {obj:{}}
     */
    export default {
        data() {
            return {
                to:{
                    name:'orderDetails',
                    query:{
                        orderId:this.obj.id
                    }
                },
                orderDetails:{
                    goodsName:this.obj.orderDetails[0].goodsName
                    ,goodsId:this.obj.orderDetails[0].goodsId
                    ,activityEndTime:this.obj.orderDetails[0].activityEndTime
                    ,buyNumber:this.obj.orderDetails[0].buyNumber
                    ,goodsImages:this.obj.orderDetails[0].goodsImages
                    ,couponGmtEnd:this.obj.orderDetails[0].couponGmtEnd
                }
            }
        }
        ,computed:{
            state() {
                return this.show(this.obj.state,this.obj.comment)
            }
        }
        ,methods:{
            show(state,comment){
                let obj = {
                    name:"",
                    btn:"",
                    to:{
                        name:""
                    }
                }
                switch(state){
                    case "created" :
                        obj.name = "待支付"
                        obj.btn = "付款"
                        obj.to = {
                            name:""
                        }
                        break
                    case "deliveryed" :
                        obj.name =  "待消费"
                        obj.btn =  "查看券码"
                        obj.to = {
                            name:'orderDetails',
                            query:{
                                orderId:this.obj.id
                            }
                        }
                        break
                    case "refunding" :
                        obj.name =  "退款中"
                        obj.btn =  "查看详情"
                        obj.to = {
                            name:'orderDetails',
                            query:{
                                orderId:this.obj.id
                            }
                        }
                        break
                    case "finished" :
                        if(comment){
                            obj.name =  "已完成"
                            obj.btn =  "查看详情"
                            obj.to = {
                                name:'orderDetails',
                                query:{
                                    orderId:this.obj.id
                                }
                            }
                        }else {
                            obj.name =  "待评价"
                            obj.btn =  "评价"
                            obj.to = {
                                name:"goEvaluate",
                                query:{
                                    orderNo:this.obj.orderNum,
                                    goodsId:this.orderDetails.goodsId
                                }
                            }
                        }
                        break
                }
                return obj
            }
        }
        ,props:{
            obj:Object
        }
    }
</script>

