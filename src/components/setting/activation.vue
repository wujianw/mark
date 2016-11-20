<template>
    <div class="activation-el">
        <div>
            <div class="top-tips">重要提示：请认真核对您的身份信息，确保信息填写正确，否则将投保失败！</div>
            <input-text
                v-for="item in user"
                v-model="item.value"
                :placeholder="item.placeholder"
                :icon="item.icon"
                :show="!!item.value"
                :dis="!item.dis"
            ></input-text>
            <template v-if="mActivate != 0" >
                <submit class="load-btn" :dis="!1" :value="btn_name" @commit="activate"></submit>
                <div class="agreement">
                    <i class="icon icon-ok"></i><span>我已阅读《积分宝养老会员电子投保协议》并愿意遵守各项规则</span>
                </div>
            </template>
        </div>
    </div>
</template>
<script type="text/babel">
    import inputText from "./../inputText"
    import submit from "./../submit"
    import member from '../../api/member'
    import { mapGetters } from 'vuex'
    import MessageBox from '../../msgbox'
    export default {
        data() {
            return{
                mActivate:this.$route.query.mActivate
            }
        },
        created() {
          window.document.title = "实名认证"
        },
        computed:{
            ...mapGetters({
                getMember:'getMember'
            }),
            user() {
                return {
                    name:{
                        dis:this.mActivate == 1,
                        value:this.getMember.mName,
                        placeholder:'姓名'
                        ,icon:{
                            iconClass: 'icon-user',
                            color:'#808080'
                        }
                    }
                    ,idcard:{
                        dis:this.mActivate == 1,
                        value:this.getMember.mIdentityId,
                        placeholder:"身份证号",
                        icon:{
                            iconClass: 'icon-nickname'
                        }
                    }
                    ,loc:{
                        dis:this.mActivate != 0,
                        value:this.getMember.mNativeAddress,
                        placeholder:"选择所在区县",
                        icon:{
                            iconClass: 'icon-place'
                        }
                    }
                    ,email:{
                        dis:this.mActivate != 0,
                        value:this.getMember.mEmail,
                        placeholder:"电子邮箱",
                        icon:{
                            iconClass: 'icon-email'
                        }
                    }
                }
            },
            btn_name() {
                return this.$route.query.mActivate == 2 ? "修 改" : "认 证"
            }
        },
        methods:{
            activate(){
                let self=this,
                    user = self.user,
                    name = user.name.value,
                    idCard = user.idcard.value,
                    areaCode = user.loc.value,
                    email = user.email.value

                if(!name){
                    return MessageBox.alert("无效名字")
                } else if(!idCard){
                    return MessageBox.alert("身份证号无效")
                } else if(!areaCode){
                    return MessageBox.alert("无效地址")
                } else if(!email){
                    return MessageBox.alert("无效邮箱")
                }
                member.activate({name, idCard, areaCode, email}).then(() => {
                    MessageBox.alert("认证成功！")
                }).catch(res => {
                    MessageBox.alert(res)
                })
            }
        },
        components:{ inputText,submit }
    }
</script>
<style lang="scss" rel="stylesheet/scss">
    .activation-el{
        padding:0 15px;
    }
    .top-tips{
        line-height: 90px;
        font-size: 20px;
        color: #afafaf;
    }
    .load-btn{
        margin:80px auto 50px;
    }
    .agreement{
        text-align: center;
        font-size: 22px;
        color: #e85352;
        i{font-size:20px;}
    }
</style>
