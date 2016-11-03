<template>
    <div class="coupon-list-el">
        <div class="coupon-list">
            <coupon-block v-for="item in details" :details="item"></coupon-block>


            <router-link :to="{name:''}" class="flex-center get-coupon">去免费领券</router-link>

        </div>
    </div>
</template>
<style lang="scss" rel="stylesheet/scss">
    .coupon-list-el{
        .coupon-list{
            padding:0 16px;
        }
    }
</style>
<script type="text/babel">
    import couponBlock from "./couponBlock"
    import member from "../../api/member"
    import { mapGetters } from 'vuex'
    export default{
        data(){
            return{
                details:null
            }
        }

        ,computed: {
            ...mapGetters({
                getToken:'getToken'
            })
        }
        ,beforeRouteEnter (to, from, next) {
            next(vm => {
                member.getCouponList(vm.getToken).then(val => {
                  vm.details = val
                    console.log(JSON.stringify(val))


                })
            })
        }



        ,components:{
            couponBlock
        }
    }
</script>
