<template>
    <div class="ticket-block-el">
        <router-link tag="div" :to="to" class="flex-space ticket-wrap">
            <div class="ticket" :data-ticket-type="ticketType" :data-validity="validity"><slot></slot></div>
            <div v-if="btnClass" :class="btnClass"></div>
        </router-link>
        <div class="go-refund-details flex-center">
            <span>查看退款详情</span>
        </div>
    </div>
</template>
<style lang="scss">
.ticket-block-el{
    .ticket-wrap{height:88px;padding:0 22px;border-bottom:1px solid #f2f2f2;}
    .ticket{
        font-size:24px;
        color:#373737;
        span{padding-left: 32px;}
        &:before{content:attr(data-ticket-type);}
        &:after{content:attr(data-validity);}
    }
    .refund-btn{
        padding:0 1em;
        border:1px solid #e85352;
        border-radius:0.2em;
        line-height:2;
        font-size:26px;
        color:#e85352;
        &:before{content:"申请退款"}
    }
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
        data(){
            return{

            }
        }
        ,components:{

        }
        ,props:{
            btnClass:String,
            ticketType:String,
            validity:String,
            to:{
                type:Object,
                default() {
                    return {

                    }
                }
            }
        }
    }
</script>
