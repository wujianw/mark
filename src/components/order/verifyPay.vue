<template>
    <div>
        <div class="flex-center verify-head">

            <div class="verify-head-img"></div>

            <div class="verify-details">
                <p class="verify-money">&yen125.00</p>
                <p class="verify-goods-name">咖啡代金券一张</p>
            </div>


        </div>

        <div class="flex-space pay-selected">
            <div class="verify-pay-img"></div>
            <div class="verify-pay-details">

                <p class="pay-name">微信支付</p>
                <p class="pay-name-title">推荐安装微信5.0及以上版本的用户使用</p>

            </div>
            <div class="verify-selected">
                <!--选择一种支付-->
            </div>

        </div>


        <submit class="verify-submit" value="确认支付"> </submit>
    </div>
</template>
<style lang="scss">

    .verify-head{
        height: 218px;
        background: white;

        .verify-head-img{
            height: 92px;
            width: 92px;
            background: red;
            border-radius:50%;
        }
    }

    .verify-details{
        height: 92px;

        margin-left:36px;
        .verify-money{
            padding-top: 8px;
            font-size: 40px;
            color: #e85453;
        }
        .verify-goods-name{
            font-size: 28px;
            color: #afafaf;
            margin-top: 10px;
        }
    }
    .pay-selected{
        margin-top: 18px;
        height: 138px;
        background: white;

        .verify-pay-img{

            background: grey;
            width: 68px;
            height: 68px;
            margin-left: 38px;
            border-radius:6px;
        }

        .verify-pay-details{
            height: 68px;
            margin-left: -180px;
            .pay-name{
                font-size: 30px;
                color: #505050;
                margin-top: 5px;
            }
            .pay-name-title{
                font-size: 22px;
                color: #afafaf;
                margin-top: 5px;
            }

         }

        .verify-selected{
            width: 30px;
            height: 30px;
            margin-right: 22px;
            background: red;
            border-radius:50%;
        }
    }



    .verify-submit{

        margin-top: 18px;
    }
</style>
<script type="text/babel">
    import submit from "./submit"
    export default{
        data(){
            return {}
        }
        , components: {
            submit
        }
    }
</script>
