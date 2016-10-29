<template>
    <div class="apply-refund-el">
        <section>
            <h3 class="flex-space"><span>订单码券</span><span>已选择{{num}}张</span></h3>
            <radio v-for="n in 3" type="checkbox" name="check" @sum="option" :id="'check'+n+n" text="呵呵呵"></radio>
        </section>
        <section>
            <h3>退还内容</h3>
            <p>现金：<span class="gold">1</span></p>
            <p>红包：<span class="gold">1</span></p>
        </section>
        <section>
            <h3>现金退还方式</h3>
            <p>原路反还</p>
        </section>
        <section>
            <h3>退款原因</h3>
            <radio v-for="n in 3" name="check" :id="'check'+n" text="呵呵呵"></radio>
        </section>
        <div class="other-wrap flex-space">
            <input type="text" class="other" placeholder="请输入其他意见">
        </div>
        <div class="submit-wrap">
            <submit value="申请退款"></submit>
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
<script>
    import radio from './../select/radio'
    import submit from './../submit'
    export default{
        data(){
            return{
                num:0
            }
        }
        ,components:{
            radio,
            submit
        }
        ,methods:{
            option(checked) {
                checked ? this.num++ : this.num--
            }
        }
    }
</script>
