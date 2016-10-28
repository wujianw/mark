<template>
    <div class="password-el">
        <input-rule type="password" placeholder="请输入新登入密码" v-model="newPassword"> </input-rule>
        <input-rule type="password" placeholder="请再输入一次新登录密码" v-model="verifyPassword"></input-rule>

        <submit value="确认修改(2/2)" :dis="!dis" @commit="userSubmit"></submit>
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
                newPassword:"",
                verifyPassword:"",
                dis:false
            }
        },
        created(){
          console.log(this.$route.params)
        }
        ,components:{
            inputRule,
            submit
        }
        ,methods:{
            userSubmit() {
                //调用密码修改接口，成功后返回登入页面
                let params = this.$route.params
                console.log(params+","+this.newPassword)
                this.$http.get('/api/open/member/find_pwd3.json',
                        {params:{"mobile":params.mobile,"vcode":params.vcode,"password":this.newPassword}})
                        .then(res => {
                            let data = JSON.parse(res.data)
                            console.log(data)
                            if(data.code == 0){
                                this.$router.push({name:'loadMobile'})
                            }else{
                                MessageBox.alert(data.message)
                            }
                        })
            }
        }
        ,computed:{
            dis() {
                return this.newPassword === this.verifyPassword && this.newPassword > 0
            }
        }
    }
</script>
