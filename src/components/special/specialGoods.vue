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
    import member from "../../api/member"
    import { mapGetters } from 'vuex'
    /*
     * 特产区商品列表组件
     * @params
     */
    import goodItem from "./favorGoodItem"
    export default{
        data() {
            return {
                busy :false,
                params:{
                    cityId:330100,
                    areaId:'',
                    type:'',
                    lon:120.223790,
                    lat:30.192777,
                    start:0,
                    rows:2,
                    goodsName:''
                }

            }
        },
        computed: {
            ...mapGetters({
                specialGoods:'specialGoods'
            })
        }
        ,methods:{
            more(){
                this.busy = true
                this.$store.dispatch("specialGoods",{params:this.params}).then(data => {
                   console.log(JSON.stringify(data))
                    this.busy = !data
                })
            }
        }
        ,components:{
            goodItem
        }
    };
</script>
