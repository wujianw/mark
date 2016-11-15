<template>
    <div class="coupon-list-el">
        <div class="coupon-list">
            <coupon-block v-for="item in details" :details="item"></coupon-block>
        </div>
    </div>
</template>
<style lang="scss" rel="stylesheet/scss">

</style>
<script type="text/babel">
    /*
     * 所有商家可领优惠券
     * @params
     */
    import couponBlock from "./couponBlock"
    import member from "../../api/member"
    import { mapGetters } from 'vuex'
    export default{
        data() {
            return{
                details:[]
            }
        }
        ,beforeRouteEnter (to, from, next) {
            next(vm => {
                member.getAllCoupon().then(val => {
                    vm.details = val
                })
            })
        }
        ,components:{
            couponBlock
        }
    }
</script>
