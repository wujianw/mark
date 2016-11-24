<template>
    <div class="activation-el">
        <div class="activation-input">
            <div class="top-tips">重要提示：请认真核对您的身份信息，确保信息填写正确，否则将投保失败！</div>

            <input-text v-model="name" placeholder="姓名" :icon="user.nameIcon" :show="!mAuth_flag && !!name" :dis="!!mAuth_flag"></input-text>

            <input-text v-model="mIdentityId" placeholder="身份证号" :icon="user.idCardIcon" :show="!mAuth_flag && !!mIdentityId" :dis="!!mAuth_flag"></input-text>

            <!--<input-text @click.stop="toggleAddress" v-model="location" placeholder="选择所在区县" :icon="user.locIcon" :show="!!location"></input-text>-->
            <div class="flex-space input-el" @click.stop="toggleAddress">
                <div class="input flex-space">
                    <i class="icon" :class="user.locIcon.iconClass"></i>
                    <input type="text" v-model="locationName" placeholder="选择所在区县" readonly >
                </div>
            </div>
            <input-text v-model="email" placeholder="电子邮箱" :icon="user.emailIcon" :show="!!email"></input-text>

            <submit class="load-btn" :dis="!1" :value="mAuth_flag ? '修 改' : '认 证'" @commit="activate"></submit>
            <div class="agreement">
                <i class="icon icon-ok"></i><span>我已阅读《积分宝养老会员电子投保协议》并愿意遵守各项规则</span>
            </div>
        </div>
        <div class="position">
            <city-area @close="toggleAddress" :show="addressActive" @cityArea="cityArea"></city-area>
        </div>
    </div>
</template>
<script type="text/babel">
    import inputText from "./../inputText"
    import cityArea from "./../cityArea"
    import submit from "./../submit"
    import member from '../../api/member'
    import { mapGetters } from 'vuex'
    import MessageBox from '../../msgbox'
    export default {
        data() {
            return{
                addressActive:false,
                mAuth_flag:false,
                mActivate:this.$route.query.mActivate,
                name:'',
                mIdentityId:'',
                locationName:'',
                areaId:'',
                email:''
            }
        },
        created() {
            window.document.title = "实名认证"
            let reg = /^9[1,9]/g
            if(!reg.test(this.getMember.mIdentityId)) {
                this.mAuth_flag = true
                this.name = this.getMember.mName
                this.mIdentityId = this.getMember.mIdentityId
                this.locationName = this.getMember.location || ''
                this.email = this.getMember.mEmail
            }

        },
        computed:{
            ...mapGetters({
                getMember:'getMember'
            }),
            user() {
                return {
                    nameIcon:{
                        iconClass: 'icon-user',
                        color:'#808080'
                    },
                    idCardIcon:{
                        iconClass: 'icon-nickname'
                    },
                    locIcon:{
                        iconClass: 'icon-place'
                    },
                    emailIcon:{
                        iconClass: 'icon-email'
                    }
                }
            }
        },
        methods:{
            activate(){
                let name = this.name,
                    idCard = this.mIdentityId,
                    areaCode = Number(this.areaId),
                    email = this.email
                let reg_email = /^(([a-zA-Z0-9]+[_|-|.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|-|.]?)*[a-zA-Z0-9]+(.(com|cn|net|co))+)?$/
                if(!reg_email.test(email)) return MessageBox.alert("无效邮箱")
                if(this.mAuth_flag){ // 已认证调用修改接口
                    member.changeInformation({areaCode,email}).then(() => {
                        MessageBox.alert("修改成功！").then(() => {
                            this.$router.back()
                        })
                    }).catch(res => {
                        MessageBox.alert(res)
                    })
                }else { // 未认证调用认证接口
                    if(!name) return MessageBox.alert("无效名字")
                    let reg_idCard = /^[a-zA-Z0-9]+$/
                    if(!reg_idCard.test(idCard)) return MessageBox.alert("身份证号无效")
                    if(!areaCode) return MessageBox.alert("无效地址")
                    member.activate({name, idCard, areaCode, email}).then(() => {
                        MessageBox.alert("认证成功！").then(() => {
                            this.$router.back()
                        })
                    }).catch(res => {
                        MessageBox.alert(res)
                    })
                }
            },
            toggleAddress() {
                this.addressActive = !this.addressActive
            },
            cityArea(option) {
                this.addressActive = false
                this.locationName = option.name
                this.areaId = option.areaId
            }
        },
        components:{inputText, submit, cityArea}
    }
</script>
<style lang="scss" rel="stylesheet/scss">
    .activation-el{
        .activation-input{padding:0 15px;}
        .position{
            position:fixed;
            bottom:0;
            width:750px;
            margin:0 auto;
        }
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
