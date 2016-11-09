<template>
    <div class="enshrine-good-list-el">
        <div v-if="isGood">
            <block :isGood="isGood" v-for="item in goodsdata" :goodsdata="item.goodsImages">
                <div class="good-details">
                    <p>{{item.goodsName}}</p>
                    <p>{{item.buyPrice}}<span>{{item.marketPrice}}</span></p>
                </div>
            </block>
        </div>
        <div v-else>
            <block :isGood="isGood" v-for="item in merchantdata" :goodsdata="item.background">
                <div  class="shop-details">
                    <p>{{item.merchant_name}}</p>
                    <p>{{item.business_type_name}}</p>
                </div>
            </block>
        </div>
    </div>
</template>
<style lang="scss" rel="stylesheet/scss">
.enshrine-good-list-el{
    border-top:22px solid #f2f2f2;
    .good-details{
        padding-left:28px;
        p{line-height:1.5;}
        p:first-of-type{
            font-size:30px;
            color:#505050;
        }
        p:last-of-type{
            font-family: "Microsoft Yahei";
            font-size:32px;
            color:#e85352;
            &:before{
                 content:"￥";
                 font-size:24px;
            }
            span{
                font-size:24px;
                color:#afafaf;
                &:before {
                    content: "￥";
                    font-size:20px;
                }
            }
        }
    }
    .shop-details{
        padding-left:28px;
        p{line-height:1.5;}
        p:first-of-type{
            font-size:30px;
            color:#505050;
        }
        p:last-of-type{
            font-family: "Microsoft Yahei";
            font-size:22px;
            color:#afafaf;
        }
    }
}
</style>
<script type="text/babel">
    import block from "./block"
    import member from "../../api/member"
    import { mapGetters } from 'vuex'
    export default{
        data(){
            return{
                merchantdata:[],
                goodsdata:[],
                isGood : false
            }
        }
        ,computed: {
            ...mapGetters({
                getToken:'getToken'
            })
        }
        ,beforeRouteEnter (to, from, next) {
            next(vm => {
                member.getMembercollect(vm.getToken).then(val => {
                    vm.merchantdata = val.merchantdata
                    vm.goodsdata = val.goodsdata
                })
            })
        }
        ,created(){
            this.fetchData()
        }
        ,watch:{
            '$route': 'fetchData'
        }
        ,methods:{
            fetchData() {
                this.isGood = this.$route.params.type == "goods"
            }
        }
        ,components:{
            block
        }
    }
</script>
