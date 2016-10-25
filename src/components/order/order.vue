<template>
    <div class="order-el">
        <header class="flex-space" :data-status="obj.statusName">
            <div class="title flex-space" :data-shop="obj.shopName">
                <div class="hd-logo"></div>
            </div>
        </header>
        <router-link tag="main" :to="details.to">
            <div class="flex-start">
                <div class="good-pic"><img src="../../../static/img/good-pic.jpg" alt=""></div>
                <div class="good-details">
                    <p>商品名称</p>
                    <p>有效日期</p>
                    <p>数量</p>
                </div>
            </div>
            <p class="total">合计:<span>360.00</span></p>
        </router-link>
        <footer class="flex-space">
            <router-link class="go-next" tag="p" :to="obj.to">{{obj.btnName}}</router-link>
        </footer>
    </div>
</template>
<style lang="scss">
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
     * params {obj:{}}
     */
    export default {
        data() {
            return {}
        }
        ,props:{
            details:{
                type:Object,
                default: function() {
                    return {
                        to:{
                            name:"",
                            type:1
                        }
                    }
                }
            },
            obj:{
                type:Object,
                default: function() {
                    return {
                        status:""
                        ,statusName:"待消费"
                        ,shopName:"积分宝体验店"
                        , to:{
                            name:"",
                            type:1
                        }
                        ,btnName:"消费"
                    }
                }
            }
        }
    }
</script>
