<template>
    <div class="success-el">
        <div class="success">
            <header class="success-hd">
                <h3>恭喜您支付成功</h3>
            </header>
        </div>
        <div class="information-wrap">
            <p>商品名称：{{goodsName}}</p>
            <p>订单状态：支付成功</p>
            <div class="btn-wrap flex-space">
                <router-link :to="{name:'nearbyHot'}" replace>继续购物</router-link>
                <router-link :to="{name:'user'}" replace>查看订单</router-link>
            </div>
        </div>
        <!--<div class="link-picword">-->
            <!--<p>查看其它特卖</p>-->
        <!--</div>-->
        <!--<ul class="main-unit-wrap clearfloat">-->
            <!--<good-item v-for="good in goods" :good="good"></good-item>-->
        <!--</ul>-->
    </div>
</template>
<script type="text/babel">
    import goodItem from "../special/favorGoodItem"
    export default{
        data() {
            return {
                goodsName:this.$route.query.goodsName
            }
        }
    }
</script>
<style lang="scss" rel="stylesheet/scss">
    .success-el{
        .success{text-align:center;position:relative;background:#fff;}
        .success:before {content:"";position: absolute;
            left: 0;bottom: 0; width: 100%;height: 0.25em;
            background:#fff;
            background: -webkit-linear-gradient(45deg, #f2f2f2 45%, #e3e3e3, transparent 55%, transparent 100%),-webkit-linear-gradient(315deg, #f2f2f2 45%, #e3e3e3, transparent 55%, transparent 100%);
            background: linear-gradient(45deg, #f2f2f2 45%, #e3e3e3, transparent 55%, transparent 100%),linear-gradient(315deg, #f2f2f2 45%, #e3e3e3, transparent 55%, transparent 100%);
            background-size: 0.5em 0.5em;
            background-repeat: repeat-x, repeat-x;}
        .success-hd{line-height:142px;color:#373737;font-family:"Microsoft Yahei";}
        .success-hd h3{font-size:30px;}
        .information-wrap{
            margin-top:18px;
            padding:0 20px;
            background:#fff;
            p{padding-top:30px;font-size:24px;color:#373737;}
            .btn-wrap{
                padding:40px 0;
                a{
                    width:345px;
                    border-radius:0.2em;
                    background:#e85350;
                    font-size:32px;
                    line-height:60px;
                    text-align:center;
                    color:#fff;
                }
            }
        }
        .link-picword{
            margin-bottom:18px;
            text-align:center;font:20px/58px "微软雅黑";color:#505050;background:#e3e3e3;
            background:linear-gradient(0deg,transparent 28px,#a4a4a4 1px,transparent 29px) top left,
            linear-gradient(0deg,transparent 28px,#a4a4a4 1px,transparent 29px) bottom right,
            linear-gradient(0deg,transparent 28px,transparent 1px,transparent 29px) center;
            background-size: 266px 100%;background-repeat:no-repeat;
        }
    }
</style>

