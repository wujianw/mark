<template>
    <transition name="wrap">
        <div class="keyboard-wrap-el">
            <div class="keyboard-password-wrap">
                <h3>{{title}}</h3>
                <ul class="keyboard-password" @touchend.stop="keyboardCancel">
                    <li v-for="n in 6"><i :class="{active:n<=password.length}"></i></li>
                </ul>
            </div>
            <transition name="fade">
                <div class="keyboard-wrap" v-show="show">
                    <ul class="keyboard">
                        <li v-for="item in nums">
                            <a v-for="n in item" :key="n" @touchstart.stop="keyboardNums(n)">{{n}}</a>
                        </li>
                        <li>
                            <a class="cancel" @touchstart.stop="keyboardCancel">取消</a>
                            <a @touchstart.stop="keyboardNums(lastNum)">{{lastNum}}</a>
                            <a class="backspace"  @touchstart.stop="keyboardBackspace" ><i class="icon icon-backspace"></i></a>
                        </li>
                    </ul>
                </div>
            </transition>
        </div>
    </transition>
</template>
<style lang="scss" rel="stylesheet/scss" scoped>
    .fade-enter-active, .fade-leave-active {
        transition: all .8s ease;
    }
    .fade-enter, .fade-leave-active {
        transform: translateY(100%);
        opacity: 0
    }
    .wrap-enter-active, .wrap-leave-active {
        transition: all .5s ease;
    }
    .wrap-enter, .wrap-leave-active {
        transform: translateX(100%);
        opacity: 0
    }
    .keyboard-wrap-el{
        position:relative;
    }
    .keyboard-wrap{
        position:fixed;
        width:100%;
        bottom:0;
    }
    .keyboard-password-wrap{
        position:absolute;
        width:100%;
        top:0;
        h3{
            padding-top:90px;
            text-align: center;
            font-size:30px;
            font-weight:normal;
            color:#828282;

        }
    }
    .keyboard-password{
        display: flex;
        justify-content: center;
        padding-top:45px;
        li{
            display: flex;
            justify-content: center;
            align-items: center;
            width:90px;
            height:90px;
            border-right:1px solid #999;
            border-top:1px solid #999;
            border-bottom:1px solid #999;
            background:#fff;
            &:first-of-type{
                border-left:1px solid #999;
            }
            .active{
                display: block;
                width:16px;
                height:16px;
                border-radius: 50%;
                background:#000;
            }
        }
    }
.keyboard{
    height:324px;
    li{

        display: flex;
        justify-content: space-between;
        align-content: center;
        background:#fff;
        text-align: center;
        line-height:80px;
        font-size: 40px;
        a{
            width:25%;
            flex-grow: 1;
            border-top:1px solid #d9d9d9;
            color:#505050;
            &:nth-of-type(2){
                border-right:1px solid #d9d9d9;
            }
            &:nth-of-type(1){
                border-right:1px solid #d9d9d9;
            }
            &.cancel{
                font-size: 30px;
            }
            &.backspace{
                i{
                    font-size: 40px;
                }
            }
        }

    }
}
</style>
<script type="text/babel">
    /*
     * 键盘组件
     * @params
     */
    import shuffle from 'lodash/shuffle'
    import chunk from 'lodash/chunk'
    import MessageBox from '../../msgbox'
    import AES from '../../assets/js/aesutils'
    import member from '../../api/member'
    const passwordAes = new AES.Crypto('key1234567891000')
    export default{
        data(){
            return {
                lastNum:null,
                title:"",
                nums:[],
                passwordUpper:'',
                newPasswordUpper:'',
                newFirstPasswordUpper:'',
                password:'',
                show:true,
            }
        }
        ,created() {
            this.setNum()
        }
        ,watch: {
            password(newVal) {
                if(newVal.length == 6){
                    if(this.$route.params.type == 'oldPassword'){
                        this.passwordUpper = passwordAes.encrypt(newVal+'\n\n\n\n\n\n\n\n\n\n').toUpperCase()
                        member.updatePwd({password:this.passwordUpper}).then(() => {
                            this.$router.replace({name:'keyboard',params:{type:'newFirstPassword'}})
                        }).catch(() => {})
                    }else if(this.$route.params.type == 'newFirstPassword') {
                        this.newFirstPasswordUpper = passwordAes.encrypt(newVal+'\n\n\n\n\n\n\n\n\n\n').toUpperCase()
                        this.$router.replace({name:'keyboard',params:{type:'newPassword'}})
                    }else if(this.$route.params.type == 'newPassword'){
                        this.newPasswordUpper = passwordAes.encrypt(newVal+'\n\n\n\n\n\n\n\n\n\n').toUpperCase()
                        if(this.newPasswordUpper == this.newFirstPasswordUpper){
                            member.updatePwd({password:this.passwordUpper}).then(() => {
                                this.$router.replace({name:'keyboard',params:{type:'newFirstPassword'}})
                            }).catch(() => {})
                        }else {
                            MessageBox.alert("两次输入密码不一致")
                        }
                    }
                }
            },
            $route(to,from) {
                this.password = ''
                this.setNum()
            }
        }
        ,mounted() {
            this.enter = true
        }
        ,methods:{
            keyboardNums(n) {
                if(this.password.length < 6){
                    this.password += n
                }
            },
            keyboardBackspace() {
                this.password = this.password.slice(0,-1)
            },
            keyboardCancel() {
                this.show = !this.show
            },
            setNum() {
                let type = this.$route.params.type
                if(type == 'oldPassword'){
                    this.title = "请输入原来的支付密码验证身份"
                }else if(type == "newFirstPassword"){
                    this.title = "请输入新的支付密码"
                }else if(type == "newPassword"){
                    this.title = "请再次输入以确认"
                }
                let arr = shuffle(Array.apply(null, { length: 10 }).map((v, i) => i))// 创建数组并重新排序
                arr = chunk(arr,3)// 3元素分割数组
                this.lastNum = arr.pop()[0]
                this.nums = arr
            }
        }
        ,components:{}
    }
</script>
