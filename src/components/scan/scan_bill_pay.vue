<template>
    <div class="scan-bill-pay-el" >
        <div class="pay-details">商家名称<span>{{shopName}}</span></div>
        <div class="pay-details">实付金额<span>&yen;{{orderDetails.paidAmount}}</span></div>
        <div class="pay-details">订单编号<span>{{orderSubmit.outTradeNo}}</span></div>
        <div class="pay-way">
            <h3 class="title">选择付款方式</h3>
            <radio id="wx" name="check" :check="true">
                <div class="way flex-start wx">
                    <img src="../../assets/img/wx.png" alt="">
                    <div class="message">
                        <h4>微信支付</h4>
                        <p>推荐安装微信5.0及以上版本的用户使用</p>
                    </div>
                </div>
            </radio>
            <!--<radio id="alipay" name="check" @sum="setAlipayType">-->
                <!--<div class="way flex-start alipay">-->
                    <!--<img src="../../assets/img/alipay.png" alt="">-->
                    <!--<div class="message">-->
                        <!--<h4>支付宝</h4>-->
                        <!--<p>推荐已安装支付宝客户端的用户使用</p>-->
                    <!--</div>-->
                <!--</div>-->
            <!--</radio>-->
        </div>
        <div class="submit-wrap">
            <submit value="确认支付" :dis="false" @commit="verify"></submit>
        </div>
    </div>
</template>
<script type="text/babel">
    import radio from '../select/radio'
    import submit from '../submit'
    import member from '../../api/member'
    import {domain} from '../../api/public'
    import pay from '../../api/pay'
    import wx from '../../api/wx'
    import {mapGetters} from 'vuex'
    import store from '../../store'
    import MessageBox from '../../msgbox'
    export default {
        data () {
            return {
                shopName:this.$route.query.shopName
            }
        }
        ,computed: {
            ...mapGetters({
                orderDetails:'markScanOrderDetails',
                orderSubmit:'markScanOrderSubmit'
            })
        }
        ,beforeRouteEnter(to,from,next){
            if(!store.getters.markScanOrderSubmit) {
                console.log({token:to.query.token,cashOrderId:to.query.orderId})
                member.scanDetails({token:to.query.token,cashOrderId:to.query.orderId}).then(data => {
                    let notifyUrl=domain+'/wechatpay/wechat_scancodenotify_h5.htm',
                        option = {
                            body:"扫码买单",
                            outTradeNo:data.orderNum,
                            totalFee:data.paidAmount*100,
                            notifyUrl:notifyUrl,
                            openid:window.localStorage.openId
                        },
                        information = {
                            paidAmount:data.paidAmount
                        }
                    store.dispatch('markScanOrder',{option,information}).then(() => {
                        next()
                    })
                })
            }else {
                next()
            }
        }
        ,created() {
//            console.log(this.orderDetails)
        }
        ,methods:{
            verify() {
                let self = this
                pay.placeOrder(self.orderSubmit).then(data => {
                    let option = {
                            "appId":data.appId,     //公众号名称，由商户传入
                            "timeStamp":data.timeStamp,         //时间戳，自1970年以来的秒数
                            "nonceStr" : data.nonceStr, //随机串
                            "package" :data.package,
                            "signType" : "MD5",         //微信签名方式：
                            "paySign" : data.paySign //微信签名
                        },
                        outTradeNo = self.orderSubmit.outTradeNo
                    wx.onBridgeReady.call(self,option,outTradeNo,self.successCb)
                })
            },
            successCb(orderNum) { // 微信成功回调 验证微信是否有返回
                pay.payCb({orderNum,type:'LOCAL'}).then(data => {
                    if(data.trade_state == 'SUCCESS'){
                        MessageBox.alert("支付成功").then(() => {
                            self.$router.replace({name:'success'})
                        })
                    }else{
                        MessageBox.alert(data.trade_state)
                    }
                })
            }
        }
        ,components:{radio, submit}
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
