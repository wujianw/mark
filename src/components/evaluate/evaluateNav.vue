<template>
    <div class="evaluate-nav-el">
        <nav class="flex-space evaluate-nav">
            <router-link tag="p" :to="{name:'evaluateList',params:{mode:0},query:{goodsId,merchantId}}" replace active-class="active">全部<span>({{evaluate.countAll}})</span></router-link>
            <router-link tag="p" :to="{name:'evaluateList',params:{mode:1},query:{goodsId,merchantId}}" replace active-class="active">已回复<span>({{evaluate.countIsReply}})</span></router-link>
            <router-link tag="p" :to="{name:'evaluateList',params:{mode:2},query:{goodsId,merchantId}}" replace active-class="active">未回复<span>({{evaluate.countNoReply}})</span></router-link>
            <router-link tag="p" :to="{name:'evaluateList',params:{mode:3},query:{goodsId,merchantId}}" replace active-class="active">低分<span>({{evaluate.countDownScore}})</span></router-link>
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
                flex-grow: 1;
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
    import { mapGetters } from 'vuex'
    export default{
        data() {
            return {
                goodsId:''
                ,merchantId:''
            }
        },
        computed:{
            ...mapGetters({
                evaluate:'evaluateCount',
            })
        },
        created() {
            this.goodsId = this.$route.query.goodsId || ''
            this.merchantId = this.$route.query.merchantId || ''
        }
    }
</script>
