<template>
    <div>
        <div class="annuity-block-el flex-space">
            <div>
                <div class="shop-name">{{oName}}</div>
                <div class="condition-gold">{{dealMny}}</div>
                <div class="condition-date">{{dealtime}}</div>
            </div>
            <div>
                <div class="annuity-gold">{{point}}</div>
                <div class="integral-rate">{{ratio}}</div>
            </div>
        </div>
    </div>
</template>
<style lang="scss" rel="stylesheet/scss">
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
        ,props:{
            dealMny:String,
            point:String,
            ratio:String,
            dealtime:String,
            oName:String
        }
    }
</script>
