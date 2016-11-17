<template>
    <div>
        <div v-infinite-scroll="pushData" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
            <template v-if="isChit">
                <order-chit v-for="item in chitOrder" :obj="item"></order-chit>
            </template>
            <template v-else>
                <order-scan v-for="item in scanOrder" :obj="item"></order-scan>
            </template>
        </div>
    </div>
</template>
<style lang="scss" rel="stylesheet/scss">
</style>
<script type="text/babel">
    import orderChit from './orderChit'
    import orderScan from './orderScan'
    import member from '../../api/member'
    import { mapGetters } from 'vuex'
    export default {
        data() {
            return {
                busy:true //无限加载开关 true:关闭
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
            isChit() {
                return this.$route.params.type == 'chit'
            }
        }
        ,components:{ orderScan,orderChit }
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
                    this.busy = this.chit
                }else{
                    this.busy = this.scan
                }
            }
        }
    }
</script>
