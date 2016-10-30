<template>
    <div class="chit-list-el">
        <chit-block chitNum="565654165454564" date="2016-05-02"></chit-block>
        <chit-block chitNum="565654165454564" date="2016-05-02"></chit-block>
        <div ref="more" v-infinite-scroll="more" infinite-scroll-disabled="busy" infinite-scroll-distance="10">

        </div>
    </div>
</template>
<style lang="scss" rel="stylesheet/scss">
    .chit-list-el{
        padding:0 17px;
    }
</style>
<script type="text/babel">
    import chitBlock from "./chitBlock"
    export default{
        data(){
            return{
                busy: false
            }
        }
        ,components:{
            chitBlock
        }
        ,methods:{
            more() {
                var self = this;
                self.busy = true;
                var app = self.$refs.more
                console.log('loading... ' + new Date());
                setTimeout(() => {
                    var height = app.clientHeight;
                    app.style.height = height + 300 + 'px';
                    console.log('end... ' + new Date());
                    self.busy = false;
                }, 1000);
            }
        }
        ,beforeDestroy(){
            console.log(121212121212)
        }
    }
</script>
