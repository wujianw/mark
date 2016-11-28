<template>
    <transition name="left">
        <div class="load-view">
            <ul class="load-mobile-view">
                <input-text v-model="loginId" placeholder="请输入您的账号" :icon="loginIdIcon"></input-text>
                <input-text v-model="password" type="password" placeholder="请输入您密码" :icon="passwordIcon"></input-text>
            </ul>
            <div class="load-btn">
                <submit class="" value="登录" :dis="!(password&&loginId)" @commit="createdUser"></submit>
            </div>
            <div class="flex-space no-password">
                <p>
                    <router-link :to="{ name: 'loadMobile'}"><span>立即注册</span></router-link>
                </p>
                <p>
                    <router-link :to="{ name: 'findPassword'}"><span>忘记密码</span></router-link>
                </p>
            </div>
        </div>
    </transition>
</template>
<style>
    .load-mobile-view li {
    padding-top: 24px;
    }

    .mobile-text {
    flex-grow: 3;
    height: 74px;
    border-radius: 10px;
    background: #fff;

    }

    .mobile-text i {
    width: 60px;
    text-align: center;
    font-size: 44px;
    }

    .mobile-text .input {
    flex-grow: 1;
    margin: 15px 0;
    padding-left: 5px;
    font: 26px/44px "Microsoft Yahei";
    border: none;
    border-left: 1px solid #000;
    }
</style>
<script type="text/babel">
    import inputText from '../inputText'
    import submit from '../submit'
    import MessageBox from '../../msgbox'
    export default{
        data() {
            return {
                loginIdIcon: {
                    iconClass: 'icon-user'
                }
                ,passwordIcon: {
                    iconClass: 'icon-password'
                },
                password: '',
                loginId: ''
            }
        }
        ,methods:{
            createdUser(){
                let params = {
                    "userType":"member",
                    "loginId":this.loginId,
                    "password":this.password
                }
                this.$store.dispatch('login', params).then(res => {
//                    this.$router.push({name:'user'})
                    this.$router.back()
                }).catch(res =>{
                    MessageBox.alert(res)
                })
            }
        }
        ,components:{
            inputText
            ,submit
        }
    }
</script>
