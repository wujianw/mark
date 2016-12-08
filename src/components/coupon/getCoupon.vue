<template>
    <div class="coupon-list-el">
        <div class="link-picword">
            <p>商家优惠券</p>
        </div>
        <div class="coupon-list">
            <coupon-block v-for="item in details" :details="item"></coupon-block>
        </div>
    </div>
</template>
<style lang="scss" rel="stylesheet/scss">
.coupon-list-el{
    .link-picword{
        margin-bottom:0;
        background:linear-gradient(0deg,#f2f2f2 38px,#a4a4a4 1px,#f2f2f2 40px) top left,
        linear-gradient(0deg,#f2f2f2 38px,#a4a4a4 1px,#f2f2f2 40px) bottom right,
        linear-gradient(0deg,#f2f2f2 38px,#f2f2f2 1px,#f2f2f2 40px) center;
        background-size: 266px 100%;background-repeat:no-repeat;
    }
}
</style>
<script type="text/babel">
    /*
     * 所有商家可领优惠券
     * @params
     */
    import couponBlock from "./allCoupon"
    import member from "../../api/member"
    import { mapGetters } from 'vuex'
    export default{
        data() {
            return{
                details:[]
            }
        },
        beforeRouteEnter (to, from, next) {
            next(vm => {
                member.getAllCoupon().then(val => {
                    vm.details = val.rows
                })
            })
        },
        components:{ couponBlock }
    }
</script>
