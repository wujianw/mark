<template>
    <div class="nearby-hot-container">
        <header class="index-header">
            <index-header  :prefix="prefix"></index-header>
        </header>
        <!--<div class="nearby-hot-top">-->
            <!--<img src="../../../static/img/special-bg.png" alt="">-->
        <!--</div>-->
        <slider class="nearby-hot-top"></slider>
        <div class="hot-area flex-right-left">
            <router-link tag="div" :to="{name:'specialGoods',query:{type:18}}" class="">
                <img src="" alt="">
            </router-link>
            <div class="">
                <router-link tag="div" class="hot-area-sm" :to="{name:'specialGoods',query:{type:19}}">
                    <img src="" alt="">
                </router-link>
                <div class="hot-area-sm flex-right-left">
                    <router-link tag="div" :to="{name:'specialGoods',query:{type:20}}">
                        <img src="" alt="">
                    </router-link>
                    <router-link tag="div" :to="{name:'specialGoods',query:{type:21}}">
                        <img src="" alt="">
                    </router-link>
                </div>
            </div>
        </div>
        <div class="nearby-list-wrap" >
            <h3>附近特卖</h3>
            <div  v-infinite-scroll="more" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
                <div class="nearby-list">
                    <good-item v-for="good in specialGoods" :good="good"></good-item>
                </div>
            </div>
        </div>
    </div>
</template>
<script type="text/babel">
    import member from "../../api/member"
    import { mapGetters } from 'vuex'
    import indexHeader from "./indexHeader"
    import slider from "./slider"
    import goodItem from './indexGoodItem'
    export default {
        data() {
            return {
                prefix:"杭州市-滨区",
                busy :false
            }
        } ,
        computed: {
            ...mapGetters({
                specialGoods:'specialGoods',
                geography:'geography'
            }),
            params() {
                console.log("longitude:"+this.geography.longitude)
                return {
                    type:'',// 特卖类型 特卖类别（18,19,20,21）
                    lon:this.geography.longitude || window.localStorage.lon || '',
                    lat:this.geography.latitude || window.localStorage.lat || '',
                    start:0,
                    rows:10,
                    goodsName:''// 模糊查询用
                }
            }
        }
        ,methods:{
            more(){
                this.busy = true
                this.$store.dispatch("specialData",{params:this.params}).then(more => {
                    this.busy = !more
                })
            }

        }

        ,components:{
            indexHeader,
            goodItem,
            slider
        }

    }
</script>
<style lang="scss" rel="stylesheet/scss">
    .flex-right-left{
        display: flex;align-items: center;justify-content: center;
        >div{
             height:100%;
             flex-grow:1;
             align-items: stretch;
        }
    }
    .nearby-hot-top{
        height:338px;
        img{width:100%;height:100%;}
    }
    .index-header{
        position:fixed;
        z-index:5;
        width: 750px;
        top:0
    }
    .nearby-list-wrap{
        h3{
            margin:10px 0;
            padding-left:10px;
            border-left:5px solid #e85352;
            font:normal 26px/40px "sans-serif";
            color: #505050;
        }
        .nearby-list{
            margin-bottom:105px;
            background:#fff;
        }
    }
    .hot-area{
        height:312px;
        border-top:12px solid #f2f2f2;
        background:#fff;
        img{width:100%;height:100%;}
        .hot-area-sm{height:50%;}
    }
</style>
