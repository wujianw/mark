<template>
    <div>
        <div>
            <div class="flex-center top_tips">重要提示：请认真核对您的身份信息，确保信息填写正确，否则将投保失败！</div>

            <input-text v-model="user.name.value" placeholder="姓名" :icon="user.name.icon" ref="nameref" :vshow="!1" :dis="disabled"></input-text>

            <input-text v-model="user.idcard.value" placeholder="身份证号" :icon="user.idcard.icon" ref="idcardref" :vshow="!1" :dis="disabled"></input-text>

            <input-text v-model="user.loc.value" placeholder="选择所在区县" :icon="user.loc.icon" ref="locref" :vshow="!1"></input-text>

            <input-text v-model="user.email.value" placeholder="电子邮箱" :icon="user.email.icon" ref="emailref" :vshow="!1"></input-text>

            <div class="load-btn" @click="activate">
                <span>{{btn_name}}</span>
            </div>

            <div class="flex-center protocal">
                <i></i><span>我已阅读《积分宝养老会员电子投保协议》并愿意遵守各项规则</span>
            </div>
        </div>
    </div>
</template>
<script type="text/babel">0
    import inputText from "./../inputText.vue"
    import member from '../../api/member'
    import { mapGetters } from 'vuex'
    import MessageBox from '../../msgbox';
    export default {
        data(){
            return{
                user:{
                  name:{
                      value:""
                      ,icon:{
                          iconClass: 'icon-block'
                      }
                  }
                  ,idcard:{
                        value:""
                        ,icon:{
                            iconClass: 'icon-block'
                        }
                    }
                    ,loc:{
                        value:""
                        ,icon:{
                            iconClass: 'icon-block'
                        }
                    }
                    ,email:{
                        value:""
                        ,icon:{
                            iconClass: 'icon-block'
                        }
                    }
                }
                ,mAuth_flag:''
                ,disabled:false,
                btn_name:"认 证"
            }
        }
        ,components:{
            inputText
        }
        ,computed: {
            ...mapGetters({
                mAuth_flag:'mAuth_flag'
            })
        }
        ,beforeRouteEnter(to,from,next){
            next(vm=>{
                if(vm.mAuth_flag=="1"){
                    vm.disabled=true
                    vm.btn_name="修 改"
                }else{
                    vm.disabled=false
                    vm.btn_name="认 证"
                }
//                MessageBox.alert("fuck")
            })
        }
        ,methods:{
            activate(){
                let self=this
                if(self.user.name.value==""){
                    self.$refs.nameref.$refs.refFn.focus();
                    return
                }
                if(self.user.idcard.value==""){
                    self.$refs.idcardref.$refs.refFn.focus();
                    return
                }
                if(self.user.loc.value==""){
                    self.$refs.locref.$refs.refFn.focus();
                    return
                }
                if(self.user.email.value==""){
                    self.$refs.emailref.$refs.refFn.focus();
                    return
                }
                member.activate({"name":self.user.name.value,"idCard":self.user.idcard.value,"areaCode":self.user.loc.value,"email":self.user.email.value}).then(() => {
                    MessageBox.alert("认证成功！")
                    console.log()
                }).catch(res => {
                    MessageBox.alert(res)
                })
            }
        }
    }
</script>
<style lang="scss" rel="stylesheet/scss">
    .top_tips{
        line-height: 90px;
        color: #afafaf;
        font-size: 20px;
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
    .protocal{
        margin-top: 50px;
        color: #e85352;
        font-size: 20px;
    }
</style>
