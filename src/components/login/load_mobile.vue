<template>
    <transition name="left">
        <div class="load-view">
            <mobile-code type="memberLogin" :mobile="mobile" @mobileFn="mobile = arguments[0]" :vcode="vcode" @vcodeFn="vcode = arguments[0]"></mobile-code>
            <div>
                <p class="hint">温馨提示：未注册积分账号的手机号，登入时间自动为您注册且代表您已同意<a href="">《积分宝消费养老用户服务协议》</a></p>
            </div>
            <div class="load-btn" @click="createdUser" :disabled="!disabled">
                <span>登录</span>
            </div>
            <div class="hint-voice">
                <p>收不到短信？ 使用<span>语音验证码</span></p>
                <p>{{getToken}}</p>
            </div>
        </div>
    </transition>
</template>
<script type="text/babel">
    import { mapGetters } from 'vuex'
    import mobileCode from './mobileCode'

    export default{
        data(){
            return {
                mobile: '',
                vcode: ''
//                refCaptchaText:"获取验证码",
//                refCaptchaBtn : true,

            }
        }
        ,components:{
            mobileCode
        },
        computed: {
            ...mapGetters({
                getToken:'getToken'
            }),
            disabled() {
                return this.mobile.match(/^1+\d{10}$/) && this.vcode.match(/^\d{4}$/);
            }
        },
        methods: {
            createdUser(){
                let params = {
                    "userType":"member",
                    "loginId":this.mobile,
                    "vcode":this.vcode
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
<style>
    .load-view {
        position:absolute;
        top:81px;
        bottom:0;
        width:calc(100% - 48px);
        padding: 20px 24px 0;
    }



    .hint {
        padding: 24px 0 42px;
        line-height: 1.2;
        font-size: 20px;
    }

    a {
        color: #e85352
    }

    .load-btn {
        margin: 58px auto 55px;
        text-align: center;
        background: #e85352;
        border-radius: 10px;
        line-height: 80px;
        font-size: 30px;
        color: #fff;
    }

    .hint-voice {
        text-align: center;
        color: #afafaf;
        font-size: 24px;
    }

    .hint-voice span {
        color: #e85352;
    }

    .no-password {
        color: #e85352;
        font-size: 26px;
    }
</style>
