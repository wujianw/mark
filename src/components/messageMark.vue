<template>
    <div class="mark-el">
        <slot></slot>
    </div>
</template>
<style lang="scss" rel="stylesheet/scss">
    .mark-el{
        padding:0 10px 0 25px;
        background:#f9a929;
        background:
            linear-gradient(135deg,transparent 15px , #f9a929 0) top left,
            linear-gradient(45deg,transparent 15px , #f9a929 0) bottom left;
        background-size:100% 56%;
        background-repeat:no-repeat;
        line-height:30px;
        color:#fff;
    }
</style>
<script type="text/babel">
    /*
     * 箭头标签组件
     * @params
     */
    export default{
        data(){
            return{

            }
        }
        ,components:{

        }
    }
</script>
