<template>
    <div class="shop-message-el">
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
                rows:[]
            }
        }
        ,beforeRouteEnter (to,from,next) {
            let senderId = to.query.senderId
            next(vm => {
                member.getUsermessage({senderId}).then(val => {
                    vm.rows = val.rows
                })
            })
        }

        , components: {messageItem}
    }
</script>
