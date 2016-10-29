<template>
    <div class="bound-wrap">
        <p class="title">温馨提示：您只能绑定未被使用的预读卡，若为付费卡，请联系当地服务中心</p>
        <input-text v-model="blockNum.blockNum" placeholder="请输入您的积分宝卡号" :icon="blockNum.icon"></input-text>
        <input-text v-model="authCode.authCode" placeholder="卡号验证码（若卡背面有规则必填）" :icon="authCode.icon">
            <p class="link-state">什么是卡号验证码？</p>
        </input-text>
        <div class="load-btn" @click="">
            <span>更换</span>
        </div>
    </div>
</template>
<style lang="scss" rel="stylesheet/scss">
    .bound-wrap{
        padding:12px 20px;
        .title{
            padding:14px 0;
            font-size:22px;
            line-height:24px;
            color:#afafaf;
        }
        .link-state{
            padding-left:6px;
            color:#e85352;
            font-size:20px;
        }
        .load-btn{
            margin: 80px auto 0;
            text-align: center;
            background: #e85352;
            border-radius: 10px;
            line-height: 80px;
            font-size: 30px;
            color: #fff;
        }
    }
</style>
<script type="text/babel">
    import inputText from "./../inputText.vue"
    export default {
        data() {
            return {
                blockNum: {
                    blockNum:""
                    ,icon:{
                        iconClass: 'icon-block'
                    }
                }
                ,authCode: {
                    authCode:""
                    ,icon:{
                        iconClass: 'icon-verification'
                    }
                }
            }
        }
        ,components:{
            inputText
        }
    }
</script>
