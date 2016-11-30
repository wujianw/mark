<template>
    <div class="find-password-el">
        <ul class="flex-center title">
            <li class="flex-space" :class="{active:step==1}">验证身份<i class="icon icon-arrow-right"></i></li>
            <li class="flex-space" :class="{active:step==2}">绑定手机<i class="icon icon-arrow-right"></i></li>
            <li class="flex-space" :class="{active:step==3}">验证码</li>
        </ul>
        <div v-if="step == 1">
            <input-text
                type="password"
                v-model="password"
                maxLength="18"
                placeholder="请输入您的密码"
                :icon="{iconClass:'icon-password'}"
            ></input-text>
            <submit class="" value="下一步" :dis="!1" @commit="verify()"></submit>
        </div>
        <div v-if="step == 2">
            <input-text
                type="number"
                v-model="mobile"
                maxLength="11"
                placeholder="请输入您的手机号"
                :icon="{iconClass:'icon-user'}"
            ></input-text>
            <submit class="" value="下一步" :dis="!1" @commit="verify()"></submit>
        </div>
        <div v-if="step == 3">
            <input-text
                type="number"
                v-model="vcode"
                maxLength="4"
                placeholder="请输入您收到的验证码"
                :icon="{iconClass:'icon-verification'}"
            ></input-text>
            <submit class="" value="下一步" :dis="!1" @commit="verify()"></submit>
        </div>
    </div>
</template>
<style lang="scss" rel="stylesheet/scss">
    .find-password-el{
        padding:26px 22px;
        .title{
            padding-bottom:20px;
            line-height: 1.5;
            text-align: center;
            font-size:30px;
            color:#505050;
            li{
                flex-grow: 1;
                &:before{content:''}
            }
            li:last-of-type{
                &:after{content:''}
            }
            i{color:#505050;}
            li.active{
                color:#e85453;
            }
        }
        .slide-wrap{
            position:relative;
            margin:20px 0;
            background: #fff;
            text-align: center;
            line-height: 74px;
            border-radius:10px;
            font-size:30px;
            color:#9a989b;
            .slide{
                position:absolute;
                top:0;
                left:0;
                width:148px;
                height:74px;
                border-radius:10px;
                background:#00ce9a;
                .slide-block{
                    width:72px;
                    height:72px;
                    border:1px solid #f2f2f2;
                    border-radius:10px;
                    background:#fff;
                    text-align:center;
                    line-height:72px;
                    float:right;
                }
            }
        }
        .submit-el{margin:20px 0;}
    }
</style>
<script type="text/babel">
    import inputText from '../inputText'
    import submit from '../submit'
    import MessageBox from '../../msgbox'
    import member from '../../api/member'
    export default{
        data(){
            return{
                step:1,
                mobile:'',
                vcode:'',
                password:''
            }
        }
        ,components:{submit, inputText}
        ,methods:{
            verify() {
                if(this.step == 1 && !/^[0-9a-zA-Z$#@^&]{6,}$/.test(this.password)){
                    MessageBox.alert("6位及以上，字母加数字或者合法字符")
                    return false
                }
                if(this.step == 2 && !/^[1][\d]{10}$/.test(this.mobile)){
                    MessageBox.alert("请输入有效手机号码")
                    return false
                }
                if(this.step == 3 && !/^[\d]{4}$/.test(this.vcode)){
                    MessageBox.alert("请输入正确验证码")
                    return false
                }
                member.bindMobile(this.step,{password:this.password,vcode:this.vcode,mobile:this.mobile}).then(() => {
                    if(this.step == 2){
                        return member.getMobileCode({type:'bindMobile',mobile:this.mobile})
                    }
                }).then(() => {
                    if(this.step < 3) {
                        this.step++
                    }else {
                        this.$router.back()
                    }
                }).catch(() => {})
            },
        }
        ,beforeRouteLeave(to,from,next) {
            this.$destroy()
            next()
        }
    }
</script>

