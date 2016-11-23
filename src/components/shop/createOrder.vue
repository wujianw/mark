<template>
    <div class="create-order-el">
        <good-item class="goods" :obj="goods" :show="!1" :isRoute="!0"></good-item>
        <div class="num flex-space">
            <div>数量</div>
            <div class="flex-space">
                <button @click="operationNum(-1)">-</button>
                <input type="text" v-model="num" readonly @click="keyboard">
                <button @click="operationNum(1)">+</button>
            </div>
        </div>
        <link-list title="优惠金额" :arrow="!1" :details="ableRed"></link-list>
        <link-list id="marketPrice" title="实付金额" :arrow="!1" :details="salesPrice"></link-list>
        <link-list class="buy-pension" title="将获得养老金" :arrow="!1" :details="buyPension"></link-list>
        <div class="remark">
            <input type="text" v-model="buyerRemark" placeholder="选填，可填写您的其他要求给商家">
        </div>
        <number-key v-show="numKey" @isComputed="isComputed" @simulate="simulate"></number-key>
        <footer class="footer">
            <div class="flex-space buy-btn">
                <div></div>
                <a @click="submit">提交订单</a>
            </div>
        </footer>
    </div>
</template>
<style lang="scss" rel="stylesheet/scss">
    .create-order-el{
        background:#fff;
        border-top:18px solid #f2f2f2;
        .goods{
            height:248px;
            .good-pic{
                width:200px;
                height:200px;
            }
            .gold span{
                text-decoration:line-through;
            }
        }
        .num{
            height:75px;
            padding:0 20px;
            font-size:26px;
            color:#373737;
            input{
                width:60px;
                padding:0 24px;
                border:none;
                text-align: center;
                font-size:26px;
                color:#373737;

            }
            button{
                width:35px;
                height:35px;
                background:#f2f2f2;
                border:none;
                border-radius:4px;
                font-size:26px;
                color:#373737;
            }
        }
        .buy-pension{
            border-top:18px solid #f2f2f2;
        }
        .remark{
            padding:15px 20px;
            border-bottom:110px solid #f2f2f2;
            line-height:45px;
            font-size:26px;
            color:#373737;
            &:before{content:"备注";}
            input{
                width:400px;
                padding-left:12px;
                border:none;
                font-size:26px;
                line-height:45px;
            }
        }
        .footer{position:fixed;bottom:0;width:750px;background:#f2f2f2;z-index:2;}
        .buy-btn{background:#fff;height:110px;padding:0 20px;}
        .buy-btn a{
            display:inline-block;
            width:200px;
            background:#e85350;
            border-radius: .2em;
            text-align:center;
            line-height:80px;
            font-size:32px;
            color:#fff;}
        i.icon-iphone{font-size:38px;}
    }
    #marketPrice .link-details{color:#e85453;}
</style>
<script type="text/babel">
    /*
     * 创建订单
     * @params
     */
    import goodItem from "./goodItem"
    import linkList from "../linkList"
    import numberKey from "../numberKey"
    import shop from "../../api/shop"
    import pay from "../../api/pay"
    import { mapGetters,Store } from 'vuex'
    export default{
        data(){
            return{
                num:1,
                numKey:false,
                ableRed:0,
                sendPacketRed:0,
                buyerRemark:''// 买家备注
            }
        },
        computed:{
            ...mapGetters({
                goods:'goodDetails'
            }),
            salesPrice() {
                return (this.num*this.goods.salesPrice).toFixed(2)
            },
            buyPension() {
                return (this.num*this.goods.buyPension).toFixed(2)
            }
        },
        created() {
            console.log(JSON.stringify(this.goods))
            document.title = "提交订单"
            this.upData()
        },
        watch:{
            num(newVal){
                if(newVal==0){
                    this.num = 1
                }
            }
        },
        methods:{
            keyboard() {
                this.numKey = !this.numKey
            },
            isComputed() {// 完成按钮
                this.numKey = false
                this.upData()
            },
            simulate(text) { // 键盘时间触发
                let num = this.num.toString()
                if(Number(text) >= 0) {
                    this.num = Number(num+text)
                }else if(text.toLowerCase() == 'x'){
                    this.num = Number(num.substring(0,num.length-1))
                }else {
                    this.num = 1
                }
            },
            upData() {// 获取养老金和获得红包数据
                shop.useAblePacketRed({goodsId:this.goods.id,number:this.num}).then(data => {
                    this.ableRed = data
                })
                shop.sendPacketRed({goodsId:this.goods.id,number:this.num}).then(data => {
                    this.sendPacketRed = data
                })
            },
            operationNum(a) {
                if(this.num+a < 1) return false
                this.num+= a
                this.upData()
            },
            submit() {
                let option = {
                    goodsId:this.goods.id,
                    number:this.num,
                    buyerRemark:this.buyerRemark,
                    totalPrice:this.salesPrice,
                    packetPayAmout:this.sendPacketRed,
                    benefitId:''
                }
                pay.createOrder(option).then(data => {
                    
                    this.$router.push({name:'verifyPay',query:{orderNum:1111}})
                })
            }
        },
        components:{ goodItem,linkList,numberKey }
    }
</script>
