<template>
    <div>

        <div class="recharge-head">

            <div class="input-money">
              <span>金额</span>
                <input class="recharge-money" type="text"  placeholder="请输入您收到的短信验证码">
            </div>

            <div class="flex-space type-selected">

                <input type="radio" name="money" value="5" class="selected-money">5元
                <input type="radio" name="money" value="10" class="selected-money">10元
                <input type="radio" name="money" value="20" class="selected-money">20元

            </div>
            <div class="flex-space type-selected">

                <input type="radio" name="money" value="5" class="selected-money">30元
                <input type="radio" name="money" value="10" class="selected-money">50元
                <input type="radio" name="money" value="20" class="selected-money">100元

            </div>


        </div>

        <div class="recharge-centre">

        </div>

        <div class="recharge-foot">

        </div>


    </div>
</template>



<style lang="scss">

    .recharge-head{

        border-top: 18px solid #f2f2f2;
        height: 318px;
        background: white;
    }

    .input-money{
        padding-left: 38px;
        border-bottom: 1px solid #f2f2f2;
        height: 80px;
        background: white;
        font-size: 28px;
        color: #505050;
        line-height:80px;
        .recharge-money{
            width:400px;
            font-size: 26px;
            height: 70px;
            color: #505050;
        }

    }

    .type-selected{
        height: 119px;
        .selected-money{

        }
    }
    .recharge-centre{

        margin-top:18px ;
        height: 344px;
        background: white;
    }


</style>
<script type="text/babel">
    export default{
        data(){
            return {

            }
        }
        , components: {

        }
    }
</script>
