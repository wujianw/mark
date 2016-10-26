<template>

    <div>
        <div class="container" >
        <div class="pay-details">商家名称<span>{{shopName}}</span></div>
        <div class="pay-details">实付金额<span>￥{{realPay}}</span></div>
        <div class="pay-details">订单编号<span>{{orderNum}}</span></div>
        <div class="pay-way">
            <h3 class="title">选择付款方式</h3>
            <radio id="wx" name="check" :check="true">
                <div class="way flex-start wx">
                    <img src="" alt="">
                    <div class="message">
                        <h4>微信支付</h4>
                        <p>推荐安装微信5.0及以上版本的用户使用</p>
                    </div>
                </div>
            </radio>
            <radio id="alipay" name="check">
                <div class="way flex-start alipay">
                    <img src="" alt="">
                    <div class="message">
                        <h4>支付宝</h4>
                        <p>推荐已安装支付宝客户端的用户使用</p>
                    </div>
                </div>
            </radio>
        </div>
        <div class="submit-wrap">
            <submit value="确认支付" :dis="false" @commit="success"></submit>
        </div>
    </div>
</template>
<script type="text/babel">
    import radio from '../select/radio'
    import submit from '../submit'
    export default {
        data () {
            return {
                shopName:"商家名称",
                realPay:"实付金额",
                orderNum:"121212"
            }
        }
        ,components:{
            radio,
            submit
        }
        ,methods:{
            success() {
                this.$router.push({name:'success'})
            }
        }
    }
</script>
<style lang="scss">
    .container{
        background:#fff;
        .pay-details{
            padding:0 38px;
            font:28px "Microsoft Yahei";
            border-bottom: 1px solid #f2f2f2;
            line-height:80px;
            color: #505050;
            span{
                padding-left:50px;
                color: #afafaf;
            }
        }
        .pay-way{
            border-top:18px solid #f2f2f2;
            label{height:138px;}
            .title{
                padding:0 38px;
                border-bottom:1px solid #f2f2f2;
                line-height: 66px;
                color:#807f7f;
            }
            h3{font-weight:normal;font-size:24px;}
            .way{
                height:138px;
                img{width:70px;height:70px;}
                .message{
                    padding-left:40px;
                    line-height:40px;
                    font-size:30px;
                    color:#505050;
                    p{font-size:22px;color:#afafaf;}
                }
            }
        }
        .submit-wrap{padding:40px 15px;background:#f2f2f2;}
    }
</style>
