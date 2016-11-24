<template>
    <router-link :to="to" active-class="active" class="block-btn flex-center" :data-name="name">
        <i class="icon" :class="icon.iconClass" :style="styleObj"></i>
        <p class="num" :data-num="num"></p>
    </router-link>
</template>
<style lang="scss" rel="stylesheet/scss">
    .block-btn{
        position:relative;
        flex-direction:column;
        flex-grow:1;
        font-size:22px;
        i{font-size:38px;line-height:48px;color:#c4c4c4;}
        &:after{content:attr(data-name);line-height:1.5;color:#505050;}
        &.active{
            &:after{color:#e85352;}
            i{color:#e85352;}
        }
        p{
            position:absolute;
            top:0;
            left:55%;
            width:2em;
            text-align: center;
            line-height:2em;
            border-radius: 50%;
            background:#e85453;
            font-size:16px;
            color:#fff;
            &:before{content:attr(data-num)}
        }
    }
</style>
<script type="text/babel">
    /*
     *@params { name : "菜单名", icon, to: routerObj }
     */
    export default {
        data() {
            return {
                styleObj:{
                    color:this.icon.color
                }
            }
        }
        ,props:{
            name:String
            ,icon:{
                type:Object,
                default: function(){
                    return {
                        iconClass:'icon-waitPay',
                        color:'#c4c4c4'
                    }
                }
            }
            ,to: {
                type:Object,
                default: function() {
                    return {}
                }
            }
            ,num:{
                type:[String,Number],
                default:''
            }
        }
    }
</script>
