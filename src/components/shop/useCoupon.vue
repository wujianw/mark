<template>
    <div v-infinite-scroll="more" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
        <div v-if="list.length" v-for="details in list" @click="back"  class="coupon-block-el flex-space">
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
                <div class="explain"></div>
            </div>
            <div></div>
        </div>
    </div>
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
    import member from '../../api/member'
    import {mapGetters} from 'vuex'
    export default{
        data() {
            return {
                busy:false,
                start:0,
                list:[]
            }
        },
        computed:{
            ...mapGetters({
                shop:'goodDetailsShop'
            })
        },
        created() {

        },
        methods:{
            back(){
//                if()
//            :to="{name:'shopDetails',query:{shopId:details.merchantId}}"
            },
            fetchData(rows=30) {
                member.getCouponList({shopId:this.$route.query.shopId,rows,start:this.start}).then(val => {
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
