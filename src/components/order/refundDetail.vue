<template>
    <div class="refund-detail-el">
        <div class="refund-detail">退款金额<span>{{obj.applyRefAmount}}元</span></div>
        <div class="refund-detail">退回账户<span>{{obj.refundChannelName}}</span></div>
        <div class="refund-detail" v-if="obj.refundStatus != 31">到账时间<span>{{couponDefaultDay}}</span></div>
        <div class="refund-progress">
            <h3 class="flex-space refund-title" >
                <span class="title">退款流程</span>
                <span class="help">退款帮助</span>
            </h3>
            <div class="progress-wrap">
                <template v-if="obj.refundStatus == 11">
                    <div class="progress-status active" >
                        <h4>等待商家审核</h4>
                        <p>正在等待商家审核，审核后将进行打款</p>
                        <p>{{obj.gmtCreated}}</p>
                    </div>
                    <div class="progress-status" >
                        <h4>到账处理</h4>
                        <p>预计将在一个工作日内到账</p>
                    </div>
                </template>
                <template v-if="obj.refundStatus == 30">
                    <div class="progress-status active" >
                        <h4>商家通过审核</h4>
                        <p>商家通过退款申请已将退款申请提交至支付账户</p>
                        <p>{{obj.confirmDate}}</p>
                    </div>
                    <div class="progress-status active" >
                        <h4>已到账</h4>
                        <p>退款金额已原路退回您的支付账户，请查收</p>
                        <p>{{obj.finishDate}}</p>
                    </div>
                </template>
                <template v-if="obj.refundStatus == 31">
                    <template v-if="!obj.reverseDate">
                        <div class="progress-status active" >
                            <h4>商家拒绝退款</h4>
                            <p>商家拒绝您的退款申请，您可以再次发起申请或联系客服 <br>(拒绝理由:{{obj.rejectReason}})</p>
                            <p>{{obj.confirmDate}}</p>
                        </div>
                        <div class="progress-status active" >
                            <h4>退款失败</h4>
                        </div>
                    </template>
                    <template v-else>
                        <div class="progress-status active" >
                            <h4>买家会员撤销退款</h4>
                        </div>
                    </template>
                </template>
            </div>
        </div>
        <div v-if = "this.obj.refundStatus == 11" class="close-refund-btn">
            <submit value="取消退款" @commit="closeRefund" :dis="!1"></submit>
        </div>
    </div>
</template>
<script type="text/babel">
    import member from "../../api/member"
    import submit from "../submit"
    import MessageBox from '../../msgbox';
    export default{
        data() {
            return {
                obj:{
                    applyRefAmount:"",
                    refundChannelName:"",
                    couponDefaultDay:"",
                    gmtCreated:"",
                    refundStatus:null,
                    confirmDate:"",
                    finishDate:"",
                    reverseDate:"",
                    orderNum:"",
                    rejectReason:""
                }
            }
        },
        components: {
            submit
        },
        computed: {
            couponDefaultDay() {
                let str
                if(this.obj.refundStatus == 11){
                    str = "预计"+this.obj.couponDefaultDay+"天内到账"
                } else {
                    str = "已到账"
                }
                return str
            }
        },
        beforeRouteEnter(to,from,next) {
            member.getRefundDetails({refundOrderNum:to.query.refundOrderNum}).then(res => {
                next(vm => {
                    vm.obj = res
                })
            })
        },
        methods: {
            closeRefund() {
                let self = this
                let orderId = self.$route.query.orderId,
                    orderNum = self.obj.orderNum
                MessageBox.confirm("确定取消退款？").then(() => {
                    self.$store.dispatch("refundClose",orderNum).then(() => {
                        this.$router.replace({name:"orderDetails",query:{orderId}})
                    }).catch(() => {
                        MessageBox.alert("取消失败,请重新再试").then(() => {
                            this.$router.replace({name:"orderDetails",query:{orderId}})
                        })
                    })
                }).catch(() => {

                })
            }
        }
    }
</script>
<style lang="scss" rel="stylesheet/scss">
    .refund-detail-el{
        background: #fff;
        .refund-detail{
            padding:20px;
            font: 26px "Microsoft Yahei";
            border-bottom: 1px solid #f2f2f2;
            color: #807f7f;
            span{
                padding-left:50px;
                color: #373737;
            }
        }
        .refund-progress{
            border-top: 18px solid #f2f2f2;
            padding-left:24px;
            .refund-title{
                padding:20px;
                border-bottom: 1px solid #f2f2f2;
                .help{
                    font: 22px "Microsoft Yahei";
                    color: #e85352;
                }
                .title{
                    font: 26px "Microsoft Yahei";
                    color: #373737;
                }
            }
            .progress-wrap{
                padding:30px 0 30px 20px;
                background:#fff;
                background:
                        linear-gradient(90deg,#aeaeae 1px , transparent 0) 0 60px;
                background-size: 50% calc(100% - 200px);
                background-repeat:no-repeat;
                .progress-status{
                    padding:10px 0;
                    min-height:111px;
                    border-bottom:1px solid #f2f2f2;
                    font: 22px/1.72 "sans-serif";
                    color:#afafaf;
                    h4{
                        position:relative;
                        font-weight:normal;
                        /* 标记点 */
                        &:before{
                            content:"";
                            position:absolute;
                            top:50%;
                            left:-14px;
                            width:.5em;
                            height:.5em;
                            transform: translate(-100%,-50%);
                            border-radius: 50%;
                            background:#aeaeae;
                        }
                    }
                }
                .active{
                    color:#e85352;
                    h4:before{background:#e85352;}
                }
            }

        }
        .close-refund-btn{
            position:fixed;
            bottom:0;
            width:750px;
        }
    }
</style>
