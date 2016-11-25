<template>
    <div class="recharge-el">
        <div class="recharge-head">
            <div class="input-money flex-start">
                <label>金额</label>
                <input class="recharge-money" v-model="money" type="number"  placeholder="请输入您收到的短信验证码">
            </div>
            <ul class="type-selected" @click="choice">
                <li v-for="item in choiceList" :class="{active:item.active}" :data-gold="item.gold"></li>
            </ul>
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
            <submit value="确认支付" :dis="!money" @commit="verify"></submit>
        </div>
    </div>
</template>
<style lang="scss" rel="stylesheet/scss">
    $placeholderColor:#afafaf;
    .recharge-el{
        .recharge-head{
            border-top: 18px solid #f2f2f2;
            background: #fff;
        }
        .input-money{
            padding:0 38px;
            border-bottom: 1px solid #f2f2f2;
            font-size: 28px;
            color: #505050;
            line-height:42px;
            label{
                padding-right:46px;
                border-right:1px solid #afafaf;
            }
            .recharge-money{
                width:400px;
                height: 80px;
                padding-left:10px;
                border:none;
                font-size: 26px;
                &::-webkit-input-placeholder {color:$placeholderColor;font-size:25px;}
                &:-moz-placeholder {color:$placeholderColor;font-size:25px;}
                &::-moz-placeholder {color:$placeholderColor;font-size:25px;}
                &:-ms-input-placeholder {color:$placeholderColor;font-size:25px;}
            }
        }
        .type-selected{
            padding:18px 0;
            li{
                display:inline-block;
                width:194px;
                margin:10px 25px;
                border:1px solid #e85453;
                border-radius:8px;
                text-align: center;
                line-height:80px;
                font-size:28px;
                color:#e85453;
                &:before{content:attr(data-gold);}
                &:after{content:"元";}
                transition:background .3s;
            }
            li.active{
                background:#e85453;
                color:#fff;
            }
        }
        .recharge-centre{
            margin-top:18px;
            height: 344px;
            background: white;
        }
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
    import pay from '../../api/pay'
    import wx from '../../api/wx'
    import {domain} from '../../api/public'
    import MessageBox from '../../msgbox'
    export default{
        data(){
            return {
                money:0.01,
                choiceList:[
                    {gold:5,active:true},
                    {gold:10,active:false},
                    {gold:20,active:false},
                    {gold:30,active:false},
                    {gold:50,active:false},
                    {gold:100,active:false},
                ]
            }
        }
        ,methods: {
            // 选择默认方式
            choice(e) {
                let target = e.target
                if(target.tagName.toLowerCase() == 'li'){
                    target.className = 'active'
                    this.choiceList.map(item => {
                        item.active = false
                        if(item.gold == target.dataset.gold){
                            this.money = target.dataset.gold
                            item.active = true
                        }
                    })
                }
            },
            verify() {
                let self = this,outTradeNo
                pay.ablePacketRed({amount:this.money}).then(data => {
                    let megTop = "充值金额"+this.money+"元"
                    let megBottom = "同时活动赠送红包"+data+"元"
                    let meg = [megTop,megBottom],
                        title = "充值确认"
                    return MessageBox.confirm(meg,title)
                }).then(()=>{
                    return pay.recharge({tradeAmount:this.money})
                }).then(data=>{
                    let notifyUrl = domain+'/wechatpay/wechat_paynotify_h5.htm',
                        totalFee = (data.tradeAmount*100).toFixed(0)
                    outTradeNo = data.tradeSid
                    return pay.placeOrder({notifyUrl, totalFee, outTradeNo, body:'现金充值', openid:window.localStorage.openId})
                }).then(data => {
                    let option = {
                        "appId":data.appId,     //公众号名称，由商户传入
                        "timeStamp":data.timeStamp,         //时间戳，自1970年以来的秒数
                        "nonceStr" : data.nonceStr, //随机串
                        "package" :data.package,
                        "signType" : "MD5",         //微信签名方式：
                        "paySign" : data.paySign //微信签名
                    }
                    wx.onBridgeReady.call(self,option,outTradeNo,self.successCb) //发起微信支付
                }).catch(() => {})
            },
            successCb(orderNum) { // 微信成功回调 验证微信是否有返回
                pay.payCb({orderNum,type:'LOCAL'}).then(data => {
                    if(data.trade_state == 'SUCCESS'){
                        MessageBox.alert("支付成功").then(() => {
                            self.$router.back()
                        })
                    }else{
                        MessageBox.alert(data.trade_state)
                    }
                }).catch(data => {
                    MessageBox.alert(data.trade_state)
                })
            }
        }
        ,components: {radio, submit}
    }
</script>
