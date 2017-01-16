<template>
    <transition name="wrap">
        <div class="keyboard-wrap-el">
            <div class="keyboard-wrap" v-show="show">
                <ul class="keyboard">
                    <li v-for="item in nums">
                        <a v-for="n in item" :key="n" @touchstart.stop="keyboardNums(n)">{{n}}</a>
                    </li>
                    <li>
                        <a class="cancel" @touchstart.stop="keyboardCancel">取消</a>
                        <a @touchstart.stop="keyboardNums(0)">0</a>
                        <a class="backspace"  @touchstart.stop="keyboardBackspace" ><i class="icon icon-backspace"></i></a>
                    </li>
                </ul>
            </div>
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
     * 数字键盘
     * @params
     */
    import chunk from 'lodash/chunk'
    export default{
        data(){
            return {
                lastNum:null,
                nums:[]

            }
        },
        created() {
            this.setNum()
        },
        methods:{
            setNum() {
                let arr = Array.apply(null, { length: 9 }).map((v, i) => i+1)
                arr = chunk(arr,3)// 3元素分割数组
                this.nums = arr
            },
            keyboardNums() {

            },
            keyboardCancel() {

            }
        },
        components: {}
    }
</script>
