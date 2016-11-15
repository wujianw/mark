<template>
    <div>
        <iframe class="iframe" :src="url" :style="styleObj" width="750" frameborder="0"></iframe>
    </div>
</template>
<style lang="scss" rel="stylesheet/scss">
</style>
<script type="text/babel">
    export default{
        data(){
            return {
                url:'',
                styleObj:{

                }
            }
        }
        ,created() {
            document.title = this.$route.query.title
            this.url = '/api/open/apphelp/load.htm?type='+this.$route.query.type
            this.styleObj = {
                height:document.documentElement.clientHeight+'px'
            }
        }
        , components:{}
    }
</script>
