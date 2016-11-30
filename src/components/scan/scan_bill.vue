<template>
    <div>
        <div class="scan-bill-el">
            <div>
                <h3 class="title">{{shopName}}</h3>
                <div class="">
                    <h4 class="message">询问营业员确定消费金额后输入</h4>
                    <div class="gold-input flex-start">
                        <div><input type="number" v-model="shouldGetValue"  placeholder="0.00" ref="shouldGetRef"></div>
                    </div>
                    <div class="btn-dialog flex-start" @click="dialog" v-show="!noFavourable"><i class="icon icon-import"></i>输入不享受优惠金额</div>
                    <div class="flex-space unfavourable" @click="dialog" v-show="noFavourable">
                        <span>不享受优惠的金额为:  &yen;{{noFavourable}}</span>
                        <button>修改</button>
                    </div>
                    <div class="favor-wrap">
                        <h4 class="favor">优惠活动</h4>
                        <div v-if="isCashpayment">
                            <div class="login" v-if="token">
                                <p>每满{{campaign.campaginAmount}}立减{{campaign.discntAmount}}元，最高减免{{campaign.maxDiscntAmount}}元</p>
                                <p>酒水部分不参与优惠，请输入不享受优惠金额</p>
                            </div>
                            <div class="logout" v-else>
                                <p>您还不是积分宝认证会员，请先 <span class="btn_login" @click="btn_login">注册或登录</span> 后查看是否有优惠</p>
                            </div>
                        </div>
                        <div v-else>
                            <p>商家暂无优惠买单活动</p>
                        </div>
                    </div>
                    <div class="gold-wrap">
                        <div class="flex-space">
                            <span>实付金额</span>
                            <span class="gold">{{realPayValue}}</span>
                        </div>
                        <div class="flex-space">
                            <span>赠养老金约</span>
                            <span class="gold">{{annuity}}</span>
                        </div>
                    </div>
                </div>
                <div class="submit-wrap">
                    <p>询问营业员确定消费金额后输入</p>
                    <submit value="确认买单" @commit="submitScanBill" :dis="false"></submit>
                </div>
            </div>
        </div>
        <div class="flex-center popup" v-show="popupShow">
            <div class="popup-btn" >
                <h3>输入不享受优惠金额</h3>
                <div class="input-wrap">
                    <input type="number" placeholder="￥ 0.00" v-model="noFavourable_edit">
                </div>
                <div class="flex-space btn-wrap">
                    <button class="btn-left" @click="cancelClick">取消</button>
                    <button class="btn-right" @click="okClick">确认</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script type="text/babel">
    import submit from '../submit'
    import member from '../../api/member'
    import {domain} from '../../api/public'
    import shop from '../../api/shop'
    import store from '../../store'
    import MessageBox from '../../msgbox'
    import { mapGetters } from 'vuex'
    export default {
        data () {
            return {
                shopName:'积分宝',
                popupShow:false,         // 切换不享受金额输入框
                noFavourable:0,       // 不享受金额----输入框确定以后的值
                noFavourable_edit:0,  // 不享受金额----输入框

//                realPayValue:10000,
                shouldGetValue:0,
                campaignId:"",//活动ID
                orderAmount:"100",//订单总金额
                paidAmount:"100",//实付总金额
                disconuntAmount:"0",//折扣扣除金额
                noDisAmount:"100",//不参加折扣的金额
                disAmount:"0", //参加折扣的金额

                /*
                 * 活动对象数据
                 */
                isCashpayment:0,
                campaign:{
                    merchantId:this.$route.query.shopId,
                    campaginAmount:0,//单笔消费金额
                    discntAmount:0,//消费满额后的减免金额
                    maxDiscntAmount:0,// 最高减免金额
                },
                fraction:0 // 积分率
            }
        },
        computed: {
            ...mapGetters({
                token:'getToken',
                shop:'shopDetails'
            }),
            disconuntAmount() { // 优惠减免金额
                let discntAmount,max = 0,realPayValue = this.shouldGetValue - this.noFavourable
                if(this.isCashpayment && realPayValue > this.campaign.discntAmount){
                    discntAmount = parseInt(realPayValue/this.campaign.campaginAmount)*this.campaign.discntAmount
                    max = Math.min(discntAmount,this.campaign.maxDiscntAmount)
                }
                return max
            },
            realPayValue() { // 实际付款金额
                return (this.shouldGetValue - this.disconuntAmount).toFixed(2)
            },
            annuity() {
                return (this.realPayValue*this.fraction*.5).toFixed(2)
            }
        },
        beforeRouteEnter(to,from,next) {
            let shopId = to.query.shopId
            if(to.query.source == 1){
                store.dispatch('fetchShopDetails',shopId).then(() => {
                    next()
                })
            }else {
                next()
            }
        },
        created() {
            this.shopName = this.shop.info.merchant_name

            if(this.shop.info.campaign.campStatus && this.shop.info.campaign.campStatus == 1){ /* 开通优惠买单&&活动正在进行中 */
                this.isCashpayment = this.shop.info.isCashpayment
                this.campaign = this.shop.info.campaign
            }
            this.fraction = this.shop.info.fraction
        },
        watch: {
            shouldGetValue() {
                this.noFavourable = this.noFavourable_edit = 0
            }
        },
        methods:{
            submitScanBill(){
                let self = this
                if(this.realPayValue == 0){
                    return MessageBox.alert("请输入付款金额")
                }
                let params = {
                    "merchantId":self.campaign.merchantId,
                    "campaignId":self.campaign.id,
                    "orderAmount":self.shouldGetValue,
                    "paidAmount":self.realPayValue,
                    "disconuntAmount":self.disconuntAmount,
                    "noDisAmount":self.noFavourable,
                    "disAmount":(this.shouldGetValue - self.noFavourable).toFixed(2)
                }
                member.confirmScanbill(params).then(val => {
                    let notifyUrl=domain+'/wechatpay/wechat_scancodenotify_h5.htm',
                        option={
                            body:"扫码买单",
                            outTradeNo:val.orderNum,
                            totalFee:val.paidAmount*100,
                            notifyUrl:notifyUrl,
                            openId:window.localStorage.openId
                        },
                        information = {
                            paidAmount:val.paidAmount
                        }
                    self.$store.dispatch('markScanOrder',{option,information}).then(()=>{
                        self.$router.replace({
                            name:'scanBillPay',
                            query:{
                                shopName:self.shopName,
                                orderId:val.id,
                                token:self.token
                            }
                        })
                    })
//                    this.$router.push({name:'scanBillPay',query:params})
                }).catch(res => {
                        console.log("failed")
                })
            }
            /*
            *  弹框显示 输入不享受优惠金额
            * */
            ,dialog(){
                let self = this
                if(!self.shouldGetValue){// 需要修改限制条件
                    self.$refs.shouldGetRef.focus()
                }else{
                    self.popupShow = true
                }
            }
            /*
             *  弹框取消 金额不变
             * */
            ,cancelClick(){
                this.popupShow = false
                this.noFavourable_edit = this.noFavourable
            }
            /*
             *  弹框取消 金额改变
             * */
            ,okClick(){
                this.popupShow = false
                if(this.noFavourable_edit > this.shouldGetValue){
                    this.noFavourable_edit = this.shouldGetValue
                }
                this.noFavourable = this.noFavourable_edit
            }

            /*
            *  未登入按钮 去登入画面
            * */
            ,btn_login(){
                this.$router.push({name:'loadMobile'})
            }
        },
        components:{ submit }
    }
</script>
<style lang="scss" rel="stylesheet/scss">
    $placeholderColor:#e8e8e8;
    /* 弹框 ----样式 */
    .popup{
        position:fixed;
        z-index:5;
        top:0;
        bottom:0;
        width: 750px;
        background: rgba(102,104,109,.8);
        .popup-btn{
            width:72%;
            border-radius:.4em;
            background: #fff;
        }
        h3{
            text-align: center;
            font:34px/94px "Microsoft Yahei";
            color: #373737;
        }
        .input-wrap{
            padding: 0 24px;
            input{
                width:calc(100% - 48px);
                padding:0 24px;
                height: 80px;
                border: 1px solid #d1d1d1;
                border-radius: 8px;
                font-size: 36px;
                &::-webkit-input-placeholder {
                    color:$placeholderColor;
                    font-family:"Microsoft Yahei";
                }
            }
        }
        .btn-wrap{
            padding-top:24px;
            button{
                flex-grow: 1;
                border:none;
                background: #e85352;
                line-height:102px;
                font-size: 43px;
                color: #fff;
            }
            .btn-left{
                border-right: 1px solid #fff;
            }
            .btn-right{
                border-left: 1px solid #fff;

            }
        }
    }
    /* 不享受优惠金额 */
    .unfavourable{
        background:#f2f2f2;
        font:24px/74px "Microsoft Yahei";
        color:#e85352;
        span{padding-left:12px}
        button{
            padding:0 20px;
            border:none;
            background: #e85352;
            line-height:74px;
            font-size:24px;
            color: #fff ;
        }
    }
    .scan-bill-el{
        background: #fff;
        /* 金额输入 */
        .gold-input{
            padding:0 24px;
            height:84px;
            font-size:26px;
            color:#807f7f;
            &:before{content:"消费总额";}
            div{
                padding-left:24px;
                &:before{content:"￥";font-family: "Microsoft Yahei";}
                input{
                    border:none;
                    height:40px;
                    font-size:26px;
                }
            }
        }
        .title{
            text-align: center;
            font:normal 30px/82px 'Microsoft Yahei';
            color:#e85352;
        }
        /* 弹框按钮 */
        .btn-dialog{
            height: 74px;
            background:#f2f2f2;
            font-size:24px;
            color:#e85352;
            i{
                margin:0 10px;
                font-size:30px;
            }
        }
        /* 询问营业员确定消费金额后输入 */
        .message{
            padding-left:24px;
            background:#f2f2f2;
            line-height:68px;
            font-size:22px;
            font-weight:normal;
            color: #807f7f;
        }
        /* 优惠说明 */
        .favor-wrap{
            border-bottom:34px solid #f2f2f2;
            line-height:52px;
            font-size:26px;
            color:#807f7f;
            .favor{
                padding-left:24px;
                border-bottom:1px solid #f2f2f2;
                background:#fff;
                line-height:66px;
                font-size:26px;
            }
            p{
                padding:0 24px;
            }
            .logout p{
                .btn_login{
                    text-decoration: underline;
                    color: #e85352;
                }
            }
            .login p{
                &:first-of-type{
                    font-size:26px;
                    color:#373737;
                }
                &:last-of-type{
                    font-size:24px;
                    color:#afafaf;
                }
            }
        }
        /* 实付&养老金 */
        .gold-wrap{
            color:#807f7f;
            font-size:26px;
            div{padding:0 24px;border-top:1px solid #f2f2f2;line-height:82px;}
            .gold{
                font-size:30px;
                color:#e85352;
                &:before{content:"￥";font-size:26px;font-family: "Microsoft Yahei";}
            }
        }
        /* 提交按钮 */
        .submit-wrap{
            background:#f2f2f2;
            padding:24px;
            p{ padding:16px;text-align: center;font-size:22px;color:#afafaf;}
        }
    }
</style>
