<template>
    <div class="find-password-el">
        <input-rule type="password" placeholder="请输入您的手机号" v-model="originPassword"></input-rule>
        <div class="slide-wrap">
            <div class="slide" v-touch="{methods:touchMove}">&gt;&gt;</div>
        </div>
        <input-rule type="password" placeholder="请输入短信验证码" v-model="verifyPassword"></input-rule>
        <submit value="验证(1/2)" :dis="!dis" @commit="userSubmit"></submit>
    </div>
</template>
<style lang="scss">
    .find-password-el{
        padding:26px 22px;
        .slide-wrap{
            position:relative;
            background: #fff;
            height: 74px;
            .slide{
                position:absolute;
                left:0;
                width:74px;
                height:74px;
                background:red;
            }
        }
    }
</style>
<script type="text/babel">
    import inputRule from '../inputRule'
    import submit from '../submit'
    const touchStart = (e,self) => {
        var touches = e.touches[0];
        var tapObj = self.tapObj;
        tapObj.pageX = touches.pageX;
        tapObj.pageY = touches.pageY;
        tapObj.clientX = touches.clientX;
        tapObj.clientY = touches.clientY;
        self.time = +new Date();

    }
    const touchMove = (e,self) => {
        if(e.targetTouches.length > 1 || e.scale && e.scale !== 1) return;
        var tapObj = self.tapObj;
        var touch = e.changedTouches[0];
        var endPos = {x:touch.pageX - tapObj.pageX,y:touch.pageY - tapObj.pageY};
        var isScrolling = Math.abs(endPos.x) < Math.abs(endPos.y) ? 1:0;
        if(isScrolling === 0){
            event.preventDefault();      //阻止触摸事件的默认行为，即阻止滚屏
            console.log(1)
        }
    }
    const touchEnd = (e,self) => {
        var touches = e.changedTouches[0];
        var tapObj = self.tapObj;
        self.time = +new Date() - self.time;
        tapObj.distanceX = tapObj.pageX - touches.pageX;
        tapObj.distanceY = tapObj.pageY - touches.pageY;
        if (!isTap(self)){
            return
        }
        setTimeout(function () {
            self.handler(e);
        }, 150)
    }
    const isTap = (self) => {
        if (self.disabled) {
            return false;
        }
        var tapObj = self.tapObj;
        return self.time < 150 && Math.abs(tapObj.distanceX) < 2 && Math.abs(tapObj.distanceY) < 2;
    }
    export default{
        data(){
            return{
                originPassword:"",
                newPassword:"",
                verifyPassword:"",
                dis:false
            }
        }
        ,components:{
            inputRule,
            submit
        }
        ,directives:{
            touch:{
                bind: function (el, binding) {
                    var value = binding.value;
                    el.tapObj = {};
                    el.handler = function (e) { //This directive.handler
//                        if (!value && el.href && !binding.modifiers.prevent) {
//                            return window.location = el.href;
//                        }
                        value.event = e;
                        value.tapObj = el.tapObj;
                        value.methods.call(this, value);
                    };
                    el.addEventListener('touchstart', function (e) {
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
                        return touchMove(e, el);
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
                },
                update : function(fn) {
//                    var self = this
//                    self.tapObj = {}
//                    if(typeof fn !== 'function') {
//                        return console.error('The param of directive "v-tap" must be a function!')
//                    }
//                    self.handler = function(e) {
//                        e.tapObj = self.tapObj;
//                        fn.call(self,e);
//                    };
//                    this.el.addEventListener('touchstart',function(e) { self.touchstart(e,self); },false);
//                    this.el.addEventListener('touchmove',function(e) { self.touchmove(e,self); },false);
//                    this.el.addEventListener('touchend',function(e) { self.touchend(e,self); },false);
                },
                unbind : function() {

                }
            }
        }
        ,methods:{
            userSubmit() {
                //调用密码修改接口，成功后返回登入页面
            }
            ,touchStart(){

            }
            ,touchMove(event) {
                console.log(1)
            }
            ,touchEnd(event) {
                console.log(1)
            }
        }
        ,computed:{
            dis() {
                return this.originPassword && this.newPassword === this.verifyPassword && this.newPassword
            }
        }
    }
</script>

