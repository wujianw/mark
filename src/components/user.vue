<template>
    <div class="user-center-wrap">
        <div class="user-center flex-space">
            <div class="flex-space">
                <div class="hd-pic"><img src="../../static/img/hd-pic.png" alt=""/></div>
                <div class="nickname-wrap">
                    <div class="nickname">{{getMember.mName}}</div>
                    <div>养老金：&nbsp<span class="annuity">{{annuity}}</span></div>
                </div>
            </div>
            <div>
                <router-link :to="{name:'userInformation'}">
                    <span class="link-details">完善信息<i class="icon icon-arrow-right"></i></span>
                </router-link>
            </div>
        </div>
        <div class="flex-space-around consumption">
            <block-btn v-for="item in shopTrade" :icon="item.icon" :to="item.to" :name="item.name" :num="item.num"></block-btn>
        </div>
        <div class="list-link-wrap" v-for="items in linkList">
            <link-list v-for="item in items" :title="item.title" :icon="item.icon" :to="item.to" :details="item.details || ''"></link-list>
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
    import member from "../api/member"
    import store from '../store'
    import {mapGetters} from 'vuex'
    export default{
        data(){
            return{
            }
        }
        ,computed:{
            ...mapGetters({
                information:'getIndexData',
                getMember:'getMember'
            }),
            annuity() {
                return parseFloat(this.information.persion.toString()).toFixed(2)
            },
            linkList() {
                return {
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
                    }
                    ,gold: {
                        wallet: {
                            title:"我的钱包",
                            icon:{
                                iconClass:'icon-wallet',
                                color:'#fe7d5b'
                            },
                            to: { name:'mineWallet' },
                            details:this.information.cashBalance
                        },
                        annuity: {
                            title:"我的养老金",
                            icon:{
                                iconClass:'icon-annuity',
                                color:'#ffb100'
                            },
                            to: { name: 'annuityList',query:{gold:this.information.persion}},
                            details:this.annuity
                        }
                    }
                    ,ticket: {
                        chit: {
                            title:"代金券",
                            icon:{
                                iconClass:'icon-chit',
                                color:'#e6696a'
                            },
                            to: { name: 'chitList' },
                            details:this.information.couponnum
                        },
                        coupon: {
                            title:"优惠券",
                            icon:{
                                iconClass:'icon-coupon',
                                color:'#5a9add'
                            },
                            to: { name: 'coupon' },
                            details:this.information.benefitCount
                        },
                        enshrine: {
                            title:"我的收藏",
                            icon:{
                                iconClass:'icon-enshrine',
                                color:'#d95693'
                            },
                            to:{ name: 'enshrineList',params:{type:"shops"}},
                            details:this.information.collectnum
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
            },
            shopTrade() {
                return {
                    waitPay:{
                        icon:{
                            iconClass:'icon-waitPay'
                        },
                        name:"待支付",
                        to:{name:"orders",params:{type:'chit'},query:{state:'created'}},
                        num:this.information.couponordernum == 0 ? '' : this.information.couponordernum
                    }
                    ,waitConsume:{
                        icon:{
                            iconClass:'icon-waitConsume'
                        },
                        name:"待确认",
                        to:{name:"orders",params:{type:'chit'},query:{state:'deliveryed'}},
                        num:this.information.coupondeliveryednum == 0 ? '' : this.information.coupondeliveryednum
                    }
                    ,waitAppraise:{
                        icon:{
                            iconClass:'icon-waitAppraise'
                        },
                        name:"待评价",
                        to:{name:"orders",params:{type:'chit'},query:{state:'finished',isComment:0}},
                        num:this.information.noCommentCount == 0 ? '' : this.information.noCommentCount
                    }
                    ,aftermarket:{
                        icon:{
                            iconClass:'icon-aftermarket'
                        },
                        name:"退款/售后",
                        to:{name:"orders",params:{type:'chit'},query:{state:'closed'}},
                        num:this.information.couponrefundingnum == 0 ? '' : this.information.couponrefundingnum
                    }
                }
            }
        }
        ,beforeRouteEnter(to,from,next) {
            /*
            * 初始化获取首页 信息数据
            * if from.name with userInformation or message 无需改变首页信息数据
            * */
            member.getIndex({}).then(data => {
                store.dispatch("fetchInformation",data)
            }).then(() => {
                next()
            }).catch(() => {
                store.dispatch("clearUser")
                window.localStorage.removeItem('token')
                next()
            })
        }
        ,created() {
            if(this.getMember.mName == "" && window.localStorage.token){
                this.$store.dispatch("getUser")
            }
        }
        ,beforeRouteLeave(to,from,next) {// 销毁实例
            this.$nextTick(() =>{
                this.$destroy()
            })
            next()
        }
        ,components:{linkList, blockBtn}
    }
</script>
