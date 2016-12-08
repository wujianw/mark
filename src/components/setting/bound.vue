<template>
    <div class="bound-wrap">
        <p class="title">温馨提示：您只能绑定未被使用的预读卡，若为付费卡，请联系当地服务中心</p>
        <input-text v-model="blockNum" maxLength="18" placeholder="请输入您的积分宝卡号" :icon="blockIcon" ref="blockNumRef"></input-text>
        <input-text v-model="authCode" maxLength="6" placeholder="卡号验证码（若卡背面有规则必填）" :icon="authIcon" ref="authCodeRef">
            <p class="link-state">什么是卡号验证码？</p>
        </input-text>
        <div class="load-btn" @click="changeCard">
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
    import inputText from "./../inputText"
    import member from '../../api/member'
    import MessageBox from '../../msgbox'
    export default {
        data() {
            return {
                blockNum:""
                ,blockIcon:{
                    iconClass: 'icon-block'
                },
                authCode:""
                ,authIcon:{
                    iconClass: 'icon-verification'
                }
            }
        }
        ,components:{
            inputText
        }
        ,methods:{
            changeCard(){
                let self=this,
                    reg_block = /^[\d]{16}$/,
                    reg_auth = /^[\d]{6}$/
                if(!reg_block.test(self.blockNum)){
                    MessageBox.alert("请输入正确的卡号").then(() => {
                        self.$refs.blockNumRef.$refs.refFn.focus()
                    })
                    return false
                }
                if(!reg_auth.test(self.authCode)){
                    MessageBox.alert("请输入正确的验证码").then(() => {
                        self.$refs.authCodeRef.$refs.refFn.focus()
                    })
                    return false
                }
                member.changeCard({"blockNum":self.blockNum,"authCode":self.authCode}).then(() => {
                    MessageBox.alert("绑卡成功").then(() => {
                        this.$route.back()
                    })
                }).catch(res => {
                    MessageBox.alert(res)
                })
            }
        }
    }
</script>
