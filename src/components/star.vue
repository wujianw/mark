<template>
    <span class="star-el">
        <i v-for="n in 5" class="icon icon-evaluate"
           :class="[n >= score + 1 ? 'no':'',n > score && n < score + 1 ? 'half-style' : '']"></i>
    </span>
</template>
<style lang="scss" rel="stylesheet/scss">
    .star-el {
        i {
            margin-right: 12px;
            color: #f9a929;
            font-size: 22px;
        }

        i.no {
            color: #e0dfdf;
        }
        span {
            padding-left: 2px;
        }
        /* 半个星星 */
        .half-style {
            position: relative;
            display: inline-block;
            width: 22px;
            font-size: 22px;;
            height: 18px;
            color: transparent;
            /*overflow:hidden;*/
            white-space: pre;
        }
        .half-style:before {
            display: block;
            z-index: 1;
            position: absolute;
            top: 0;
            width: 50%;
            /*overflow:hidden;*/
            color: #f9a929;
        }
        .half-style:after {
            display: block;
            direction: rtl;
            position: absolute;
            z-index: 2;
            top: 0;
            left: 50%;
            width: 50%;
            content: "\e622";
            overflow: hidden;
            color: #e0dfdf;
        }
    }
</style>
<script type="text/babel">
    export default{
        props:{
            score:{
                type:[Number,String],
                default:0
            }
        }
    }
</script>
