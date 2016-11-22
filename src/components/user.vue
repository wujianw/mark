<template>
    <div class="user-center-wrap">
        <div class="user-center flex-space">
            <div class="flex-space">
                <div class="hd-pic"><img src="../../static/img/hd-pic.png" alt=""/></div>
                <div class="nickname-wrap">
                    <div class="nickname">微信昵称/会员名称</div>
                    <div>养老金：&nbsp<span class="annuity">{{annuity | gold}}</span></div>
                </div>
            </div>
            <div>
                <router-link :to="{name:'userInformation',query:{token:1}}">
                    <span class="link-details">完善信息<i class="icon icon-arrow-right"></i></span>
                </router-link>
            </div>
        </div>
        <div class="flex-space-around consumption">
            <block-btn v-for="item in shopTrade" :icon="item.icon" :name="item.name"></block-btn>
        </div>
        <div class="list-link-wrap" v-for="items in linkList">
            <link-list v-for="item in items" :title="item.title" :icon="item.icon" :to="item.to"></link-list>
        </div>
    </div>
</template>
<style lang='scss' rel="stylesheet/scss">
    $userColor: #505050;
    $annuityColor: #e85352;
    $waitColor: #c4c4c4;
    $smFontSize: 22px;
    $statusFontSize: 22px;
    $fontSize: 24px;
    .user-center-wrap{
        background:#f2f2f2;
        color:$userColor;
        /* 个人信息&背景 */
        .user-center {
            height: 222px;
            padding: 0 24px;
            background: url("../assets/img/user-center.png") no-repeat;
            background-size: 100% 100%;
        }
        /* 头像--图片 */
        .hd-pic {
            height: 110px;
            width: 110px;
            padding: 0 8px;
            border-radius:50%;
            img{
                width:100%;
                height:100%;
            }
        }

        /* 昵称&养老金 */
        .nickname-wrap {
            padding-left:38px;
            line-height:$smFontSize + $fontSize;
            font-size:$smFontSize;
            .annuity{
                font-size:$fontSize;
                color:$annuityColor;
                &:after {
                    content: "元";
                }
            }
            .nickname{font-size:$fontSize;}
        }

        /* 箭头样式 */
        .link-details{
            font-size:$smFontSize;
            color:$userColor;
            i{font-size:$smFontSize;}
        }

        /* 购物状态--- link to list */
        .consumption{
            background:#fff;
            height:135px;
        }

        /* 会员中心li--- link to details */
        .list-link-wrap{
            border-top:18px solid #f2f2f2;
            &:last-of-type{padding-bottom:102px;}
        }
    }
</style>
<script>
    import linkList from "./linkList.vue"
    import blockBtn from "./blockBtn.vue"
    export default{
        data(){
            return{
                annuity : 0.00
                ,linkList: {
                    trade: {
                        order:{
                            title:"全部订单",
                            icon:{
                                iconClass:'icon-orders',
                                color:'#fe7c5c'
                            },
                            to: {
                                name:"orders",
                                params:{type:"chit"}
                            }
                        }
//                        ,tradeList: {
//                            title:"交易记录",
//                            icon:{
//                                iconClass:'icon-tradeList',
//                                color:'#d55b97'
//                            },
//                            to: { name:'loadMobile' }
//                        }
                    }
                    ,gold: {
                        wallet: {
                            title:"我的钱包",
                            icon:{
                                iconClass:'icon-wallet',
                                color:'#fe7d5b'
                            },
                            to: { name:'mineWallet' }
                        },
                        annuity: {
                            title:"我的养老金",
                            icon:{
                                iconClass:'icon-annuity',
                                color:'#ffb100'
                            },
                            to: { name: 'annuityList' }
                        }
                    }
                    ,ticket: {
                        chit: {
                            title:"代金券",
                            icon:{
                                iconClass:'icon-chit',
                                color:'#e6696a'
                            },
                            to: { name: 'chitList' }
                        },
                        coupon: {
                            title:"优惠券",
                            icon:{
                                iconClass:'icon-coupon',
                                color:'#5a9add'
                            },
                            to: { name: 'coupon' }
                        },
                        enshrine: {
                            title:"我的收藏",
                            icon:{
                                iconClass:'icon-enshrine',
                                color:'#d95693'
                            },
                            to:{ name: 'enshrineList',params:{type:"shops"}}
                        }
                    }
                    ,setting: {
                        setting: {
                            title: "设置",
                            icon:{
                                iconClass:'icon-setting',
                                color:'#41cf9a'
                            },
                            to: { name: 'userInformation' }
                        }
                    }
                }
                ,shopTrade: {
                    waitPay:{
                        icon:{
                            iconClass:'icon-waitPay'
                        },
                        name:"待支付"
                    }
                    ,waitConsume:{
                        icon:{
                            iconClass:'icon-waitConsume'
                        },
                        name:"待确认"
                    }
                    ,waitAppraise:{
                        icon:{
                            iconClass:'icon-waitAppraise'
                        },
                        name:"待评价"
                    }
                    ,aftermarket:{
                        icon:{
                            iconClass:'icon-aftermarket'
                        },
                        name:"退款/售后"
                    }
                }
            }
        }
        ,components:{linkList, blockBtn}
    }
</script>
