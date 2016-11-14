<template>
    <div class="scan-bill-pay-el" >
        <div class="pay-details">商家名称<span>{{shopName}}</span></div>
        <div class="pay-details">实付金额<span>&yen;{{realPay}}</span></div>
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
    function onBridgeReady(){
        WeixinJSBridge.invoke(
            'getBrandWCPayRequest', {
                "appId" : "wx2421b1c4370ec43b",     //公众号名称，由商户传入
                "timeStamp":" 1395712654",         //时间戳，自1970年以来的秒数
                "nonceStr" : "e61463f8efa94090b1f366cccfbbb444", //随机串
                "package" : "prepay_id=u802345jgfjsdfgsdg888",
                "signType" : "MD5",         //微信签名方式：
                "paySign" : "70EA570631E4BB79628FBCA90534C63FF7FADD89" //微信签名
            },
            function(res){
                if(res.err_msg == "get_brand_wcpay_request：ok" ) {}     // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
            }
        );
    }
    if (typeof WeixinJSBridge == "undefined"){
        if( document.addEventListener ){
            document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
        }else if (document.attachEvent){
            document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
            document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
        }
    }else{
        onBridgeReady();
    }
</script>
<style lang="scss" rel="stylesheet/scss">
    .scan-bill-pay-el{
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
