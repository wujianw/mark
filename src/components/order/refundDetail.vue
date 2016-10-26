<template>
    <div>
        <div class="refundDetail-top" >
            <span class="refundDetail-top-name">退款金额：</span><span class="refundDetail-top-value">158.00元</span>
        </div>
        <div class="refundDetail-top" >
            <span class="refundDetail-top-name">退回账户：</span><span class="refundDetail-top-value">钱包余额</span>
        </div>
        <div class="refundDetail-top" >
            <span class="refundDetail-top-name">到账时间：</span><span class="refundDetail-top-value">已到账</span>
        </div>
        <div class="flex-space refundDetail-title-container" >
            <span class="refundDetail-title">退款流程</span><span class="refundDetail-help">退款帮助</span>
        </div>
        <div class="refundDetail-progress-container">
            <div class="refundDetail-progress-underline" >
                <div>到账处理中</div><div>退款申请处理完成后</div><div>2016-10-21</div>
            </div>
            <div class="refundDetail-progress-underline" >
                <div>退回账户：</div><div>钱包余额</div>
            </div>
            <div class="refundDetail-progress" >
                <div>到账时间：</div><div>已到账</div>
            </div>
        </div>
    </div>



</template>

<script type="text/babel">
</script>

<style scoped>
    .refundDetail-top{
        padding-left: 20px;
        padding-top: 20px;
        padding-bottom: 20px;
        background: #ffffff;
        text-align: left;
        font: 26px "Microsoft Yahei";
        border-bottom: 1px solid #f2f2f2;


    }
    .refundDetail-top-name{
        color: #807f7f;
    }
    .refundDetail-top-value{
        color: #373737;
    }
    .refundDetail-title-container{
        margin-top: 30px;
        padding-left: 20px;
        padding-right: 20px;
        padding-top: 20px;
        padding-bottom: 20px;
        background: #ffffff;
        font: 23px/76px "Microsoft Yahei";
        color: #505050;
        border-bottom: 1px solid #f2f2f2
    }
    .refundDetail-progress-container{
        padding-top: 20px;
        padding-bottom: 20px;
        background: #ffffff;
    }
    .refundDetail-progress{
        padding-top: 20px;
        padding-left: 40px;
        padding-bottom: 20px
    }
    .refundDetail-progress-underline{
        padding-top: 20px;
        padding-left: 40px;
        border-bottom: 1px solid #f2f2f2;
        padding-bottom: 20px
    }
    .refundDetail-help{
        font: 22px "Microsoft Yahei";
        color: #e85352;
    }
    .refundDetail-title{
        font: 26px "Microsoft Yahei";
        color: #373737;
    }
</style>
