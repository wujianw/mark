<template>
    <div>
        <div class="annuity-title flex-end">
            <div class="title">累计养老金</div>
            <div class="gold">200.00</div>
        </div>
        <div class="annuity-query-condition"></div>
    </div>
</template>
<style lang="scss">
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
    .annuity-query-condition{
        height:64px;
    }
</style>
<script type="text/babel">
    export default {
        data() {
            return {}
        }
    }
</script>