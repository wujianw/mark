<template>
    <div class="coupon-list-el" >
        <div class="coupon-list" v-infinite-scroll="more" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
            <coupon-block v-for="item in details" :details="item"></coupon-block>
            <router-link :to="{name:'getCoupon'}" class="flex-center get-coupon">去免费领券</router-link>
        </div>
    </div>
</template>
<style lang="scss" rel="stylesheet/scss">
    .coupon-list-el {
        .coupon-list {
            padding:0 16px;
        }
        a.get-coupon {
            padding:50px;
            font-size:26px;
            text-decoration: underline;
            color:#e85352;
        }
    }
</style>
<script type="text/babel">
    import couponBlock from "./couponBlock"
    import member from "../../api/member"
    import { mapGetters } from 'vuex'
    export default{
        data() {
            return{
                busy:false,
                start:0,
                details:[]
            }
        }
        ,methods:{
            more(rows=10) {
                this.busy = true
                member.getCouponList({start:this.start,rows}).then(val => {
                    this.start += rows
                    this.details.push(...val)
                    this.busy = val.length != rows
                })
            }
        }
        ,components:{
            couponBlock
        }
    }
</script>
