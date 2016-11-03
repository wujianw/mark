<template>
    <div>
        <link-list v-for="item in lists" :title="item.title" :to="item.to" ></link-list>
    </div>
</template>
<script type="text/babel">
    import linkList from '../linkList'
    export default{
        data(){
            return {
                lists:{
                    pwoSet:{
                        title:"支付密码",
                        to:{name:"walletPassword"}
                    } ,
                    service:{
                        title:"联系客服",
                        to:{name:"agreementDetails"}

                    },
                    about:{
                        title:"关于我的钱包",
                        to:{name:"agreementDetails"}

                    }
                }
            }
        }
        , components: {
            linkList
        }
    }
</script>
