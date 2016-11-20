<style>
    .main-unit-wrap{padding:16px 0 84px;}
    .clearfloat{zoom:1;}
    .clearfloat:after{content:"";clear:both;display:block;}
</style>
<template>
  <div class="special-good-el">
      <div  v-infinite-scroll="more" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
          <ul class="main-unit-wrap clearfloat">
              <good-item v-for="good in specialGoods" :good="good"></good-item>
          </ul>
      </div>
  </div>
</template>
<script type="text/babel">

    /*
     * 特产区商品列表组件
     * @params
     */
    import shop from "../../api/shop"
    import goodItem from "./favorGoodItem"
    import { mapGetters } from 'vuex'
    export default{
        data() {
            return {
                busy :false,
                start:0,
                specialGoods:[]
            }
        }
        ,computed:{
            ...mapGetters({
                geography:'geography'
            }),
            params() {
                return {
                    type:this.$route.query.type,
                    lon:this.geography.longitude || window.localStorage.lon || '',
                    lat:this.geography.latitude || window.localStorage.lat || '',
                    start:this.start,
                    goodsName:''
                }
            }
        }
        ,methods:{
            fetchData(rows=10) {
                let params = Object.assign({rows},this.params)
                shop.getSpecialGoods(params).then(data => {
                    let goods = data.goods
                    this.specialGoods.push(...goods)
                    this.busy = goods.length != rows
                })
            },
            more(){
                this.busy = true
                this.fetchData()
            }
        }
        ,components:{
            goodItem
        }
    };
</script>
