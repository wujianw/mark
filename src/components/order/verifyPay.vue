<template>
    <div class="verify-pay-el">
        <div class="success flex-start">
            <div class="verify-hd-pic">
                <img src="../../../static/img/hd-pic.png" alt="">
            </div>
            <header class="success-hd">
                <p class="verify-money">&yen125.00</p>
                <p class="verify-goods-name">咖啡代金券一张</p>
            </header>
        </div>
        <div class="pay-way">
            <radio id="wx" name="check" :check="true">
                <div class="way flex-start wx">
                    <img src="" alt="">
                    <div class="message">
                        <h4>微信支付</h4>
                        <p>推荐安装微信5.0及以上版本的用户使用</p>
                    </div>
                </div>
            </radio>
        </div>
        <div class="submit-wrap">
            <submit value="确认支付" :dis="false" @commit="success"></submit>
        </div>
    </div>
</template>
<style lang="scss">
.verify-pay-el{

    .success{height:280px;position:relative;background:#fff;}
    .verify-hd-pic{
        margin-left:195px;
        width:96px;
        height:96px;
        border:1px solid #f2f2f2;
        border-radius:50%;
        img{width:100%;height:100%;border-radius:50%;}
    }
    .success-hd{padding-left:35px;}
    .verify-money{line-height:60px;font-size:40px;color:#e85453;font-family:"Microsoft YaHei";}
    .verify-goods-name{line-height:60px;font-size:28px;color:#afafaf;}
    .success:before {content:"";position: absolute;
        left: 0;bottom: 0; width: 100%;height: 0.25em;
        background:#fff;
        background: -webkit-linear-gradient(45deg, #f2f2f2 45%, #e3e3e3, transparent 55%, transparent 100%),-webkit-linear-gradient(315deg, #f2f2f2 45%, #e3e3e3, transparent 55%, transparent 100%);
        background: linear-gradient(45deg, #f2f2f2 45%, #e3e3e3, transparent 55%, transparent 100%),linear-gradient(315deg, #f2f2f2 45%, #e3e3e3, transparent 55%, transparent 100%);
        background-size: 0.5em 0.5em;
        background-repeat: repeat-x, repeat-x;}

    /*.success-hd h3{font-size:30px;}*/
    .pay-way{
        margin-top:18px;
        background:#fff;
        label{height:138px;}
        .way{
            height:138px;
            img{width:70px;height:70px;}
            .message{
                padding-left:40px;
                line-height:40px;
                font-size:30px;
                color:#505050;
                p{font-size:22px;color:#afafaf;}
            }
        }
    }
    .submit-wrap{padding:50px 15px;background:#f2f2f2;}
}
</style>
<script type="text/babel">
    import submit from "../submit"
    import radio from '../select/radio'
    export default{
        data(){
            return {}
        }
        ,methods:{
            success() {
                this.$router.push({name:'success'})
            }
        }
        ,components: {
            submit,
            radio
        }
    }
</script>
