<template>
    <div>
        <nav class="order-nav-wrap">
            <nav :class="{active:isActive}" @click="navToggle">
                <div class="state icon" :class="isActive?'':'icon-pull-down-after'">全部</div>
                <div class="state">代金券</div>
                <div class="state">到店买单</div>
            </nav>
            <div class="btn">编辑</div>
        </nav>
        <order :details="details"></order>
    </div>
</template>
<style lang="scss" rel="stylesheet/scss">
    .order-nav-wrap{
        position:relative;
        height:72px;
        background:#fff;
        text-align: center;
        line-height:72px;
        font-size:28px;
        /*overflow: hidden;*/
        /*overflow: visible;*/
        nav{
            position:absolute;
            z-index: 2;
            width:100%;
            height:72px;
            overflow: hidden;
            background:#fff;
            transition: height 1s ease;
            &.active{height:365px;}
        }
        .btn{
            position:absolute;
            z-index: 3;
            right:22px;
            top:0;

            color:#fbc111;
        }
        .state{
            border-bottom:1px solid #f2f2f2;
            font-size:28px;
            color:#505050;
        }
        .icon-pull-down-after:after{font-size:16px;}
    }
</style>
<script type="text/babel">
    import order from './order'
    export default {
        data() {
            return {
                isActive:false
                ,details:{
                    to:{
                        name:'orderDetails',
                        params:{type:1}
                    }
                }
            }
        }
        ,components:{
            order
        }
        ,methods:{
            navToggle(){
                this.isActive = !this.isActive
            }
        }
    }
</script>
