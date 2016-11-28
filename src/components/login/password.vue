<template>
    <div class="password-el">
        <input-rule type="password" placeholder="请输入您的原密码" v-model="oldPassword"></input-rule>
        <input-rule type="password" placeholder="请输入您的新密码（至少6位）" v-model="newPassword"></input-rule>
        <input-rule type="password" placeholder="请再次输入您的新密码" v-model="password"></input-rule>
        <submit value="提交修改" :dis="!dis" @commit="userSubmit"></submit>
    </div>
</template>
<style lang="scss" rel="stylesheet/scss">
    .password-el{
        padding:26px 22px;
    }
</style>
<script type="text/babel">
    import inputRule from '../inputRule'
    import submit from '../submit'
    import member from '../../api/member'
    import MessageBox from '../../msgbox'
    export default{
        data(){
            return{
                oldPassword:"",
                newPassword:"",
                password:"",
                dis:false
            }
        }
        ,components:{
            inputRule,
            submit
        }
        ,methods:{
            userSubmit() {
                //调用密码修改接口，成功后返回登入页面
                let reg = /^[0-9a-zA-Z$#@^&]{6,}$/
                if(this.newPassword !== this.password){
                    MessageBox.alert("两次输入密码不一致")
                    return false
                }
                if(!reg.test(this.password)){
                    MessageBox.alert("6位及以上，字母加数字或者合法字符")
                    return false
                }
                member.pwd({oldPassword:this.oldPassword,password:this.password}).then(() => {
                    window.localStorage.token = null
                    this.$router.push({name:'loadMobile'})
                }).catch(() => {})
            }
        }
        ,computed:{
            dis() {
                return this.oldPassword && this.newPassword && this.password
            }
        }
    }
</script>
