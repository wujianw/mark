<template>
    <div class="password-el">
        <input-rule type="password" placeholder="请输入您的手机号" v-model="originPassword"></input-rule>


       <div class="slide">

       </div>



        <input-rule type="password" placeholder="请输入短信验证码" v-model="verifyPassword"></input-rule>
        <submit value="验证(1/2)" :dis="!dis" @commit="userSubmit"></submit>
    </div>
</template>
<style lang="scss">
    .password-el{
        padding:26px 22px;

        .slide{
            background: white;
            height: 74px;
            border-radius:10px;
        }
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
