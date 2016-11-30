<template>
    <ul class="load-mobile-el">
        <li class="flex-space">
            <input-text :value="mobile" type="number" @input="mobileFn" placeholder="请输入您的手机号码" :icon="mobileIcon">
                <div class="mobile-btn">
                    <p @click="refCaptcha">{{refCaptchaText}}</p>
                    <div class="shade" v-if="shade"></div>
                </div>
            </input-text>
        </li>
        <slot></slot>
        <li class="flex-space">
            <input-text :value="vcode" type="number" @input="vcodeFn" placeholder="请输入您收到的短信验证码" :icon="vcodeIcon" maxLength="4"></input-text>
        </li>
    </ul>
</template>
<style lang="scss" rel="stylesheet/scss">
    .mobile-btn {
        position:relative;
        flex-grow: 1;
        margin-left: 10px;
        background: #e85350;
        border-radius: 10px;
        text-align: center;
        font: 26px/74px "Microsoft Yahei";
        color: #fff;
        .shade{
            position:absolute;
            top:0;
            bottom:0;
            width:100%;
            opacity: 0;
            font: 26px/74px "Microsoft Yahei";
        }
    }
</style>
<script type="text/babel">
    import inputText from '../inputText'
    import MessageBox from '../../msgbox'
//    import MessageBox from '../../msgbox'
    /*
     * 双向绑定 手机验证码组件
     * 示例 <mobileCode :mobile="mobile" @mobileFn="mobile = arguments[0]" :vcode="vcode" @vcodeFn="vcode = arguments[0]"></mobileCode>
     * @params
     */
    export default{
        data() {
            return {
                refCaptchaText: "获取验证码",
                fn:null
                ,vcodeIcon:{
                    iconClass:'icon-verification'
                }
                ,mobileIcon:{
                    iconClass:'icon-user'
                }
                ,refCaptchaBtn: true
            }
        }
        ,components: {
            inputText
        }
        ,methods: {
            mobileFn(value) {
                this.$emit('mobileFn', value)
            }
            ,vcodeFn(value) {
                this.$emit('vcodeFn', value)
            }
            //发送成功，倒计时
            ,countDown(){
                this.$nextTick(function () {
                    var self = this, count = 60
                    self.refCaptchaBtn = !this.refCaptchaBtn
                    self.refCaptchaText = count + "s"
                    this.fn = setInterval(function () {
                        count--
                        if (!count) {
                            self.refCaptchaText = "重新发送"
                            self.refCaptchaBtn = true
                            clearInterval(self.fn)
                        }else{
                            self.refCaptchaText = count + "s"
                        }
                    }, 1000)
                })
            },
            //验证手机号码，验证发送短信
            refCaptcha() {
                this.$nextTick(function () {
                    if(this.mobile.match(/^[1][\d]{10}$/) && this.refCaptchaBtn){
                        if(this.judgeMember){
                            this.judge().then(res => {
                                let data = JSON.parse(res.data)
                                if(!data.code){
                                    this.fetchVCode()
                                }else {
                                    MessageBox.alert(data.message)
                                }
                            })
                        }else {
                            this.fetchVCode()
                        }
                    }else if(this.refCaptchaBtn){
                        MessageBox.alert("请输入有效手机号码")
                    }
                    return false;
                });
            },
            judge() {// 验证手机号是否存在
                return this.$http.get('/api/open/member/find_pwd1.json',{params:{"mobile":this.mobile}})
            },
            fetchVCode() { // 获取验证码
                this.$http.get('/api/open/common/get_vcode.json',{params:{"mobile":this.mobile,"type":this.type}})
                    .then(() => {
                        this.refCaptchaBtn = false
                        this.countDown()
                    },() => {
                        this.refCaptchaBtn = true;
                    }).catch(() => {

                    })
            }

        }
        ,props:{
            mobile:{
                type:String,
                default:""
            }
            ,vcode:String
            ,type:String
            ,shade:{
                type:Boolean,
                default:false
            }
            ,judgeMember:{// 是否需要验证手机号是否存在
                type:Boolean,
                default:false
            }
        }
    }
</script>
