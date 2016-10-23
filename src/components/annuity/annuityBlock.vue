<template>
    <div>
        <div class="annuity-block-el flex-space">
            <div>
                <div class="shop-name">积分宝体验店</div>
                <div class="condition-gold">10.00</div>
                <div class="condition-date">2016-05-07 10:00</div>
            </div>
            <div>
                <div class="annuity-gold">+1.00</div>
                <div class="integral-rate">5%</div>
            </div>
        </div>
    </div>
</template>
<style lang="scss">
    .annuity-block-el{
        height:128px;
        padding:0 26px 0 14px;
        border-bottom:1px solid #f2f2f2;
        background:#fff;

        .shop-name{
            line-height:58px;
            font-size:26px;
            color:#505050;
        }
        .condition-gold{
            padding-bottom:8px;
            font-size:22px;
            color:#e85453;
            &:before{
                content:"消费：";
                color:#505050;
            }
            &:after{content:"元";}
        }
        .condition-date{
            line-height:2;
            font-size:20px;
            color:#afafaf;
        }
        .annuity-gold{
            padding-top:11px;
            text-align:right;
            line-height:64px;

            font-size:26px;
            color:#e85453;
        }
        .integral-rate{
            margin-bottom:25px;
            padding:.1em .2em;
            border-radius:.2em;
            background:#e85453;
            font-size:20px;
            color:#fff;
            &:before{content:"积分率："}
        }
    }
</style>
<script type="text/babel">
    export default {
        data() {
            return {}
        }
    }
</script>