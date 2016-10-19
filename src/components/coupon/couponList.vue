<template>
    <div class="coupon-list-el">
        <div class="coupon-list">
            <coupon-block :details="details"></coupon-block>
            <router-link :to="{name:''}" class="flex-center get-coupon">去免费领券</router-link>
        </div>
    </div>
</template>
<style lang="scss">
    .coupon-list-el{
        .coupon-list{
            padding:0 16px;
        }
    }
</style>
<script type="text/babel">
    import couponBlock from "./couponBlock"
    export default{
        data(){
            return{
                details:{
                    activeName:"送红包",
                    shopName:"积分宝体验店",
                    mobile:"13002780721",
                    type: 0,
                    min:0.00,
                    startDate:"2016-02-02",
                    endDate:"2016-02-02",
                    couponNum: "",
                    date: ""
                }
            }
        }
        ,components:{
            couponBlock
        }
    }
</script>
