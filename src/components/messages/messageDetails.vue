<template>
    <div class="big-view">
        <div>
            <div class="message-title">
                <h3>{{details.msgTitle}}</h3>
            </div>
            <div class="flex-space message-details">
                <div class="message-time">{{details.msgPushDate}}</div>
                <div class="message-menber">{{details.author}}</div>
            </div>
        </div>
        <div class="message-count" v-html="details.msgDetail"></div>
   </div>
</template>
<style lang="scss" rel="stylesheet/scss">
    .big-view{
            background-color: #ffffff;
            padding-left: 13px;
            padding-right: 13px;
            padding-top: 13px;
            padding-bottom: 13px;
        }
    .message-title{
        font-size: 17px;
        color: #505050;
    }
    .message-details{
        padding-top: 13px;
        padding-bottom: 13px;
        .message-time{
            color: #afafaf;
        }
        .message-menber{
            color: #00ce9a;
        }

    }

</style>
<script type="text/babel">
    import member from "../../api/member"
    import { mapGetters } from 'vuex'
    export default{
        data(){
            return {
                details:{
                    msgTitle:""
                    ,author:""
                    ,msgPushDate:""
                    ,msgDetail:""
                }
            }
        }
        ,computed: {
            ...mapGetters({
                getToken:'getToken'
            })


        }
        ,beforeRouteEnter (to,from,next) {
            let msgId = to.query.msgId
            console.log(msgId)
            next(vm => {
                member.getMessageDetails({msgId}).then(val => {
                    vm.details = val

                    console.log(JSON.stringify(vm.details))
                })
            })


        }
        , components: {

        }
    }
</script>
