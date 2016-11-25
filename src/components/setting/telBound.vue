<template>
    <div class="find-password-el">
        <mobile-code type="findPwd" :mobile="mobile" @mobileFn="mobile = arguments[0]" :vcode="vcode" @vcodeFn="vcode = arguments[0]">
            <div class="slide-wrap">
                <span class="message">按住滑块拖至最右</span>
                <div class="slide" v-touch="{methods:touchEnd}">
                    <div class="slide-block" >&gt;&gt;</div>
                </div>
            </div>
        </mobile-code>
        <submit class="" value="验证(1/2)" :dis="!dis" @commit="verify"></submit>
    </div>
</template>
<style lang="scss" rel="stylesheet/scss">
    .find-password-el{
        padding:26px 22px;
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
    import mobileCode from '../login/mobileCode'
    import submit from '../submit'
    import MessageBox from '../../msgbox';
    const touchStart = (e,self) => {
        var touches = e.touches[0];
        var tapObj = self.tapObj; // 引用类型赋值
        tapObj.pageX = touches.pageX;
        tapObj.pageY = touches.pageY;
        self.time = +new Date();

    }
    const touchMove = (e,self) => {
        if(e.targetTouches.length > 1 || e.scale && e.scale !== 1) return;
        var tapObj = self.tapObj;
        var touches = e.changedTouches[0];
        tapObj.distanceX = touches.pageX - tapObj.pageX;
        e.preventDefault();
        if(tapObj.width == 706){
            return false
        }
        tapObj.width = Math.ceil(148 + tapObj.distanceX)
        if(tapObj.width < 74 ){
            self.style.width = 74 + 'px';
        }else if ( tapObj.width > 710){
            tapObj.width = 706
            self.style.width = 706 +'px';
        }else {
            self.style.width = tapObj.width + 'px';
        }
    }
    const touchEnd = (e,self) => {
        var tapObj = self.tapObj;
        self.time = +new Date() - self.time;
        if (self.disabled || tapObj.width < 700){
            setTimeout(function () {
                self.style.width = 148+'px';
            }, 150)
        }else{
            setTimeout(function () {
                self.handler(e);
            }, 150)
        }
    }
    export default{
        data(){
            return{
                mobile:"",
                vcode:"",
                actionCode:false
            }
        }
        ,components:{
            mobileCode,
            submit
        }
        ,directives:{
            touch:{
                bind: function (el, binding) {
                    var value = binding.value;
                    el.tapObj = {};
                    el.handler = function (e) { //This directive.handler
                        value.event = e;
                        value.tapObj = el.tapObj;
                        value.methods.call(this, value);
                    };
                    el.addEventListener('touchstart', function (e) {
                        Object.defineProperties(e, { // 重写currentTarget对象 与jq相同
                            "currentTarget": {
                                value: el,
                                writable: true,
                                enumerable: true,
                                configurable: true
                            },
                        });
                        if (binding.modifiers.stop) e.stopPropagation()
                        if (binding.modifiers.prevent) e.preventDefault()
                        touchStart(e, el);
                    }, false);
                    el.addEventListener('touchmove', function (e) {
                        Object.defineProperties(e, { // 重写currentTarget对象 与jq相同
                            "currentTarget": {
                                value: el,
                                writable: true,
                                enumerable: true,
                                configurable: true
                            },
                        });
                        e.preventDefault();
                        touchMove(e, el);
                    }, false);
                    el.addEventListener('touchend', function (e) {
                        Object.defineProperties(e, { // 重写currentTarget对象 与jq相同
                            "currentTarget": {
                                value: el,
                                writable: true,
                                enumerable: true,
                                configurable: true
                            },
                        });
                        e.preventDefault();
                        return touchEnd(e, el);
                    }, false);
                }
            }
        }
        ,methods:{
            touchEnd(){
                this.actionCode = true
            }
            ,verify(){
                console.log(this.mobile+','+this.vcode)
                this.$http.get('/api/open/member/find_pwd2.json',{params:{"mobile":this.mobile,"vcode":this.vcode}})
                    .then(res => {
                        let data = JSON.parse(res.data)
                        if(data.code == 0){
                            this.$router.push({name:'setPassword',params:{"mobile":this.mobile,"vcode":this.vcode}})
                        }else{
                            MessageBox.alert(data.message)
                        }
                    })
            }

        }
        ,computed:{
            dis() {
                return this.mobile.match(/^1+\d{10}$/) && this.vcode.match(/^\d{4}$/) && this.actionCode
            }
        }
    }
</script>

