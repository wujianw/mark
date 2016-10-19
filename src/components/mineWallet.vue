<template>

    <div class="wallet-head">
        <div class="wallet-headview">
            <div class="wallet-title">当前余额</div>
            <div class="wallet-wallet">0.00</div>
            <div class="wallet-lookDetals">
                <div class="wallet-greementtext">我已经阅读并同意使用相关政策</div>
                <div class="lookDdetalsText">查看详情</div>
            </div>
        </div>
        <div class="list-link-wallet">
            <link-list v-for="item in lists" :title="item.title" :icon="item.icon" :to="item.to" :details="item.details"></link-list>
        </div>
    </div>
</template>
<style lang="scss">

    /*头部视图*/
    .wallet-headview{

        height: 274px;
        background: #383b3d;

        color: white;


    }

    .wallet-title{
        font-size: 26px;

    }
    .wallet-wallet{
        font-size: 72px;
    }

    /*  头部协议部分  */
    .wallet-lookDetals{


        margin-top: 118px;
        height: 56px;
        background: #2b2a2a;
        width: 100%;

    }




    /*列表table*/
    .list-link-wallet{
        border-top:18px solid #f2f2f2;
    &:last-of-type{padding-bottom:102px;}
    }


</style>
<script type="text/babel">
    import linkList from './linkList'
    export default{
        data(){
            return {
                lists:{
                    trade:{
                        redPacked:{
                            title:"现金红包",
                            icon:{
                                iconClass:'icon-password'
                            },
                            to: {name: 'loadMobile' },
                            details:"0.00"
                        },integral:{

                            title:"积分",
                            icon:{
                                iconClass:'icon-password'
                            },
                            to: {name: 'loadMobile' },
                            details:"0"

                        }
                    },gold:{
                        seting:{

                            title:"设置",
                            icon:{
                                iconClass:'icon-password'
                            },
                            to: {name: 'loadMobile' },

                        }
                    }
                }
            }


        }
        , components: {
            linkList
        }
    }
</script>
