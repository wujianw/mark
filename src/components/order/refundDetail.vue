<template>
    <div class="refund-detail-el">
        <div class="refund-detail">退款金额<span>158.00元</span></div>
        <div class="refund-detail">退回账户<span>钱包余额</span></div>
        <div class="refund-detail">到账时间<span>已到账</span></div>
        <div class="refund-progress">
            <h3 class="flex-space refund-title" >
                <span class="title">退款流程</span>
                <span class="help">退款帮助</span>
            </h3>
            <div class="progress-wrap">
                <div class="progress-status active" >
                    <h4>到账处理中</h4>
                    <p>退款申请处理完成后</p>
                    <p>2016-10-21</p>
                </div>
                <div class="progress-status" >
                    <h4>商家审核通过</h4>
                    <p>退款申请处理完成后</p>
                    <p>2016-10-21</p>
                </div>
                <div class="progress-status" >
                    <h4>商家审核中</h4>
                    <p>退款申请处理完成后</p>
                    <p>2016-10-21</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script type="text/babel">

</script>
<style lang="scss">
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
    }
</style>
