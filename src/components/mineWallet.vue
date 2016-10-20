<template>

    <div class="wallet-head">
        <div class="wallet-headview">
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
        padding-top: 40px;

        padding-left: 26px;

    }
    .wallet-wallet{
        font-size: 72px;
        padding-left: 26px;
        margin-top: 50px;
    }

    /*  头部协议部分  */
    .wallet-lookDetals{

        box-sizing: border-box;
        margin-top: 30px;
        height: 56px;
        background: #2b2a2a;
        width: 100%;

    }

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
    }


</style>
<script type="text/babel">
    import linkList from './linkList'
    export default{
        data(){
            return {
                linkList:{

                    one:{
                        redPacked:{
                            title:"现金红包",
                            icon:{
                                iconClass:'icon-password'
                            },
                            to: {name: 'redMoney' },
                            details:"0.00"
                        },integral:{

                            title:"积分",
                            icon:{
                                iconClass:'icon-password'
                            },
                            to: {name: 'loadMobile' },
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
        }
        , components: {
            linkList
        }
    }
</script>
