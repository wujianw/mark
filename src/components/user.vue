<template>
    <div class="user-center-wrap">
        <div class="user-center flex-space">
            <div class="flex-space">
                <div class="hd-pic"><img src="../../static/img/hd-pic.png" alt=""/></div>
                <div class="nickname-wrap">
                    <div class="nickname">微信昵称/会员名称</div>
                    <div>养老金：&nbsp<span class="annuity">{{annuity}}</span></div>
                </div>
            </div>
            <div>
                <router-link :to="{name:'userInformation',query:{token:1}}">
                    <span class="link-details">完善信息<i class="icon icon-arrowRight"></i></span>
                </router-link>
            </div>
        </div>
        <div class="flex-space-around consumption">
            <div class="consumption-status flex-center" data-text="待支付">
                <i class="icon icon-waitPay"></i>
            </div>
            <div class="consumption-status flex-center" data-text="待消费">
                <i class="icon icon-waitConsume"></i>
            </div>
            <div class="consumption-status flex-center" data-text="待评价">
                <i class="icon icon-waitAppraise"></i>
            </div>
            <div class="consumption-status flex-center" data-text="退款/售后">
                <i class="icon icon-aftermarket"></i>
            </div>
        </div>
        <div class="list-link-wrap">
            <link-list :title="order.title" :icon="order.icon" :routerName="order.routerName"></link-list>
            <link-list :title="order.title" :icon="order.icon" :routerName="order.routerName"></link-list>
        </div>
    </div>
</template>
<style lang='scss'>
    $userColor: #505050;
    $annuityColor: #e85352;
    $waitColor: #c4c4c4;
    $smFontSize: 22px;
    $statusFontSize: 22px;
    $fontSize: 24px;


    .user-center-wrap{
        background:#f2f2f2;
        color:$userColor;
    }

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
        .consumption-status{
            flex-direction:column;
            flex-grow:1;
            font-size:$statusFontSize;
            i{font-size:38px;line-height:48px;color:$waitColor;}
            &:after{content:attr(data-text);line-height:($statusFontSize + 16);}
        }
    }

    /* 会员中心li--- link to details */
    .list-link-wrap{
        border-top:18px solid #f2f2f2;
    }

</style>
<script>
    import linkList from "./linkList.vue"
    export default{
        data(){
            return{
                annuity : 0.00,
                order:{
                    title:"全部订单",
                    icon:{
                        iconClass:'icon-orders',
                        color:'#fe7c5c'
                    },
                    routerName:'loadMobile'
                }
            }
        }
        ,components:{
            linkList
        }
    }
</script>
