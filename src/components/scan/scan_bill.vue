<template>

    <div>
        <div class="load-wrap scan_bill_header" >
            积分宝体验店
        </div>

        <div class="container">
            <div style="line-height: 68px ;color: #807f7f">询问营业员确定消费金额后输入</div>
            <input-textstart :prefix="total" :second="second" placeholder="请输入消费总金额"></input-textstart>

            <div style="line-height: 74px"><img src=""><span style="font-size:24px;color: #e85352">输入不享受优惠金额</span></div>
            <div><span class="flex-space label1">优惠活动</span>
                <div label2>
                    <div><span class="flex-space label2">每满100立减5元，最高减免50元</span>
                    </div>
                    <div class="label1"><span>酒水部分不参与优惠，请输入不享受优惠金额</span></div>
                </div>
            </div>

            <span-textstart :prefix="realPay" :surfix="realPayValue" >
            </span-textstart>
            <span-textstart :prefix="shouldGet" :surfix="shouldGetValue"  >
            </span-textstart>
        </div>
        <div class="load-wrap flex-center" v-if="false">
            <router-link :to="{ name: 'loadMobile'}" active-class="load-active" class="scan_bill_header"><span>手机验证登入</span></router-link>
            <router-link :to="{ name: 'loadUser'}" active-class="load-active" class="scan_bill_header"><span>账号密码登入</span></router-link>
        </div>

        <div class="submit" @click="">
            <span>确认买单</span>
        </div>
    </div>
</template>
<script type="text/babel">
    import spanTextstart from './spanTextstart.vue'
    import inputTextstart from './inputTextstart.vue'
    export default {
        data () {
            return {
                realPay:"实付金额：",
                shouldGet:"将获养老金：",
                realPayValue:"￥0.00",
                shouldGetValue:"￥0.00",
                total:"消费总额",
                second:"￥"
            }
        }
        ,props:{
        }
        ,components:{
            spanTextstart,
            inputTextstart
        }

    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .load-wrap{
        background: #fff;
        text-align: center;
    }
    .scan_bill_header{
        font: 28px/76px "Microsoft Yahei";
        color: #505050;
    }
    .label1{
        padding-left: 20px;
        padding-top: 20px;
        padding-bottom: 10px;
        background:#fff;
    }
    .label2{
        padding-left: 20px;
        padding-top: 10px;
        background:#fff;
    }
    .container{
        font-size: 25px;
        color: #66667D;
        background-color: #f2f2f2;
    }

    .submit {
        margin: 58px auto 25px;
        text-align: center;
        background: #e85352;
        border-radius: 10px;
        line-height: 80px;
        font-size: 30px;
        color: #fff;
    }

    .load-active span{ color: #e85352; }

</style>
