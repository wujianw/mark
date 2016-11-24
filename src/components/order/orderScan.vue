<template>
    <div class="order-el">
        <header class="flex-space" :data-status="state.name">
            <div class="title flex-space" :data-shop="orderDetails.merchantName">
                <i class="icon icon-scan-pay"></i>
            </div>
        </header>
        <router-link tag="main" :to="to">
            <div class="flex-start">
                <div class="good-pic"><img :src="imgUrl" alt=""></div>
                <div class="good-details">
                    <p>订单编号{{orderDetails.orderNum}}</p>
                    <p>消费金额{{orderDetails.orderAmount}}</p>
                </div>
            </div>
            <p class="total">实付金额：<span>{{orderDetails.paidAmount}}</span></p>
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
                padding:0 22px;
                &:after{
                     content:attr(data-shop);
                    padding:0 22px;
                     font-size:26px;
                     color:#505050;
                 }
                i{font-size:50px;color:#e85453;}
            }
            &:after{content:attr(data-status);padding:0 22px;font-size:28px;color:#fcb111;}
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
    import shopPic from "../../assets/img/default-shop.jpg"
    export default {
        data() {
            return {
                to: {
                    name:'orderScanDetails',
                    query:{
                        orderId:this.obj.id
                    }
                },
                imgUrl: shopPic
            }
        }
        ,computed:{
            state() {
                return this.show(this.obj.state)
            },
            orderDetails(){
                return {
                    orderAmount:this.obj.orderAmount
                    ,orderNum:this.obj.orderNum
                    ,paidAmount:this.obj.paidAmount
                    ,merchantName:this.obj.shop.name
                }
            }
        }
        ,methods:{
            show(state){
                let obj = {
                    name:"",
                    btn:"",
                    to:{
                        name:""
                    }
                }
                switch(state.toLocaleLowerCase()){
                    case "created" :
                        obj.name = "待支付"
                        obj.btn = "付款"
                        obj.to = {
                            name:""
                        }
                        break
                    case "finished" :
                        obj.name =  "已完成"
                        obj.btn =  "查看详情"
                        obj.to = {
                            name:'orderScanDetails',
                            query:{
                                orderId:this.obj.id
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

