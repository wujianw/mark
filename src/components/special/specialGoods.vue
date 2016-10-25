<style>
    .main-unit-wrap{padding:16px 0 84px;}
    .clearfloat{zoom:1;}
    .clearfloat:after{content:"";clear:both;display:block;}
</style>
<template>
  <div class="special-good-el">
    <ul class="main-unit-wrap clearfloat">
        <good-item v-for="good in goods" :good="good"></good-item>
    </ul>
  </div>
</template>
<script>
    /*
     * 特产区商品列表组件
     * @params
     */
    import goodItem from "./goodItem"
    export default{
        data() {
            return {
                goods : [
                    {goodsName:"dfdfsf",goodsTitle:"好聚好散东方红",goodsImages:"",salesPrice:"12.0",virtualBuy:""}
                    ,{goodsName:"adgag按揭",goodsTitle:"宽松的咖啡苦涩的减肥",goodsImages:"",salesPrice:"1213.2",virtualBuy:""}
                    ,{goodsName:"阿凡达发",goodsTitle:"宽松的咖啡苦涩的减肥",goodsImages:"",salesPrice:"5856.00",virtualBuy:""}
                ]
            }
        }
        ,components:{
            goodItem
        }
    };
</script>
