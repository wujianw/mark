<template>
    <div>
         <div class="wallet-code">
            <div class="flex-space moible">
                <div class="wallet-moible">178****5678</div>
                <div class="wallet-getcod">发送验证码</div>
            </div>
             <input type="text" placeholder="请输入手机短信中心的验证码" class="code">
         </div>
        <submit class="wallet-verify" value="验证"></submit>
    </div>
</template>
<style lang="scss" rel="stylesheet/scss">
    .wallet-code{
        margin-top: 30px;
        height: 160px;
        padding-left: 12px;
        padding-right: 12px;
        border-radius: 6px;
        background: #d7d6d6;
        .moible{
            height: 80px;
            border-bottom: 1px solid #ffffff;
            font-size: 36px;
            color: #505050;
            .wallet-getcod{
                box-sizing: border-box;
                border: 1px solid#e85453;
                line-height: 65px;
                padding-left: 12px;
                padding-right: 12px;
                border-radius: 6px;
                color: #e85453;

            }

        }
        input.code{
            color: #505050;
            height: 80px;
            width: 100%;
            font-size: 36px;
            border: none;
            background: none;
        }
    }
    .wallet-verify{
        margin-top: 60px;
    }
    .wallet-password{
        margin-top: 30px;
        height: 80px;
        background: grey;
        .caonima{
            margin-left: 20%;
            color: #505050;
            height: 80px;
            width: 60%;
            font-size: 36px;
            border: none;
            background: none;
            text-align: center;

            border: 1px solid red;
        }
    }
</style>
<script type="text/babel">
    import submit from '../submit'
    export default{
        data(){
            return{

            }
        }
        ,components:{
            submit
        }
    }
</script>
