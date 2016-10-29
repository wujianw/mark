<template>

    <div class="scan-bill-el">
        <h3 class="title">积分宝体验店</h3>
        <div class="">
            <h4 class="message">询问营业员确定消费金额后输入</h4>
            <div class="gold-input flex-start">
                <div><input type="text" v-model="shouldGetValue" placeholder="0.00"></div>
            </div>
            <div class="btn-dialog flex-start">输入不享受优惠金额</div>

            <div class="favor-wrap">
                <h4 class="favor">优惠活动</h4>
                <p>每满100立减5元，最高减免50元</p>
                <p>酒水部分不参与优惠，请输入不享受优惠金额</p>
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
            <submit value="确认买单" @commit="" :dis="true"></submit>
        </div>
    </div>
</template>
<script type="text/babel">
    import submit from '../submit'
    export default {
        data () {
            return {
                realPay:"实付金额：",
                shouldGet:"将获养老金：",
                realPayValue:"0.00",
                shouldGetValue:"",
                total:"消费总额",
                second:"￥"
            }
        }
        ,components:{
            submit
        }

    }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
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
            &:before{
                content:"+";
                margin:0 10px;
                width:30px;
                border-radius: 50%;
                background:#e85352;
                line-height: 30px;
                text-align:center;
                color:#fff;
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
            .favor{padding-left:24px;border-bottom:1px solid #f2f2f2;line-height:66px;background:#fff;font-size:26px;color:#807f7f;}
            p{padding:0 24px;}
            p:first-of-type{padding-top:20px;font-size:26px;color:#373737;}
            p:last-of-type{font-size:24px;color:#afafaf;}
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
