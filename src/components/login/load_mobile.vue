<template>
    <transition name="left">
        <div class="load-view">
            <mobile-code type="memberLogin" :mobile="mobile" @mobileFn="mobile = arguments[0]" :vcode="vcode" @vcodeFn="vcode = arguments[0]"></mobile-code>
            <div>
                <p class="hint">温馨提示：未注册积分账号的手机号，登入时间自动为您注册且代表您已同意
                    <!--<router-link :to="{name:'agreementDetails',query:{title:'《消费养老用户服务协议》',type:7}}">《消费养老用户服务协议》</router-link>-->
                </p>
            </div>
            <div class="load-btn">
                <submit class="" value="登录" :dis="!disabled" @commit="createdUser"></submit>
            </div>
            <div class="hint-voice">
                <!--<p>收不到短信？ 使用<span>语音验证码</span></p>-->
            </div>
        </div>
    </transition>
</template>
<script type="text/babel">
    import mobileCode from './mobileCode'
    import submit from '../submit'
    import MessageBox from '../../msgbox'
    export default{
        data(){
            return {
                mobile: '',
                vcode: ''
            }
        }
        ,components:{
            mobileCode
            ,submit
        },
        computed: {
            disabled() {
                return this.mobile.match(/^1+\d{10}$/) && this.vcode.match(/^\d{4}$/);
            }
        },
        created() {
            window.localStorage.token = ''
            this.$store.dispatch("clearUser")
        },
        methods: {
            createdUser(){
                let params = {
                    "userType":"member",
                    "loginId":this.mobile,
                    "vcode":this.vcode
                }
                this.$store.dispatch('login', params).then(res => {
                    if(this.$route.query.from){
                        this.$router.replace({name:this.$route.query.from})
                    }else {
                        this.$router.back()
                    }
                }).catch(res =>{
                    MessageBox.alert(res)
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
