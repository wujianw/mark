<template>
    <div class="shop-list-el">
        <div class="position-wrap flex-center">
            <div class="position flex-center">
                <i class="icon icon-position"></i>
                <span>新东方国际炒菜中心</span>
                <i class="icon icon-arrow-right"></i>
            </div>
        </div>
        <nav class="flex-space">
            <div class="nav-sort flex-center">区县<i class="icon icon-pull-down"></i></div>
            <div class="nav-sort flex-center">分类<i class="icon icon-pull-down"></i></div>
            <div class="nav-sort flex-center">排序<i class="icon icon-pull-down"></i></div>
        </nav>
        <div>
            <shop-block></shop-block>
        </div>
    </div>
</template>
<style lang="scss" rel="stylesheet/scss">
    .shop-list-el{
        .position-wrap{height:72px;}
        .position{
            padding:0 .5em;
            border-radius:18px;
            background:rgba(95,95,96,.5);
            line-height: 36px;
            font-size:20px;
            color:#fff;
            i{font-size:20px;}
        }
        nav{
            background:#fff;
            text-align:center;
            border:1px solid #e5e5e5;
            .nav-sort{
                height:80px;
                flex-grow:1;
                border-right:1px solid #e5e5e5;
                font-size:28px;
                color:#505050;
                &:last-of-type{border:none;}
                i{font-size:16px;}
            }
        }
    }
</style>
<script type="text/babel">
    import shopBlock from './shopBlock'
    export default {
        data() {
            return {}
        }
        ,components:{
            shopBlock
        }
    }
</script>
