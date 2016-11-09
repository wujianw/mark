<template>
    <div class="shop-list-el">
        <div class="position-wrap flex-center">
            <div class="position flex-center">
                <i class="icon icon-position"></i>
                <span>新东方国际炒菜中心</span>
                <i class="icon icon-arrow-right"></i>
            </div>
        </div>
        <div class="nav-warp">
            <nav class="flex-space" :class="isActive ? 'active' : ''">
                <div v-for="item in nav" class="nav-sort flex-center" @click="showSelect(item.list)">
                    <span>{{item.text}}</span>
                    <i class="icon" :class="isActive ? 'icon-pull-down' : 'icon-pull-down-after'"></i>
                </div>
            </nav>
            <ul class="menu-ul" @click="toggleList">
                <li v-for="item in list"
                    :data-type="item.currentCode ? 'areaCode' : item.menu_code ? 'consumePtype' : 'sortrule'"
                    :data-code="item.currentCode || item.menu_code || item.sortrule"
                    :data-text="item.currentName || item.menu_subtitle || item.name">
                </li>
            </ul>
        </div>
        <div class="shade" :class="isActive ? 'active' : ''" @click="showShade"></div>
        <div v-infinite-scroll="more" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
            <shop-block v-for="item in shopList" :obj="item"></shop-block>
        </div>
    </div>
</template>
<style lang="scss" rel="stylesheet/scss">
    .shop-list-el{
        margin-bottom:98px;
        .position-wrap{height:72px;}
        .position{
            padding:0 .5em;
            border-radius:18px;
            background:rgba(95,95,96,.5);
            line-height: 36px;
            font-size:20px;
            color:#fff;
            i{font-size:20px;}
        }
        .nav-warp{
            position:relative;
            z-index: 5;
            /*overflow: hidden;*/
            .menu-ul{
                position: absolute;
                z-index: 6;
                top:100%;
                width:100%;
                max-height:0;
                border-bottom:1px solid #f2f2f2;
                background: #fff;
                font-size:24px;
                color:#505050;
                overflow: auto;
                transition: height .3s;
                li{
                    padding:0 24px;
                    border-bottom:1px solid #f2f2f2;
                    line-height: 80px;
                    &:after{content:attr(data-text);}
                }
            }
            nav{
                background:#fff;
                text-align:center;
                border:1px solid #e5e5e5;
                .nav-sort{
                    height:80px;
                    flex-grow:1;
                    border-right:1px solid #e5e5e5;
                    font-size:28px;
                    color:#505050;
                    &:last-of-type{border:none;}
                    i{font-size:16px;}
                }
            }
            .active+.menu-ul{
                max-height:405px;
            }
            &+.shade.active{
                display: block;
            }
        }
        .shade{
            display: none;
            position:fixed;
            z-index: 4;
            width:750px;
            top:0;
            bottom:0;
            background:rgba(0,0,0,.3);
        }
    }
</style>
<script type="text/babel">
    import shopBlock from './shopBlock'
    import shop from '../../api/shop'
    import { mapGetters } from 'vuex'
//    wx.config({
//        debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
//        appId: 'wx5a45a2b5222a07da', // 必填，公众号的唯一标识
//        timestamp: , // 必填，生成签名的时间戳
//        nonceStr: '', // 必填，生成签名的随机串
//        signature: '',// 必填，签名，见附录1
//        jsApiList: [] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
//    });
    export default {
        data() {
            return {
                busy:false,
                isActive:false,
                list:null,
                shopSort:[
                    {sortrule:"intelligence",name:"智能排序"},
                    {sortrule:"distance",name:"距离最近"},
                    {sortrule:"ratio",name:"积分率最高"}
                ],
                nav:null
            }
        }
        ,created() {
            if(!this.shopMenu || this.shopMenu.length == 0){
                this.$store.dispatch("shopMenu")
            }
            if(!this.countyList || this.countyList.length == 0){
                this.$store.dispatch("toggleArea")
            }
//            shop.postShopList(this.params).then(data => {
//                this.shopList = data
//            })
        }
        ,computed: {
            ...mapGetters({
                shopMenu:'shopMenu',
                countyList:'countyList',
                shopList:'shopList',
                cityCode:'cityCode'
            }),
            nav() {
                return {
                    areaCode:{
                        text:"区县",
                        code:'',
                        list:this.countyList
                    },
                    consumePtype:{
                        text:"分类",
                        code:'',
                        list:this.shopMenu
                    },
                    sortrule:{
                        text:"排序",
                        code:'intelligence',
                        list:this.shopSort
                    }
                }
            },
            params() {
                return {
                    lon:window.localStorage.lon,
                    lat:window.localStorage.lat,
                    local:1,
                    keywords:'',
                    limit:3,
                    page:1,
                    areaCode:this.nav.areaCode.code,
                    consumePtype:this.nav.consumePtype.code,
                    cityCode:this.cityCode,
                    sortrule:this.nav.sortrule.code
                }
            }
        }
        ,methods:{
            // 区域,分类,排序 选着展示切换
            showSelect(data) {
                if(!this.isActive){
                    this.isActive = true
                }else if(this.isActive && this.list == data){
                    this.isActive = false
                }
                this.list = data
            }
            // 遮罩关闭
            ,showShade() {
                this.isActive = false
            }
            // 切换区域,分类,排序修改shopList
            ,toggleList(event) {
                this.busy = true
                let dataSet = event.target.dataset,
                    type = dataSet.type,
                    text = dataSet.text,
                    code = dataSet.code
                this.params[type] = code
                this.$store.dispatch("shopList",{params:this.params,way:true}).then(data => {
                    this.nav[type].text = text
                    this.nav[type].code = code
                    this.isActive = false
                    this.busy = !data
                })
            }
            ,more() {
                this.busy = true
                this.$store.dispatch("shopList",{params:this.params}).then(data => {
                    this.busy = !data
                })
            }
        }
        ,components:{
            shopBlock
        }
    }
</script>
