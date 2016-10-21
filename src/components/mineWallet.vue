<template>

    <div class="wallet-head">
        <div class="wallet-headview">
<<<<<<< HEAD
            <div class="wallet-title">当前余额(元)</div>
            <div class="wallet-wallet">0.00</div>
            <div class="wallet-lookDetals">
                <ol class="flex-space">
                    <li class="wallet-greementtext">我已经阅读并同意使用相关政策</li>
                    <li class="lookDdetalsText">查看详情</li>
                </ol>

            </div>
        </div>
        <div class="list-link-wallet" v-for="items in linkList">
            <link-list v-for="item in items" :title="item.title" :icon="item.icon" :to="item.to"></link-list>
        </div>

        <div class="wallet-hint">提示:积分宝平台不限制支付金额,如果微信或支付宝提示订单超过单笔限额,请核实您的账户及网银的每日消费限额.</div>

        <!--<rooter-link></rooter-link>-->

=======
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
>>>>>>> 7c6bba66ebdc46888a8e7b270da403a03b171902
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
<<<<<<< HEAD
        padding-top: 40px;

        padding-left: 26px;
=======
>>>>>>> 7c6bba66ebdc46888a8e7b270da403a03b171902

    }
    .wallet-wallet{
        font-size: 72px;
<<<<<<< HEAD
        padding-left: 26px;
        margin-top: 50px;
=======
>>>>>>> 7c6bba66ebdc46888a8e7b270da403a03b171902
    }

    /*  头部协议部分  */
    .wallet-lookDetals{

<<<<<<< HEAD
        box-sizing: border-box;
        margin-top: 30px;
=======

        margin-top: 118px;
>>>>>>> 7c6bba66ebdc46888a8e7b270da403a03b171902
        height: 56px;
        background: #2b2a2a;
        width: 100%;

    }

<<<<<<< HEAD
    .wallet-greementtext{
        padding-top: 20px;


    }
    .lookDdetalsText{

        padding-top: 20px;
        padding-right: 50px;
    }


    /*列表table*/
    .list-link-wallet {

        border-top: 18px solid #f2f2f2;

    }

    .wallet-hint{
        margin-top: 10px;
        font-size: 20px;
        color: #bbbbbb;
        line-height: 23px;
=======



    /*列表table*/
    .list-link-wallet{
        border-top:18px solid #f2f2f2;
    &:last-of-type{padding-bottom:102px;}
>>>>>>> 7c6bba66ebdc46888a8e7b270da403a03b171902
    }


</style>
<script type="text/babel">
    import linkList from './linkList'
    export default{
        data(){
            return {
<<<<<<< HEAD
                linkList:{

                    one:{
=======
                lists:{
                    trade:{
>>>>>>> 7c6bba66ebdc46888a8e7b270da403a03b171902
                        redPacked:{
                            title:"现金红包",
                            icon:{
                                iconClass:'icon-password'
                            },
<<<<<<< HEAD
                            to: {name: 'redMoney' },
=======
                            to: {name: 'loadMobile' },
>>>>>>> 7c6bba66ebdc46888a8e7b270da403a03b171902
                            details:"0.00"
                        },integral:{

                            title:"积分",
                            icon:{
                                iconClass:'icon-password'
                            },
<<<<<<< HEAD
                            to: {name: 'income' },
                            details:"0"

                        }
                    },two:{
                        seting:{

                            title:"支付设置",
                            icon:{
                                iconClass:'icon-password'
                            },
                            to: {name: 'walletSet' },

                         }
                        }
                    }
            }
=======
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


>>>>>>> 7c6bba66ebdc46888a8e7b270da403a03b171902
        }
        , components: {
            linkList
        }
    }
</script>
