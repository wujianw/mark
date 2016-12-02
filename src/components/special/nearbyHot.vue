<template>
    <div class="nearby-hot-container">
        <header class="index-header">
            <router-link :to="{name:'search'}" class="flex-space header-container">
                <p class="area">{{area.city}}</p>
                <i class="icon icon-big"></i>
            </router-link>
        </header>
        <slider class="nearby-hot-top"></slider>
        <div class="hot-area flex-right-left" v-if="mode">
            <router-link tag="div" :to="{name:'specialGoods',query:{type:18}}" class="">
                <img :src="mode[0].imgUrl" alt="">
            </router-link>
            <div class="">
                <router-link tag="div" class="hot-area-sm" :to="{name:'specialGoods',query:{type:19}}">
                    <img :src="mode[1].imgUrl" alt="">
                </router-link>
                <div class="hot-area-sm flex-right-left">
                    <router-link tag="div" :to="{name:'specialGoods',query:{type:20}}">
                        <img :src="mode[2].imgUrl" alt="">
                    </router-link>
                    <router-link tag="div" :to="{name:'specialGoods',query:{type:21}}">
                        <img :src="mode[3].imgUrl" alt="">
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
    import slider from "./slider"
    import goodItem from './indexGoodItem'
    import WX from '../../api/wx'
    import shop from '../../api/shop'
    export default {
        data() {
            return {
                busy :true
            }
        },
        computed: {
            ...mapGetters({
                specialGoods:'specialGoods',
                geography:'geography',
                area:'getLocation',
                mode:'specialMode'
            }),
            params() {
                return {
                    cityId:this.area.cityCode,
                    type:'',// 特卖类型 特卖类别（18,19,20,21）
                    lon:this.geography.longitude || window.localStorage.lon || '',
                    lat:this.geography.latitude || window.localStorage.lat || '',
                    start:0,
                    rows:10,
                    goodsName:''// 模糊查询用
                }
            },
        },
        created() {
            // 初始化获取经纬度
            let self = this
            if(this.geography.latitude == ''){
                WX.getSignature()
                    .then(wxJson => {
                    wx.config({
                        debug: false,
                        appId: wxJson.appid,
                        timestamp: wxJson.timestamp,
                        nonceStr: wxJson.noncestr,
                        signature: wxJson.signature,
                        jsApiList: ['getLocation']
                    })
                    let latitude,longitude
                    wx.error(function() {
                        self.busy = false
                    })
                    wx.ready(function(){
                        wx.getLocation({
                            type: 'gcj02', // 默认为wgs84的gps坐标,'gcj02'
                            success:function(res) {
                                latitude = res.latitude // 纬度，浮点数，范围为90 ~ -90
                                longitude = res.longitude // 经度，浮点数，范围为180 ~ -180。
                                self.getGeography({latitude,longitude})
                            },
                            cancel:function() {

                            }
                        })
                    })
                })
            }else{
                this.busy = false
            }
            let appVersion = window.navigator.appVersion.toLowerCase(),  //客户端信息
                isSystem = appVersion.indexOf("micromessenger")>-1
            if(process.env.NODE_ENV != 'production' && !isSystem){
                this.busy = false
            }
        }
        ,methods:{
            getGeography({latitude,longitude}={}) {
                let self = this
                let params = {gcjLon:longitude, gcjLat:latitude}
                shop.getLonLat(params).then(data => {
                    console.log(JSON.stringify(data))
                    let latitude = data.bdlat,
                        longitude = data.bdlon
                    window.localStorage.lon = longitude // 经度
                    window.localStorage.lat = latitude // 纬度
                    self.$store.dispatch('fetchGeography',{latitude,longitude}).then(() => {
                        self.busy = false
                    })
                    self.$store.dispatch('setLocation',{area:data.area,address:data.address})
                })
            },
            more(){
                this.busy = true
                console.log(this.params)
                this.$store.dispatch("specialData",{params:this.params}).then(more => {
                    this.busy = !more
                })
            }
        }
        ,components:{goodItem, slider}

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
    // 头部搜索按钮
    .header-container{
        padding:0 30px;
        font-size:30px;
        line-height:76px;
        background: rgba(102,104,109,.8);
        color:#fff;
        i{font-size:35px;}
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
