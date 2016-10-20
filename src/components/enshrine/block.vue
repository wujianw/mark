<template>
    <transition name="left">
        <router-link tag="div" :to="{name:''}" class="enshrine-block-el flex-space" :class="{'good-block':isGood}" v-show="isVisible">
            <div class="flex-start">
                <div class="pic"><img src="../../../static/img/good-pic.jpg" alt=""></div>
                <slot></slot>
            </div>
            <div>
                <div class="btn-wrap">
                    <div class="btn flex-center">
                        <div @click="offEnshrine">取消收藏</div>
                        <router-link tag="div" :to="{name:''}" class="in" :class="{'in-shop':isGood}"></router-link>
                    </div>
                    <i class="icon" :class="[isGood ? 'icon-more' : 'icon-information']"></i>
                </div>
            </div>
        </router-link>
    </transition>
</template>
<style lang="scss">
    .enshrine-block-el{
        height:170px;
        padding:0 34px 0 12px;
        border-top:1px solid #f2f2f2;
        background:#fff;
        .btn-wrap{
            position:relative;
            i{font-size:40px;color:#aeaeae;}
            .btn{
                display:none;
                position: absolute;
                right:40px;
                height:40px;
                border-radius:.3em;
                background:#afafaf;
                text-align: center;
                font-size:26px;
                color:#fff;
                div{ width:5em; }
                .in{
                    display:none;
                    position:relative;
                    border-left:1px solid #f2f2f2;
                    &:after{position:absolute;right:-0.25em;width:.5em;height:.5em;background:#fff;}
                }
                .in-shop{
                    display:block;
                    &:before{content:"进入店铺";}
                }

            }
            &:hover .btn{display:flex;}
        }
        &.good-block{
            .pic{
                width:140px;
                height:140px;
            }
        }
        .pic{
            width:225px;
            height:144px;
            img{width:100%;height:100%;}
        }
    }
</style>
<script type="text/babel">
    export default{
        data(){
            return{
                isVisible:true
            }
        }
        ,methods:{
            offEnshrine(event) {
                this.isVisible = false;
            }
        }
        ,props:{
            isGood:{
                type:Boolean,
                default:false
            }
        }
    }
</script>
