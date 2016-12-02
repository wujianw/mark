<template>
    <div class="verify-pay-el">
        <div class="success flex-start">
            <div class="verify-hd-pic">
                <img src="../../assets/img/shop-pic.png" alt="">
            </div>
            <header class="success-hd">
                <p class="verify-money">&yen{{details.buyerAmount}}</p>
                <p class="verify-goods-name">{{option.body+details.buyNumber}}张</p>
            </header>
        </div>
        <div class="pay-way">
            <radio id="wx" name="check" :check="true">
                <div class="way flex-start wx">
                    <img src="../../assets/img/wx.png" alt="">
                    <div class="message">
                        <h4>微信支付</h4>
                        <p>推荐安装微信5.0及以上版本的用户使用</p>
                    </div>
                </div>
            </radio>
        </div>
        <div class="submit-wrap">
            <submit value="确认支付" :dis="false" @commit="verify"></submit>
        </div>
    </div>
</template>
<style lang="scss" rel="stylesheet/scss">
.verify-pay-el{
    .success{height:280px;position:relative;background:#fff;}
    .verify-hd-pic{
        margin-left:195px;
        width:96px;
        height:96px;
        border:1px solid #f2f2f2;
        border-radius:50%;
        img{width:100%;height:100%;border-radius:50%;}
    }
    .success-hd{padding-left:35px;}
    .verify-money{line-height:60px;font-size:40px;color:#e85453;font-family:"Microsoft YaHei";}
    .verify-goods-name{line-height:60px;font-size:28px;color:#afafaf;}
    .success:before {content:"";position: absolute;
        left: 0;bottom: 0; width: 100%;height: 0.25em;
        background:#fff;
        background: -webkit-linear-gradient(45deg, #f2f2f2 45%, #e3e3e3, transparent 55%, transparent 100%),-webkit-linear-gradient(315deg, #f2f2f2 45%, #e3e3e3, transparent 55%, transparent 100%);
        background: linear-gradient(45deg, #f2f2f2 45%, #e3e3e3, transparent 55%, transparent 100%),linear-gradient(315deg, #f2f2f2 45%, #e3e3e3, transparent 55%, transparent 100%);
        background-size: 0.5em 0.5em;
        background-repeat: repeat-x, repeat-x;}

    /*.success-hd h3{font-size:30px;}*/
    .pay-way{
        margin-top:18px;
        background:#fff;
        label{height:138px;}
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
    .submit-wrap{padding:50px 15px;background:#f2f2f2;}
}
</style>
<script type="text/babel">
    import submit from "../submit"
    import radio from '../select/radio'
    import {mapGetters} from 'vuex'
    import wx from '../../api/wx'
    import pay from '../../api/pay'
    import MessageBox from '../../msgbox'
    export default{
        data(){
            return {

            }
        }
        ,computed:{
            ...mapGetters({
                option:'markOrderSubmit',
                details:'markOrderDetails'
            })
        }
        ,methods:{
            verify() {
                let self = this
                pay.placeOrder(self.option).then(data => {
                    let option = {
                        "appId":data.appId,     //公众号名称，由商户传入
                        "timeStamp":data.timeStamp,         //时间戳，自1970年以来的秒数
                        "nonceStr" : data.nonceStr, //随机串
                        "package" :data.package,
                        "signType" : "MD5",         //微信签名方式：
                        "paySign" : data.paySign //微信签名
                    },
                        outTradeNo = this.option.outTradeNo
                    wx.onBridgeReady.call(self,option,outTradeNo,self.successCb)
                })
            },
            successCb(orderNum) { // 微信成功回调 验证微信是否有返回
                pay.payCb({orderNum,type:'LOCAL'}).then(data => {
                    if(data.trade_state == 'SUCCESS'){
                        MessageBox.alert("支付成功").then(() => {
                            this.$router.replace({name:'success',query:{goodsName:this.option.body}})
                        })
                    }else{
                        MessageBox.alert(data.trade_state)
                    }
                }).catch(() => {})
            }
        }
        ,components: {submit, radio}
    }
</script>
