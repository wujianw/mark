<template>
    <div>
        <div v-infinite-scroll="more" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
            <template v-if="isChit">
                <order-chit v-for="item in chitOrder" :obj="item"></order-chit>
            </template>
            <template v-else>
                <order-scan v-for="item in scanOrder" :obj="item"></order-scan>
            </template>
        </div>
    </div>
</template>
<script type="text/babel">
    import orderChit from './orderChit'
    import orderScan from './orderScan'
    import member from '../../api/member'
    export default {
        data() {
            return {
                busy:false, //无限加载开关 true:关闭
                chitOrder:[],
                start:0,
                scanOrder:[]
            }
        }
        ,computed: {
            isChit() {
                return this.$route.params.type == 'chit'
            }
        }
        ,components:{ orderScan,orderChit }
        ,watch: {
            $route(){
                this.chitOrder=[]
                this.scanOrder=[]
                this.busy = true
                this.start = 0
                this.fetchData()
            }
        }
        ,methods:{
            fetchData(rows=10) {
                let self = this,
                    type = self.$route.params.type;
                let off = type == "chit",
                    start = this.start
                this.busy = true
                member.postOrder(type,{rows,start}).then(data => {
                    console.log(data)
                    if(data.rows.length){
                        off ? this.chitOrder.push(...data.rows) : this.scanOrder.push(...data.rows)
                        this.start += rows
                        this.busy = false
                    }else{
                        this.busy = true
                    }
                })
            },
            more() {
                this.busy = true
                this.fetchData()
            }
        }
    }
</script>
