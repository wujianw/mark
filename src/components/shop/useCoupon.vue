<template>
    <div>
        <header class="flex-space"></header>

        <div class="use-coupon-el" v-infinite-scroll="more" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
            <div v-if="list.length" v-for="details in orderedList" :key="details.id" @click="back(details.id,details.discntAmount)"  class="coupon-block-el flex-space">
                <div class="coupon-content">
                    <h3>{{details.activeName}}</h3>
                    <div>
                        <p>满{{details.campaginAmount | gold}}元可用</p>
                        <p>{{details.startDate}}至{{details.endDate}}</p>
                        <p>仅限{{details.merchantName}}使用</p>
                    </div>
                </div>
                <div class="pic-icon flex-start" :class="details.campaginAmount < gold ? '' : 'pic-no'">
                    <div class="gold">{{details.discntAmount}}</div>
                    <div class="explain"></div>
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="scss" rel="stylesheet/scss">
    .use-coupon-el{
        padding:0 16px;
    }
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
        .pic-no{
            background-image:url('../../assets/img/red-packet-no.png')
        }
    }
</style>
<script type="text/babel">
    import member from '../../api/member'
    import {mapGetters} from 'vuex'
    const orderBy = require('lodash/orderBy')
    export default{
        data() {
            return {
                busy:false,
                start:0,
                list:[],
                shopId:'',

            }
        },
        computed:{
            ...mapGetters({
                goods:'goodDetails'
            }),
            orderedList() {
                return orderBy(this.list, 'campaginAmount')
            },
            gold() {
                return parseFloat(this.$route.query.gold)
            }
        },
        created() {
            this.shopId = this.goods.merchantId
        },
        methods:{
            back(id,discntAmount){
                if( discntAmount < this.gold) {
                    let option = {id,discntAmount,changeUse:true}
                    this.$store.dispatch("insetMarkCoupon",option).then(() => {
                        this.$router.back()
                    })
                }
            },
            fetchData(rows=10) {
                member.getCouponList({shopId:this.shopId,rows,start:this.start}).then(val => {
                    this.list.push(...val)
                    this.start +=rows
                    this.busy = val.length != rows
                })
            },
            more() {
                this.busy = true
                this.fetchData()
            }

        }
    }
</script>
