<template>
    <div class="mine-wallet-el">
        <router-link :to="{name:'income'}" tag="header" class="head" >
            <div class="title">当前余额(元)</div>
            <div class="gold">{{details.cashBalance}}</div>
        </router-link>
        <router-link :to="{name:'agreement'}" class="wallet-agreement flex-space"><span>查看详情</span></router-link>
        <div class="list-link-wallet">
            <link-list v-for="item in redPack" :title="item.title" :icon="item.icon" :to="item.to" :details="item.details" :arrow="!item"></link-list>
        </div>
        <div class="list-link-wallet">
            <link-list :title="setting.title" :icon="setting.icon" :to="setting.to" :details="setting.details"></link-list>
        </div>
        <div class="wallet-hint">提示:商桥平台不限制支付金额,如果微信或支付宝提示订单超过单笔限额,请核实您的账户及网银的每日消费限额.</div>
    </div>
</template>
<style lang="scss" rel="stylesheet/scss">

    .mine-wallet-el{
        .head{
            padding:0 38px;
            height: 218px;
            background: #383b3d;
            color: #fff;
            .title{
                padding: 20px 0 10px;
                line-height:2;
                font-size: 26px;
            }
            .gold{
                line-height:2;
                font-size: 72px;
            }
        }
    }

    /*  头部协议部分  */
    .wallet-agreement{
        padding:0 38px;
        height: 56px;
        background: #2b2a2a;
        font-size:22px;
        color:#fff;
        &:before{
            content:"我已经阅读并同意使用相关政策";
        }
    }
    /*列表table*/
    .list-link-wallet {
        border-top: 18px solid #f2f2f2;
        .link-li{
            height:98px;
            padding:0 38px 0 18px;
            .title-name{
                color:#373737;
                i{font-size:48px;}
            }
            .link-details{
                font-size:20px;
                &:before{color:#e85352;}
            }
        }
    }
    .wallet-hint{
        padding: 10px;
        line-height: 1.3;
        font-size: 20px;
        color: #bbb;
    }
</style>
<script type="text/babel">
    import linkList from '../linkList'
    import member from "../../api/member"
    import { mapGetters } from 'vuex'
    export default {
        data() {
            return {
                redPack:{
                    redPacked:{
                        title:"现金红包",
                        icon:{
                            color:'#fe7d5b',
                            iconClass:'icon-red-pack'
                        },
                        to: {name: 'redMoney' },
                        details:0
                    }
                    ,integral: {
                        title:"积分",
                        icon:{
                            color:'#fdb600',
                            iconClass:'icon-integral'
                        },
                        to: {name:"" },
                        details:0
                    }
                },
                setting:{
                    title:"支付设置",
                    icon:{
                        color:'#4cc99a',
                        iconClass:'icon-setting'
                    },
                    to: {name: 'walletSet' },
                },
                details:{
                    cashBalance:''
                    ,redBalance:''
                    ,totalearn:''
                }
            }
        }
        ,computed: {
            ...mapGetters({
                getToken:'getToken'
            })
        }
        ,watch:{
            details() {
                this.redPack.redPacked.details = this.details.redBalance
                this.redPack.integral.details = this.details.totalearn
            }
        }
        ,created() {
            let self = this
            member.getwelletHome(this.getToken).then(val => {
                self.details = val
            })
        }
        ,components: {
            linkList
        }
    }
</script>
