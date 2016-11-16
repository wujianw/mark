<template>
    <div class="enshrine-good-list-el">
        <div v-show="isGood">
            <block
                class="good-block"
                :isGood="isGood"
                v-for="(item,index) in goodsdata"
                :index="item.id"
                :isDelete="isDelete"
                @toggleDelete="goodDelete"
                :goodsdata="item.goodsImages"
                :to="{name:'goodDetails',query:{goodsId:item.id}}">
                <div slot="text" class="good-details">
                    <p>{{item.goodsName}}</p>
                    <p>{{item.buyPrice}}<span>{{item.marketPrice}}</span></p>
                </div>
            </block>
        </div>
        <div v-show="!isGood">
            <block
                :isGood="isGood"
                v-for="(item,index) in merchantdata"
                :goodsdata="item.background"
                :index="item.merchant_id"
                :isDelete="isDelete"
                @toggleDelete="shopDelete"
                :to="{name:'shopDetails',query:{shopId:item.merchant_id}}">
                <div slot="text" class="shop-details">
                    <p>{{item.merchant_name}}</p>
                    <p>{{item.business_type_name}}</p>
                </div>
                <div slot="btn" class="btn-wrap" @click.stop="linkMessage">
                    <i class="icon icon-information" v-if="!isDelete"></i>
                </div>
            </block>
        </div>
        <footer class="flex-center">
            <div class="delete-btn" v-if="goodDet.length || shopDet.length" @click="getDelete"></div>
            <div class="delete-state-btn" :class="{'active':isDelete}" @click="toggleDelete"></div>
        </footer>
    </div>
</template>
<style lang="scss" rel="stylesheet/scss">
.enshrine-good-list-el{
    border-top:22px solid #f2f2f2;
    border-bottom:110px solid #f2f2f2;
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
    footer{
        position:fixed;
        bottom:0;
        width:750px;
        div{
            width:50%;
            flex-grow: 1;
            margin:14px;
            background:#fff;
            border-radius: .2em;
            text-align: center;
            font:30px "Microsoft Yahei";

        }
        .delete-state-btn{
            &:before{
                line-height:82px;
                content: "管理收藏";
                color:#e85354;
            }
        }
        .delete-btn{
            background:#e85354;
            &:before{
                line-height:82px;
                content: "删除收藏";
                color:#fff;
            }
        }
        .active{
            &:before{
                content: "取消";
            }
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
                merchantdata:[],// 商家数据
                goodsdata:[],// 商品数据
                isGood : false,
                isDelete:false,
                goodDet:[],// 待删除的商品
                shopDet:[],// 待删除的商家
            }
        }
        ,computed: {
            ...mapGetters({
                getToken:'getToken'
            })
        }
        ,beforeRouteEnter (to, from, next) {
            next(vm => {
                member.getMemberCollect(vm.getToken).then(val => {
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
            shopDelete(value) {
                let length = this.shopDet.length
                this.shopDet = this.shopDet.filter(item => item!=value)
                if(length == this.shopDet.length){
                    this.shopDet.push(value)
                }
                console.log(this.shopDet)
            },
            goodDelete(value) {
                let length = this.goodDet.length
                this.goodDet = this.goodDet.filter(item => item!=value)
                if(length == this.goodDet.length){
                    this.goodDet.push(value)
                }
                console.log(this.goodDet)
            },
            toggleDelete() { // 删除模式切换,清除上一次选中的预删除id
                this.isDelete = !this.isDelete
                this.goodDet = []
                this.shopDet = []
            },
            linkMessage() { // route消息列表

            },
            getDelete() {// 取消收藏
                let self = this,
                    collectType = self.isGood ? 0 : 1,
                    collectIds = self.isGood ? self.goodDet.join(",") : self.shopDet.join(",")
                member.getCloseCollect({collectType,collectIds}).then(() => {
                    // 成功后更新数据
                    if(!self.isGood){
                        self.shopDet.forEach(function(item){
                            self.merchantdata = self.merchantdata.filter(i => i.merchant_id != item)
                        })
                    }else{
                        self.goodDet.forEach(function(item){
                            self.goodsdata = self.goodsdata.filter(i => i.id != item)
                        })
                    }
                    this.toggleDelete() // 切换为非删除模式
                })

            },
            fetchData() {
                this.isDelete = false
                this.isGood = this.$route.params.type == "goods"
            }
        }
        ,components:{ block }
    }
</script>
