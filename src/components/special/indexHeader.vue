<template>
    <div class="flex-space header-container">
        <p class="area">{{prefix}}</p>
        <input-text class="search" placeholder="输入商品/商家搜索" :icon="icon"></input-text>
    </div>
</template>
<style lang="scss">
    .header-container{
        padding-left: 13px;
        padding-right: 13px;
        font-size:26px;
        line-height: 55px;
        background: rgba(102,104,109,.8);
        .search{
            flex:2;
            height:46px;
            .input{background:rgba(162,164,169,.6)}
            input{background:transparent;}
        }
        .area{
            white-space:nowrap;
            text-overflow:ellipsis;
            -o-text-overflow:ellipsis;
            overflow:hidden;
            width: 7em;
            color: #fff;
        }
    }
</style>
<script>
    import inputText from "../inputText.vue"
    export default {
        data() {
            return {
                icon:{iconClass:'icon-big'}
            }
        }
        ,components:{
            inputText
        }
        ,props: {
            prefix:String
        }
    }
</script>
