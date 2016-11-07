<template>
    <div class="ticket-block-el">
        <router-link tag="div" :to="state.to" class="flex-space ticket-wrap">
            <div class="ticket" data-ticket-type="卡券号：" :data-validity="obj.code"></div>
            <div class="consumeName" :class="state.stateClass"></div>
        </router-link>
        <router-link v-if="obj.consume==2 || obj.consume==3" :to="to" class="go-refund-details flex-center">
            <span>查看退款详情</span>
        </router-link>
    </div>
</template>
<style lang="scss" rel="stylesheet/scss">
.ticket-block-el{
    .ticket-wrap{height:88px;padding:0 22px;border-bottom:1px solid #f2f2f2;}
    .ticket{
        font-size:24px;
        color:#373737;
        span{padding-left: 32px;}
        &:before{content:attr(data-ticket-type);}
        &:after{content:attr(data-validity);}
    }
    .consumeName{
        font-size:26px;
    }
    .state-shopping:before{content:"查看二维码";color:#fbc111;}
    .state-shopped:before{content:"已消费";color:#505050;}
    .state-refunding:before{content:"退款中";color:#e58453;}
    .state-refunded:before{content:"已退款";color:#505050;}
    .go-refund-details {
        height:80px;
        border-bottom:1px solid #f2f2f2;
        span {
            padding: 0 1em;
            border: 1px solid #e85352;
            border-radius: 0.2em;
            line-height: 1.8;
            font-size: 24px;
            color: #e85352;
        }
    }
}
</style>
<script>
    export default{
        data() {
            return {
                to:{
                    name:'refundDetail',
                    query:{
                        refundOrderNum:this.obj.refundOrderNum,
                        orderId:this.$route.query.orderId
                    }
                }
            }
        }
        ,computed:{
            /*
            * 根据券码状态处理 按钮文字&颜色，路由
            * 0：待消费，1：已消费，2：退款中，3：退款完成
            * */
            state(){
                let state ={}
                switch(parseInt(this.obj.consume)){
                    case 0:
                        state.stateClass = "state-shopping"
                        state.to = {
                            name:"chitDetails",
                            query:{
                                codeContent:'http://www.jfb315.com'
                            }
                        }
                        break
                    case 1:
                        state.stateClass = "state-shopped"
                        state.to = {
                            query:this.$route.query
                        }
                        break
                    case 2:
                        state.stateClass = "state-refunding"
                        state.to = {
                            query:this.$route.query
                        }
                        break
                    case 3:
                        state.stateClass = "state-refunded"
                        state.to = {
                            query:this.$route.query
                        }
                        break
                }
                return state
            }
        }
        ,props:{
            obj:Object
        }
    }
</script>
