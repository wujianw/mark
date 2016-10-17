<template>
    <div class="order-details-el">
        <good-block></good-block>
    </div>
</template>
<style lang="scss">
    .order-details-el{
        background:#fff;
    }
</style>
<script>
    import goodBlock from './goodBlock'
    export default{
        data(){
            return {}
        }
        , components: {
            goodBlock
        }
    }
</script>
