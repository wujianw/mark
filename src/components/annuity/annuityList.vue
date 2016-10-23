<template>
    <div>
        <div class="annuity-title flex-end">
            <div class="title">累计养老金</div>
            <div class="gold">200.00</div>
        </div>
        <div class="annuity-query-condition flex-space">
            <input class="active" type="button" value="累计获得">
            <input class="" type="button" value="近一周">
            <input class="" type="button" value="近一月">
        </div>
        <annuity-block></annuity-block>
        <annuity-block></annuity-block>
        <annuity-block></annuity-block>
    </div>
</template>
<style lang="scss">

    /* 主题栏 */
    .annuity-title{
        flex-direction: column;
        height:264px;
        font-family:"Microsoft YaHei";
        .gold{
            padding:42px 0 60px;
            font-size:72px;
            color:#e85453;
            &:after{content:"元";font-size:27px;color:#373737;}
        }
        .title{font-size:26px;color:#afafaf;}
    }
    /* 查询条件 */
    .annuity-query-condition{
        height:64px;
        align-items:stretch;
        input{
            width:248px;
            border:none;

            background:#e0dedf;
            font-size:28px;
            color:#505050;
        }
        input.active{background:#e55451;color:#fff;}
    }
</style>
<script type="text/babel">
    import annuityBlock from './annuityBlock'
    export default {
        data() {
            return {}
        }
        ,components:{
            annuityBlock
        }
    }
</script>