<template>
    <div class="shop-coupon-el">
        <div class="coupon-item flex-space">
            <div class="bg">
                <p class="gold">{{obj.discntAmount}}</p>
            </div>
            <div class="rule">满{{obj.campaginAmount}}使用</div>
            <div class="btn" @click="fetchCoupon(obj.id)">
                <span>领取</span>
            </div>
        </div>
    </div>
</template>
<style lang="scss" rel="stylesheet/scss">
    /* 商家详情 -- 优惠券领取item */
    .shop-coupon-el{
        margin-left:66px;
        .coupon-item{
            height:90px;
            border-bottom:1px solid #f2f2f2;
            .bg{
                width:120px;
                background:url("../../assets/img/shop-coupon-bg.png") no-repeat;
                background-size:100% 100%;
                text-align: center;
                line-height:76px;
                font-size:38px;
                font-family:"Microsoft Yahei";
                color:#fff;
                .gold{
                    &:before{content:"￥";font-size:20px;}
                }
            }
            .rule{
                font-size:22px;
                color:#afafaf;
            }
            .btn{
                padding:0 24px;
                span{
                    display: inline-block;
                    width:138px;
                    border:1px solid #e85352;
                    border-radius: .2em;
                    text-align: center;
                    line-height:50px;
                    font-size:26px;
                    color:#e85352;
                }
            }
        }
    }
</style>
<script type="text/babel">
    /*
     * 商家详情 优惠券item
     * @params
     */
    import member from "../../api/member"
    import MessageBox from '../../msgbox'
    export default{
        data(){
            return{

            }
        }
        ,methods:{
            //获取代金券
            fetchCoupon(id) {
                let self = this
                member.fetchCoupon({campaignId:id}).then(data => {
                    if(data.code == 0){
                        MessageBox.alert("领取成功,可在我的优惠券列表查看")
                    }else if(data.code == 1001){
                        MessageBox.alert("登入失效，请重新登入").then(()=> {
                            self.$router.push({name:'loadMobile'})
                        })
                    }else{
                        return Promise.reject(data)
                    }
                }).catch(data => {
                    MessageBox.alert(data.message || data)
                })
            }
        }
        ,props:{
            obj:Object
        }
    }
</script>
