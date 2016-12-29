<template>
    <div class="create-order-el">
        <good-item class="goods" :obj="goods" :show="!1" :isRoute="!0"></good-item>
        <div class="num flex-space">
            <div>数量</div>
            <div class="flex-space">
                <button @click="operationNum(-1)">-</button>
                <span v-text="num" @click="keyboard"></span>
                <button @click="operationNum(1)">+</button>
            </div>
        </div>
        <link-list title="可用红包" :arrow="!1" :details="ableRed+'元'"></link-list>
        <link-list :to="toUseCoupon" title="优惠券" :arrow="!1" :details="discntAmount+'元'"></link-list>
        <link-list id="marketPrice" title="订单总金额" :arrow="!1" :details="salesPrice+'元'"></link-list>
        <link-list class="buy-pension" title="将获得养老金" :arrow="!1" :details="buyPension+'元'"></link-list>
        <div class="remark">
            <input type="text" v-model="buyerRemark" placeholder="选填，可填写您的其他要求给商家">
        </div>
        <number-key v-show="numKey" @isComputed="isComputed" @simulate="simulate"></number-key>
        <footer class="footer">
            <div class="flex-space buy-btn">
                <div class="mount">{{buyerAmount}}</div>
                <a @click="submit">提交订单</a>
            </div>
        </footer>
    </div>
</template>
<style lang="scss" rel="stylesheet/scss">
    .create-order-el{
        background:#fff;
        border-top:18px solid #f2f2f2;
        .goods{
            height:248px;
            .good-pic{
                width:200px;
                height:200px;
            }
            .gold span{
                text-decoration:line-through;
            }
        }
        .num{
            height:75px;
            padding:0 20px;
            font-size:26px;
            color:#373737;
            span{
                padding:0 24px;
                font-size:26px;
                color:#373737;

            }
            button{
                width:35px;
                height:35px;
                background:#f2f2f2;
                border:none;
                border-radius:4px;
                font-size:26px;
                color:#373737;
            }
        }
        .buy-pension{
            border-top:18px solid #f2f2f2;
        }
        .remark{
            padding:15px 20px;
            border-bottom:110px solid #f2f2f2;
            line-height:45px;
            font-size:26px;
            color:#373737;
            &:before{content:"备注";}
            input{
                width:400px;
                padding-left:12px;
                border:none;
                font-size:26px;
                line-height:45px;
            }
        }
        .footer{position:fixed;bottom:0;width:750px;background:#f2f2f2;z-index:2;}
        .buy-btn{background:#fff;height:110px;padding:0 20px;}
        .buy-btn a{
            display:inline-block;
            width:200px;
            background:#e85350;
            border-radius: .2em;
            text-align:center;
            line-height:80px;
            font-size:32px;
            color:#fff;}
        i.icon-iphone{font-size:38px;}
        .mount{
            font-size:36px;
            color:#e85453;
            &:before{content:"待支付  ";font-size:28px;color:#505050;}
            &:after{content:"  元";font-size:28px;color:#505050;}
        }
    }
    #marketPrice .link-details{color:#e85453;}
</style>
<script type="text/babel">
    /*
     * 创建订单
     * @params
     */
    import goodItem from "./goodItem"
    import linkList from "../linkList"
    import numberKey from "../numberKey"
    import shop from "../../api/shop"
    import pay from "../../api/pay"
    import {domain} from '../../api/public'
    import { mapGetters,Store } from 'vuex'
    import MessageBox from '../../msgbox'
    export default{
        data(){
            return{
                num:1,
                numKey:false,
                ableRed:0,
                sendPacketRed:0,
                buyerRemark:'',// 买家备注
                discntAmount:0,// 使用优惠券金额
                benefitId:''
            }
        },
        computed:{
            ...mapGetters({
                goods:'goodDetails',
                activeNum:'activeNum',
                markCoupon:'getMarkCoupon'
            }),
            salesPrice() {// 订单总金额金额
                return (this.num*this.goods.salesPrice).toFixed(2)
            },
            buyPension() {// 将活动养老金
                return (this.num*this.goods.buyPension).toFixed(2)
            },
            buyerAmount() {// 实付总金额
                return (this.salesPrice - this.ableRed - this.discntAmount).toFixed(2)
            },
            toUseCoupon() {// 修改优惠券
                return {
                    name:'useCoupon',
                    query:{shopId:this.goods.merchantId,gold:this.salesPrice}
                }
            }
        },
        watch: {
            num(newVal) {
                this.$store.dispatch("toggleCreateActiveNum",newVal)
            }
        },
        beforeRouteEnter(to,from,next) {
            if(typeof window.localStorage.token == 'undefined' || window.localStorage.token.length < 6) {
                MessageBox.confirm("请登入后购买").then(() => {
                    next({name:'loadMobile'})
                }).catch(() => {
                    next(false)
                })
            }else {
                next()
            }
        },
        created() {
            this.num = this.activeNum
            this.upData()
        },
        methods:{
            /*
            * 键盘绑定事件
            * */
            keyboard() {// 键盘开关
                this.numKey = !this.numKey
                if(!this.numKey){
                    this.upData()
                }
            },
            isComputed() {// 完成按钮
                this.numKey = false
                this.upData()
            },
            simulate(text) { // 键盘按钮 触发目标值
                let num = this.num.toString()
                if(Number(text) >= 0) {
                    this.num = Number(num+text)
                }else if(text.toLowerCase() == 'x'){
                    this.num = Number(num.substring(0,num.length-1))
                }else {
                    this.num = 1
                }
            },
            /*
            * 加减按钮
            * */
            operationNum(a) {
                if(this.num+a < 1) return false
                this.num+= a
                this.upData()
            },
            /*
            * 获取可支配优惠和养老金
            * 这里需要再获取可用优惠券id
            * */
            upData() {// 获取养老金和获得红包数据
                shop.useAblePacketRed({goodsId:this.goods.id,number:this.num})
                    .then(data => {
                        this.ableRed = data || 0
                    }).then(() => {
                    return shop.sendPacketRed({goodsId:this.goods.id,number:this.num})
                        .then(data => {
                            this.sendPacketRed = data
                        })
                }).then(() => {
                    if(this.markCoupon.changeUse){ // 修改了可使用优惠券
                        this.benefitId = this.markCoupon.id
                        this.discntAmount = this.markCoupon.discntAmount
                        let option = {
                            id:this.markCoupon.id,
                            discntAmount:this.markCoupon.discntAmount,
                            changeUse:false
                        }
                        this.$store.dispatch("insetMarkCoupon",option)
                    }else { // 使用默认优惠券
                        let campaginAmount = (parseFloat(this.salesPrice) - parseFloat(this.ableRed)).toFixed(2)
                        return shop.benefitMemberBest({shopId:this.goods.merchantId,campaginAmount})
                            .then(data => {
                                if(data){
                                    this.benefitId = data.id
                                    this.discntAmount = data.discntAmount
                                }else {
                                    this.benefitId = ""
                                    this.discntAmount = 0
                                }
                            })
                    }
                }).catch(() => {
                    this.$router.push({name:'loadMobile'})
                })
            },
            /*
            * 提交订单 生成订单号，存入store 参数需要验证
            * */
            submit() {
                if(this.num == 0){
                    return MessageBox.alert("数量不能为0")
                }
                let createOption = { // 创建订单所需参数
                        goodsId:this.goods.id,
                        number:this.num,
                        buyerRemark:this.buyerRemark,
                        totalPrice:this.salesPrice,
                        packetPayAmout:this.sendPacketRed,
                        benefitId:this.benefitId
                    },
                    self = this
                pay.createOrder(createOption).then(data => {
                    let notifyUrl = domain+'/wechatpay/wechat_paynotify_h5.htm',
                        option = { // 请求微信参数用
                            body:self.goods.goodsName,
                            outTradeNo:data.orderNum,
                            totalFee:(data.buyerAmount*100).toFixed(0),
                            notifyUrl:notifyUrl,
                            openid:window.localStorage.openId
                        },
                        information = { // 下个页面重要参数
                            buyerAmount:data.buyerAmount,
                            buyNumber:self.num
                        }
                    return self.$store.dispatch('markOrder',{option,information}).then(() => { // vuex 存储
                        self.$router.replace({name:'verifyPay',query:{orderNum:data.orderNum}})
                    })
                }).catch(() => {
                    this.$router.push({name:'loadMobile'})
                })
            }
        },
        components:{ goodItem,linkList,numberKey }
    }
</script>
