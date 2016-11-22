<template>

</template>
<style lang="scss" rel="stylesheet/scss">

</style>
<script>
    import inputText from "../inputText.vue"
    export default {
        data() {
            return {
                icon:{iconClass:'icon-big'}
            }
        }
        ,components:{
            inputText
        }
        ,props: {
            prefix:String
        }
    }
</script>
