<template>
    <transition name="left">
        <div class="load-view">
            <ul class="load-mobile-view">
                <li class="flex-space">
                    <div class="mobile-text flex-space">
                        <i class="icon icon-user"></i>
                        <input class="input" type="number" v-model="loginId" placeholder="请输入您的手机号码" maxlength="11">
                        <i class="icon icon-off"></i>
                    </div>
                </li>
                <li class="flex-space">
                    <div class="mobile-text flex-space">
                        <i class="icon icon-password"></i>
                        <input class="input" type="password" v-model="password" placeholder="请输入您密码">
                        <i class="icon icon-off"></i>
                    </div>
                </li>
            </ul>
            <div class="load-btn" @click="createdUser">
                <span>登录</span>
            </div>
            <div class="flex-space no-password">
                <p>
                    <router-link :to="{ name: 'loadMobile'}"><span>立即注册</span></router-link>
                </p>
                <p>忘记密码</p>
            </div>
        </div>
    </transition>
</template>
<script type="text/babel">
    export default{
        data() {
            return {
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
                    this.$router.push({name:'user'})
                }).catch(res =>{
                    console.log(2)
                })
            }
        }
    }
</script>
