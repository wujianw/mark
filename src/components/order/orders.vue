<template>
    <div>
        <div ref="more" v-infinite-scroll="pushData" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
            <order v-for="item in lists" :obj="item" :key="item.id"></order>
        </div>
    </div>
</template>
<style lang="scss" rel="stylesheet/scss">
</style>
<script type="text/babel">
    import order from './order'
    import member from '../../api/member'
    import { mapGetters } from 'vuex'
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
                ,lists:null
                ,busy:true //无限加载开关 true:关闭
            }
        }
        ,computed: {
            ...mapGetters({
                chitOrder:'chitOrder',
                scanOrder:'scanOrder',
                chitOrderChange:'chitOrderChange',
                scanOrderChange:'scanOrderChange',
                chit:'chit',
                scan:'scan'
            }),
        }
        ,components:{
            order
        }
        ,created(){
            this.fetchData()
        }
        ,watch: {
            $route(){
                this.fetchData()
            }
        }
        ,methods:{
            /*
             * fetch order data
             * @param   function
             * @option
             */
            fetchData(rows=10) {
                let self = this,
                    type = self.$route.params.type;
                self.busy = true
                let off = type == "chit"
                if(off ? self.chitOrderChange : self.scanOrderChange){
                    self.$store.dispatch('fetchOrder',{type,rows}).then(() => {
                        self.mold(off)
                    })
                }else{
                    self.mold(off)
                }
            },
            /*
             * push order data for infinite update
             * @param   function
             * @option
             */
            pushData(rows=10) {
                let self = this,
                    type = self.$route.params.type;
                self.busy = true
                let off = type == "chit"
                self.$store.dispatch('pushOrder',{type,rows}).then(() => {
                    self.mold(off)
                })
            },
            mold(off) {
                if(off){
                    this.lists = this.chitOrder
                    this.busy = this.chit
                }else{
                    this.lists = this.scanOrder
                    this.busy = this.scan
                }
            }
        }
    }
</script>
