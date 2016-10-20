<template>
    <transition name="left">
        <div class="load-view">
            <ul class="load-mobile-view">
                <li class="flex-space">
                    <div class="mobile-text flex-space">
                        <i class="icon icon-user"></i>
                        <input class="input" type="text" v-model="mobile" placeholder="请输入您的手机号码"
                               maxlength="11">
                        <i class="icon icon-off"></i>
                    </div>
                    <div class="mobile-btn"><p @click="refCaptcha">{{refCaptchaText}}</p></div>
                </li>
                <li class="flex-space">
                    <div class="mobile-text flex-space">
                        <i class="icon icon-verification"></i>
                        <input class="input" type="text" v-model="vcode" placeholder="请输入您收到的短信验证码">
                        <i class="icon icon-off"></i>
                    </div>
                </li>
            </ul>
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
    export default{
        data(){
            return {
                mobile: '',
                vcode: '',
                refCaptchaText:"获取验证码",
                refCaptchaBtn : true,
                fn:null
            }
        },
        computed: {
            ...mapGetters({
                getToken:'getToken'
            }),
            disabled() {
                return (this.mobile.match(/^1+\d{10}$/) && this.vcode.match(/^\d{4}$/));
            },

        },
        methods: {
            //发送成功，倒计时
            countDown(){
                this.$nextTick(function () {
                    var self = this, count = 60;
                    self.refCaptchaBtn = !this.refCaptchaBtn;
                    self.refCaptchaText = count + "s";
                    this.fn = setInterval(function () {
                        count--;
                        if (!count) {
                            self.refCaptchaText = "重新发送";
                            self.refCaptchaBtn = true;
                            clearInterval(self.fn);
                        }else{
                            self.refCaptchaText = count + "s";
                        }
                    }, 1000);
                });
            },
            //验证手机号码，验证发送短信
//            type=memberLogin&mobile=%@&smsType=0
            refCaptcha() {
                this.$nextTick(function () {
                    if(this.mobile.match(/^1+\d{10}$/) && this.refCaptchaBtn){
                        console.log(this.mobile)
                        this.$http.get('api/open/common/get_vcode.json',{params:{"mobile":this.mobile,"type":"memberLogin"}})
                            .then((response) => {
                            this.refCaptchaBtn = false;
                            var data = JSON.parse(response.data);
                                console.log(data)
                            this.countDown();
                        },(response) => {
                            this.refCaptchaBtn = true;
                        }).catch(res => {
                            console.log("")
                        });
                    }
                    return false;
                });
            },
            createdUser(){
                let params = {
                    "userType":"member",
                    "loginId":this.mobile,
                    "vcode":this.vcode
                }
                this.$store.dispatch('loginMobile', params)
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

    .load-view li {
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

    .mobile-btn {
        flex-grow: 1;
        margin-left: 10px;
        background: #e85350;
        border-radius: 10px;
        text-align: center;
        font: 26px/74px "Microsoft Yahei";
        color: #fff;
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
