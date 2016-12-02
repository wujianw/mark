<template>
    <div class="apply-refund-el">
        <section>
            <h3 class="flex-space"><span>订单码券</span><span>已选择{{num}}张</span></h3>
            <radio v-for="(item, index) in lists" type="checkbox"
                   name="couponIds"
                   :check="!index"
                   @sum="option"
                   :id="'check_'+index"
                   :text="'卡券号：'+item.code"
                   :value="item.id">
            </radio>
        </section>
        <section>
            <h3>退还内容</h3>
            <p>现金：<span class="gold">{{refCashAmount}}</span></p>
            <p>红包：<span class="gold">{{refRedPacket}}</span></p>
            <input type="hidden" name="refGiveAway" :value="refGiveAway">
        </section>
        <section>
            <h3>现金退还方式</h3>
            <p>原路返还</p>
        </section>
        <section>
            <h3>退款原因</h3>
            <radio v-for="(item, index) in refundReasonTemplate"
                   @sum="reason"
                   name="refundReason"
                   :check="!index"
                   :id="'refundReason'+item.rkey"
                   :text="item.rvalue"
                   :value="item.rkey"></radio>
        </section>
        <div class="other-wrap flex-space">
            <input type="text" name="refundRemark" class="other" v-model="refundRemark" placeholder="请输入其他意见">
        </div>
        <div class="submit-wrap">
            <submit value="申请退款" :dis="disable" @commit="apply"></submit>
        </div>
    </div>
</template>
<script type="text/babel">
    import radio from './../select/radio'
    import submit from './../submit'
    import { mapGetters } from 'vuex'
    import member from "../../api/member"
    export default{
        data(){
            return{
                num:1,
                lists:[],
                cashAmount:0,//应退现金金额（一张）
                redPacket:0,//应退红包（一张）
                giveAway:0,//扣除赠送（一张）
                couponIds:[], // couponIds.join(",")提交
                refundReason:"",
                refundRemark:""
            }
        }
        ,computed: {
            ...mapGetters({
                refundReasonTemplate:"refundReason"
            }),
            refCashAmount() {
                return (this.cashAmount*this.num).toFixed(2) //应退现金金额
            },
            refRedPacket() {
                return (this.redPacket*this.num).toFixed(2) //应退红包
            },
            refGiveAway() {
                return (this.giveAway*this.num).toFixed(2) //扣除赠送
            },
            disable() {
                return this.couponIds.length == 0
            }
        }
        ,created() {
            // 读取退款原因模板
            if(!this.refundReasonTemplate || this.refundReasonTemplate.length == 0){
                this.$store.dispatch("refundReason").then(() => {
                    this.refundReason = this.refundReasonTemplate[0].rkey
                })
            } else {
                this.refundReason = this.refundReasonTemplate[0].rkey
            }
        }
        ,beforeRouteEnter(to,from,next) {
            // 获取可退款代金券列表
            let orderNum = to.query.orderNum
            member.postCanRefund({orderNum}).then(res => {
                if(res.list.length == 0){
                    return next(false)
                }
                next(vm => {
                    vm.lists = res.list
                    vm.cashAmount = res.refCashAmout
                    vm.redPacket = res.refRedPacket
                    vm.giveAway = res.refGiveAway
                    vm.couponIds.push(res.list[0].id) // 默认选中第一张
                })
            })
        }
        ,methods:{
            // 统计条数&保存代金券id
            option(checked,value) {
                if(checked) {
                    this.num++
                    this.couponIds.push(value)
                }else {
                    this.num--
                    this.couponIds = this.couponIds.filter(item => item != value)
                }
            },
            reason(checked,value) {
                if(checked){
                    this.refundReason = value
                }
            },
            //提交退款申请
            apply() {
                let self = this,
                    orderId = self.$route.query.orderId
                let params = {
                    refundReason:self.refundReason,
                    refCashAmount:self.refCashAmount,
                    refRedPacket:self.refRedPacket,
                    refGiveAway:self.refGiveAway,
                    refundRemark:self.refundRemark,
                    couponIds:self.couponIds.join(",")
                }
                member.postApplyRefund(params).then(res => {
                    let refundOrderNum = res.refundOrderNum
                    this.$router.replace({name:"refundDetail",query:{refundOrderNum,orderId}}) // 提交成功后去退款详情画面
                }).catch(() => {

                })
            }
        }
        ,components:{ radio,submit }
    }
</script>
<style lang="scss" rel="stylesheet/scss">
    .apply-refund-el{
        background: #fff;
        section{
            font-size:26px;
            border-bottom:18px solid #f2f2f2;
        }
        h3{
            padding:0 24px;
            border-bottom:1px solid #f2f2f2;
            line-height:64px;
            font-size:26px;
            font-weight:normal;
            color:#7c7c7c;
        }
        p{
            padding:0 24px;
            line-height:58px;
            color:#383838;
            .gold{
                color:#e85352;
                &:after{content:"元";}
            }
        }
        .other-wrap{
            padding:0 10px;
            height:80px;
            background:#fff;
            input{
                width:100%;
                height:64px;
                padding:0 20px;
                border:none;
                border-radius: .5em;
                background:#eee;
                font-size:26px;
            }
        }
        .submit-wrap{
            padding:20px 10px;
        }
    }
</style>
