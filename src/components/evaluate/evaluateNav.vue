<template>
    <div class="evaluate-nav-el">
        <nav class="flex-space evaluate-nav">
            <router-link tag="p" :to="{name:'evaluateList',query:{}}" class="active">全部<span>(23)</span></router-link>
            <router-link tag="p" :to="{name:'evaluateList',query:{}}" class="">晒图<span>(23)</span></router-link>
            <router-link tag="p" :to="{name:'evaluateList',query:{}}" class="">低分<span>(23)</span></router-link>
            <router-link tag="p" :to="{name:'evaluateList',query:{}}" class="">最新<span></span></router-link>
        </nav>
        <router-view></router-view>
    </div>
</template>
<style lang="scss" rel="stylesheet/scss">
    .evaluate-nav-el{
        .evaluate-nav{
            background: #fff;
            text-align: center;
            font-size:28px;
            line-height:80px;
            p{
                width:25%;
                color: #505050;
                border-bottom: 5px solid #afafaf;
            }
            .active{
                color: #e85453;
                border-bottom: 5px solid #e85453;

            }
            span{
                font-size: 22px;
            }
        }
    }

</style>
<script type="text/babel">
    export default{
        data() {
            return {}
        }
        ,components: {
        }
    }
</script>
