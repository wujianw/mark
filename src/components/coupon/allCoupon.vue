<template>
    <div class="coupon-block-el all-coupon flex-space">
        <div class="coupon-content">
            <h3>{{details.activeName}}</h3>
            <div>
                <p>{{details.merchantName}}</p>
                <p>·订单满{{details.campaginAmount | gold}}元可用</p>
                <p>{{details.startDate}}至{{details.endDate}}</p>
            </div>
        </div>
        <div class="pic-icon flex-start" @click="fetchCoupon(details.id)">
            <div class="gold">{{details.discntAmount}}</div>
            <div class="explain">立即领取</div>
        </div>
    </div>
</template>
<style lang="scss" rel="stylesheet/scss">
    .coupon-block-el{
        &.all-coupon{
            border-top:none;
            border-bottom:22px solid #f2f2f2;
        }
    }
</style>
<script type="text/babel">
    import member from '../../api/member'
    import MessageBox from '../../msgbox'
    export default{
        methods:{
            fetchCoupon(campaignId) {
                member.fetchCoupon({campaignId}).then(data => {
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
        },
        props:{
            details:Object
        }
    }
</script>
