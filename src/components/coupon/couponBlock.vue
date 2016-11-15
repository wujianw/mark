<template>
    <router-link tag="div" :to="{name:'shopDetails',query:{shopId:details.merchantId}}" class="coupon-block-el flex-space">
        <div class="coupon-content">
            <h3>{{details.activeName}}</h3>
            <div>
                <p>满{{details.campaginAmount | gold}}元可用</p>
                <p>{{details.startDate}}至{{details.endDate}}</p>
                <p>仅限{{details.merchantName}}使用</p>
            </div>
        </div>
        <div class="pic-icon flex-start" :class="details.type==1 ? '' : 'pic-all'">
            <div class="gold">{{details.discntAmount}}</div>
            <div class="explain">进店使用</div>
        </div>
    </router-link>
</template>
<style lang="scss" rel="stylesheet/scss">
    .coupon-block-el{
        border-top:22px solid #f2f2f2;
        background:#fff;
        .coupon-content{
            padding-left:52px;
            h3{font-size:30px;line-height:1.6;}
            div{
                color:#f2f2f2;
                p{
                    font-size:20px;
                    line-height:1.4;
                    color:#afafaf;
                    &:after{content:attr(data-num);color:#505050;padding-left:25px;}
                    &:first-of-type{font-size:28px;}
                }
            }

        }
        .pic-icon{
            flex-direction: column;
            height:168px;
            width:193px;
            background:url('../../assets/img/red-packet-shop.png') no-repeat;
            font-family:"Microsoft Yahei";
            color:#fff;
            .gold{
                position:relative;
                padding-top:35px;
                font-size:70px;
                &:before{content:"￥";position:absolute;bottom:0;left:-30px;font-size:41px;}
            }
            .explain{
                font-size:26px;
                line-height:2;
            }
        }
        .pic-all{
            background-image:url('../../assets/img/red-packet-all.png')
        }
    }
</style>
<script type="text/babel">
    export default{
        filters:{
            mobiles(value) {
                return value.slice(-4,value.length)
            }
        }
        ,props:{
            details:{
                type:Object,
                default() {
                   return {
                       merchantId:'',
                       title:"积分宝体验店",
                       campaginAmount:0.00,
                       startDate:"2016-02-02",
                       endDate:"2016-02-02",
                       discntAmount: "",
                       date: ""
                   }
                }
            }
        }
    }
</script>
