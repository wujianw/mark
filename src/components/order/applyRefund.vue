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
            <p>现金：<input type="text" name="refCashAmout" readonly v-model="cashAmout" class="gold"></p>
            <p>红包：<input type="text" name="refRedPacket" readonly v-model="refRedPacket" class="gold"></p>
            <input type="hidden" name="refGiveAway" :value="refGiveAway">
        </section>
        <section>
            <h3>现金退还方式</h3>
            <p>原路反还</p>
        </section>
        <section>
            <h3>退款原因</h3>
            <radio v-for="item in refundReason" name="refundReason" :id="'refundReason'+item.rkey" :text="item.rvalue" :value="item.rkey"></radio>
        </section>
        <div class="other-wrap flex-space">
            <input type="text" name="refundRemark" class="other" placeholder="请输入其他意见">
        </div>
        <div class="submit-wrap">
            <submit value="申请退款" :dis="!1"></submit>
        </div>
    </div>
</template>
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
        &:after{content:"元";}
        .gold{
            border:none;
            font-size:26px;
            color:#e85352;
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
                refCashAmout:0,
                refRedPacket:0,
                refGiveAway:0,
                couponIds:[]
            }
        }
        ,computed: {
            ...mapGetters({
                refundReason:"refundReason"
            }),
            cashAmout() {
                return this.refCashAmout*this.num
            },
            redPacket() {
                return this.refRedPacket*this.num
            }
        }
        ,created() {
            if(!this.refundReason || this.refundReason.length == 0){
                this.$store.dispatch("refundReason")
            }
        }
        ,beforeRouteEnter(to,from,next) {
            let orderNum = to.query.orderNum
            member.postCanRefund({orderNum}).then(res => {
                next(vm => {
                    vm.lists = res.list
                    vm.refCashAmout = res.refCashAmout
                    vm.refRedPacket = res.refRedPacket
                    vm.refGiveAway = res.refGiveAway
                })
            })
        }
        ,methods:{
            // 统计check的代金券条数
            option(checked,value) {
                if(checked) {
                    this.num++
                    this.couponIds.push(value)
                }else {
                    this.num--
                }
            }
        }
        ,components:{ radio,submit }
    }
</script>
