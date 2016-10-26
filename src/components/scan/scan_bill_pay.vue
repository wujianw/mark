<template>

    <div style="background-color: #f2f2f2">
        <div class="container" >
            <div class="item">
                <span class="left">商家名称</span><span class="right">积分宝体验店</span>
            </div>
            <div class="item">
                <span class="left">实付金额</span><span class="right">￥0.01</span>
            </div>
            <div class="item">
                <span class="left">订单编号</span><span class="right">2016</span>
            </div>
            </div>
        <div class="title"> <div style="border-bottom:1px solid #f2f2f2; padding-left: 38px">选择付款方式</div>
            <div class="flex-space pay_item" style="border-bottom:1px solid #f2f2f2">
                <img style="width: 60px; height: 60px" src=""/>
                <div class="pay_subitem">
                    <div style="line-height:50px; font-size:30px;color:#505050">微信支付</div>
                    <div style="line-height:40px; font-size:22px;color:#afafaf">推荐安装微信5.0及以上版本的用户使用</div>
                </div>
                <input type="radio" name="ss">
            </div>
            <div class="flex-space pay_item">
                <img  style="width: 60px;height: 60px" src=""/>
                <div  class="pay_subitem">
                    <div style="line-height:50px; font-size:30px;color:#505050">支付宝支付</div>
                    <div style="line-height:40px; font-size:22px;color:#afafaf">推荐已安装支付宝客户端的用户使用</div>
                </div>
                <input type="radio" name="ss">
            </div>
        </div>

        <div class="submit" @click="">
            <span>确认支付</span>
        </div>
    </div>
</template>
<script type="text/babel">
    export default {
        data () {
            return {
                shopname:"商家名称",
                realpay:"实付金额",
                ordernum:"订单编号"
            }
        }
        ,props:{

        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
    .load-wrap{
        background: #fff;
        text-align: center;
    }
    .scan_bill_header{
        font: 28px/76px "Microsoft Yahei";
        color: #505050;
    }
    .title{
        font-size: 26px;
        line-height: 66px;
        color: #807f7f;
        background:#fff;
        border-radius:5px;
    }
    .pay_item{
        line-height: 138px;
        padding-left: 38px;
    }
    .pay_subitem{
        line-height: 138px;
        margin-left: 42px;
        flex-grow: 3
    }
    .container{
        font-size: 25px;
        color: #66667D;
        margin-top: 18px;
        margin-bottom: 18px;
        background-color: #fff;
        .item{
            border-bottom:1px solid #f2f2f2;
            .left{
                margin-left: 38px;
                font-size: 28px;
                color: #505050;
                line-height: 80px;
                margin-right: 50px;
             }
            .right{
                font-size: 28px;
        color: #f2f2f2;
        line-height: 80px;
            }
        }
    }
    .submit {
        margin: 58px  25px;
        text-align: center;
        background: #e85352;
        border-radius: 10px;
        line-height: 80px;
        font-size: 30px;
        color: #fff;
    }

    .load-active{ border-bottom: 5px solid #e85350; }
    .load-active span{ color: #e85352; }
</style>
