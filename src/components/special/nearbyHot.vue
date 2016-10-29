<template>
    <div class="nearby-hot-container">
        <header class="index-header">
            <index-header  :prefix="prefix"></index-header>
        </header>
        <div class="nearby-hot-top">
            <img src="../../../static/img/special-bg.png" alt="">
        </div>
        <div class="hot-area flex-right-left">
            <router-link tag="div" :to="{name:'specialGoods'}" class="">
                <img src="" alt="">
            </router-link>
            <div class="">
                <div class="hot-area-sm">
                    <img src="" alt="">
                </div>
                <div class="hot-area-sm flex-right-left">
                    <div>
                        <img src="" alt="">
                    </div>
                    <div>
                        <img src="" alt="">
                    </div>
                </div>
            </div>
        </div>
        <div class="nearby-list-wrap" >
            <h3>附近特卖</h3>
            <div class="nearby-list">
                <good-item v-for="n in 30"></good-item>
            </div>
        </div>
    </div>
</template>
<script>
    import indexHeader from "./indexHeader.vue"
    import goodItem from './indexGoodItem'
    export default {
        data () {
            return {
                prefix:"杭州市-滨江区",
            }
        }
        ,components:{
            indexHeader,
            goodItem
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
            padding-bottom:105px;
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
