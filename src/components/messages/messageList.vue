<template>
    <div class="message">
        <router-link :to="{name:'shopAllMessage',query:{senderId:item.senderId}}" v-for="item in details" :details="item" class="flex-start message-list">
            <div class="message-logo">
                <img :src="item.groupLogo">
            </div>
            <div class="lint">{{item.unMessageNum}}</div>
            <div class="count">
                <div class="flex-space title-time">
                    <div class="title">{{item.uName}}</div>
                    <div class="time">{{item.msgPushDate}}</div>
                </div>
                <div class="message">{{item.msgTitle}}</div>

            </div>
        </router-link>
    </div>
</template>
<style lang="scss" rel="stylesheet/scss">

    .message{
        padding-top: 18px;
    }
    .message-list{


        height: 120px;
        background: #fff;
        border-bottom: 1px solid #f2f2f2;
        padding-left: 22px;
        .message-logo{

            height: 76px;
            width: 76px;
            background: grey;
            border-radius:5px;
            img{width:100%;height:100%; border-radius:5px;}

        }
        .lint{
            width: 35px;
            height: 35px;
            border-radius:50%;
            background: #e85352;
            color: #fff;
            text-align: center;
            font-size: 18px;
            line-height: 35px;
            margin-top: -75px;
            margin-left:-15px;

        }
        .count{
            flex-grow: 1;
            height: 76px;
            padding-left: 59px;
            padding-right: 20px;
            .title{
                color: #505050;
                font-size:30px;
                padding-top: 3px;
            }
            .time{
                color: #838383;
                font-size:20px ;
            }
            .message{
                color: #afafaf;
                font-size:22px;
                padding-top: 15px;
            }
        }

    }



</style>
<script type="text/babel">
    import member from "../../api/member"
    import { mapGetters } from 'vuex'
    export default{
        data(){
            return {
                details:[]
            }
        }
        ,computed: {
            ...mapGetters({
                getToken:'getToken'
            })


        }
        ,beforeRouteEnter (to,from,next) {
            next(vm => {
                member.getReception().then(data => {
                    member.getMessage().then(val => {
                        vm.details = val
                    })
                })
            })


        }
        , components: {}
    }
</script>
