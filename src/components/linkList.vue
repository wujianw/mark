<template>
    <router-link :to="to" tag="div" class="flex-space link-li">
        <div class="title-name flex-space" :data-text="title">
            <i v-if="icon.iconClass" class="icon" :class="icon.iconClass" :style="styleObj"></i>
        </div>
        <div class="link-details" :data-text="details">
            <i class="icon icon-arrow-right" v-if="arrow"></i>
        </div>
    </router-link>
</template>
<style lang="scss" rel="stylesheet/scss">
    .link-li{
        height:89px;
        padding:0 20px;
        border-bottom:1px solid #f2f2f2;
        background:#fff;
        cursor:pointer;
        font-family:"Microsoft Yahei";
        &:active{background:#fff;}
        .title-name{
            color:#373737;
            i{font-size:38px;padding:0 12px;}
            &:after{content:attr(data-text);line-height:38px;font-size:26px;}
        }
        .link-details{
            font-size:26px;
            i{font-size:22px;}
            &:before{content:attr(data-text);}
        }
    }
</style>
<script type="text/babel">
    /*
     *@params {title:"标题",icon:"小图标",to:"url",details:"状态说明"}
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
            title:{
                type:String,
                default:''
            },
            icon:{
                type:Object,
                default: function() {
                    return {
                        iconClass:'',
                        color:'#505050'
                    }
                }
            },
            to:{
                type:Object,
                default:function() {
                    return {}
                }
            },
            details:[String, Number],
            arrow:{
                type:Boolean,
                default:true
            }
        }
    }
</script>
