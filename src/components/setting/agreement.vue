<template>
    <div>
        <link-list v-for="item in lists" :title="item.title" :to="item.to" ></link-list>
    </div>
</template>
<style lang="scss" rel="stylesheet/scss">

</style>
<script>
    import linkList from './../linkList'
    export default{
        data(){
            return{
                lists:{
                    agreementOne:{
                        title:"《积分宝消费养老用户服务协议》",
                        to:{name:"agreementDetails",query:{title:"《积分宝消费养老用户服务协议》",type:7}}
                    } ,agreementTwo:{
                        title:"《积分宝消费养老应用软件协议》",
                        to:{name:"agreementDetails",query:{title:"《积分宝消费养老应用软件协议》",type:8}}
                    },agreementThree:{
                        title:"《积分宝数据使用政策》",
                        to:{name:"agreementDetails",query:{title:"《积分宝数据使用政策》",type:6}}
                    },agreementFore:{
                        title:"《积分宝钱包协议》",
                        to:{name:"agreementDetails",query:{title:"《积分宝钱包协议》",type:2}}
                    },agreementFive:{
                        title:"《积分宝消费养老投保协议》",
                        to:{name:"agreementDetails",query:{title:"《积分宝消费养老投保协议》",type:5}}
                    },agreementSix:{
                        title:"《积分宝消费养老商户服务协议》",
                        to:{name:"agreementDetails",query:{title:"《积分宝消费养老商户服务协议》",type:1}}
                    }

                }

            }
        }
        ,components:{
            linkList
        }
    }
</script>
