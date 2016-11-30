<template>
    <div class="shop-message-el" v-infinite-scroll="more" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
        <message-item v-for="item in rows" :obj="item"></message-item>
    </div>
</template>
<style lang="scss" rel="stylesheet/scss">
    .shop-message-el{
        background: #f2f2f2;
        padding:0 15px 105px;
    }
</style>

<script type="text/babel">
    import member from "../../api/member"
    import messageItem from "./messageItem"
    export default{
        data(){
            return {
                busy:false,
                start:0,
                rows:[]
            }
        },
        beforeRouteLeave(to,from,next) {
            this.$destroy()
            next()
        },
        methods:{
            fetchData(rows=10) {
                let senderId = this.$route.query.senderId
                member.getUsermessage({senderId,rows,start:this.start}).then(data => {
                    this.start += rows
                    this.rows.push(...data.rows)
                    this.busy = data.rows.length != rows
                })
            },
            more() {
                this.busy = true
                this.fetchData()
            }
        },
        components: {messageItem}
    }
</script>
