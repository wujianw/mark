<template>
    <div class="password-el">
        <input-rule type="password" placeholder="请输入您的原密码" v-model="originPassword"></input-rule>
        <input-rule type="password" placeholder="请输入您的新密码（至少6位）" v-model="newPassword"></input-rule>
        <input-rule type="password" placeholder="请再次输入您的新密码" v-model="verifyPassword"></input-rule>
        <submit value="提交修改" :dis="!dis" @commit="userSubmit"></submit>
    </div>
</template>
<style lang="scss">
    .password-el{
        padding:26px 22px;
    }
</style>
<script type="text/babel">
    import inputRule from '../inputRule'
    import submit from '../submit'
    export default{
        data(){
            return{
                originPassword:"",
                newPassword:"",
                verifyPassword:"",
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
            }
        }
        ,computed:{
            dis() {
                return this.originPassword && this.newPassword === this.verifyPassword && this.newPassword
            }
        }
    }
</script>
