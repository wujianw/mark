<template>
    <div class="enshrine-good-list-el">
        <div v-if="isGood">
            <block :isGood="isGood">
                <div class="good-details">
                    <p>草泥马</p>
                    <p>30.0<span>58.0</span></p>
                </div>
            </block>
        </div>
        <div v-else>
            <block :isGood="isGood">
                <div class="shop-details">
                    <p>草泥马</p>
                    <p>操你妈逼</p>
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
    export default{
        data(){
            return{
                isGood : false
            }
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
