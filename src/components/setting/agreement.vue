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
                        to:{name:"agreementDetails",query:{type:0}}
                    } ,agreementTwo:{
                        title:"《积分宝消费养老应用软件协议》",
                        to:{name:"agreementDetails",query:{type:1}}
                    },agreementThree:{
                        title:"《积分宝数据使用政策》",
                        to:{name:"agreementDetails",query:{type:2}}
                    },agreementFore:{
                        title:"《积分宝钱包协议》",
                        to:{name:"agreementDetails",query:{type:3}}
                    },agreementFive:{
                        title:"《积分宝消费养老投保协议》",
                        to:{name:"agreementDetails",query:{type:4}}
                    },agreementSix:{
                        title:"《积分宝消费养老商户服务协议》",
                        to:{name:"agreementDetails",query:{type:5}}
                    }

                }

//http://shop.jfb315.cn/api/open/apphelp/load.htm?type=0  协议链接  参数 type=rows
            }
        }
        ,components:{
            linkList
        }
    }
</script>
