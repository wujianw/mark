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
                    <div class="flex-space afterinputnofavourable" @click="dialog" v-show="noFavourable">
                        <span style="padding-left: 12px">不享受优惠的金额为:  &yen;{{noFavourable}}</span>
                        <button style="background: #e85352;border:none;color: #fff ; padding:0 20px;font-size:24px; line-height:74px">修改</button>
                    </div>
                    <div class="favor-wrap">
                        <h4 class="favor">优惠活动</h4>
                        <div class="login" v-if="token">
                            <p>每满{{data.campaginAmount}}立减{{data.discntAmount}}元，最高减免{{data.maxDiscntAmount}}元</p>
                            <p>酒水部分不参与优惠，请输入不享受优惠金额</p>
                        </div>
                        <div class="logout" v-else>
                            <p>您还不是积分宝认证会员，请先 <span class="btn_login" @click="btn_login">注册或登录</span> 后查看是否有优惠</p>
                        </div>
                    </div>
                    <div class="gold-wrap">
                        <div class="flex-space">
                            <span>实付金额</span>
                            <span class="gold">{{realPayValue}}</span>
                        </div>
                        <div class="flex-space">
                            <span>赠养老金</span>
                            <span class="gold">11</span>
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
    import { mapGetters } from 'vuex'
    export default {
        data () {
            return {
                shopName:this.$route.query.shopName,
                merchantId:this.$route.query.merchantId,
                popupShow:false,         // 切换不享受金额输入框
                noFavourable:null,       // 不享受金额----输入框确定以后的值
                noFavourable_edit:null,  // 不享受金额----输入框

                realPayValue:"0.00",
                shouldGetValue:"",
                campaignId:"",//活动ID
                orderAmount:"100",//订单总金额
                paidAmount:"100",//实付总金额
                disconuntAmount:"0",//折扣扣除金额
                noDisAmount:"100",//不参加折扣的金额
                disAmount:"0", //参加折扣的金额

                data:{
                    merchantId:null,
                    campaginAmount:0,//单笔消费金额
                    discntAmount:0,//消费满额后的减免金额
                    maxDiscntAmount:0,// 最高减免金额
                }
            }
        },
        computed: {
            ...mapGetters({
                token:'getToken',
            })
        },
        created() {
            member.scanBill({merchantId:this.$route.query.shopId})
        },
        methods:{
            submitScanBill(){
                let self = this
                member.confirmScanbill({
                    "merchantId":self.merchantId,
                    "campaignId":self.campaignId,
                    "orderAmount":self.orderAmount,
                    "paidAmount":self.paidAmount,
                    "disconuntAmount":self.disconuntAmount,
                    "noDisAmount":self.noDisAmount,
                    "disAmount":self.disAmount
                }).then(val => {
                    val.token=self.token
                    this.$router.push({name:'scanBillPay',query:val})
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

    .afterinputnofavourable{
        line-height: 74px;
        background:#f2f2f2;
        font:24px "Microsoft Yahei";
        color:#e85352;
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
