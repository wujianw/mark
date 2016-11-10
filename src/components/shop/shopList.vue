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
            <ul class="menu-ul city-ul">
                <li v-for="item in cityList" :data-text="item.currentName"></li>
            </ul>
            <ul class="menu-ul area-ul">
                <li v-for="item in areaList" :data-text="item.currentName"></li>
            </ul>
        </div>
        <div class="shade" :class="isActive ? 'active' : ''" @click="showShade"></div>
        <div v-infinite-scroll="more" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
            <shop-block v-for="item in shopList" :obj="item" :key="shopList.merchant_id"></shop-block>
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
            .city-ul{
                left:33%;
                width:33%
            }
            .area-ul{
                left:66%;
                width:33%
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
            .active~.menu-ul{
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
                nav:null,
                wxJson:{}
            }
        }
        ,created() {
            if(!this.shopMenu || this.shopMenu.length == 0){
                this.$store.dispatch("shopMenu")
            }
            if(!this.areaList || this.areaList.length == 0){
                this.$store.dispatch("toggleCity")
                this.$store.dispatch("toggleProvince")
            }
//            this.more(true)
//            let self = this
//            let fullPath = window.location,
//                url = '/wechatpay/uniform_orde.json?url='+fullPath
//            self.$http.get(url).then(res =>{
//                let data = JSON.parse(res.data)
//                self.wxJson = data.data
//            }).then(() => {
//                wx.config({
//                    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
//                    appId: self.wxJson.appid, // 必填，公众号的唯一标识
//                    timestamp: self.wxJson.timestamp, // 必填，生成签名的时间戳
//                    nonceStr: self.wxJson.noncestr, // 必填，生成签名的随机串
//                    signature: self.wxJson.signature,// 必填，签名，见附录1
//                    jsApiList: ['scanQRCode'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
//                });
//                wx.ready(function(){
//                    wx.scanQRCode({
//                        needResult: 0, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
//                        scanType: ["qrCode","barCode"], // 可以指定扫二维码还是一维码，默认二者都有
//                        success: function (res) {
//                            var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
//                        }
//                    });
//                });
//            })
        }
        ,computed: {
            ...mapGetters({
                shopMenu:'shopMenu',
                provinceList:'provinceList',
                areaList:'areaList',
                cityList:'cityList',
                shopList:'shopList',
                cityCode:'cityCode'
            }),
            nav() {
                return {
                    areaCode:{
                        text:"区县",
                        code:'',
                        list:this.provinceList
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
            params() { // 数据请求参数
                return {
                    lon:window.localStorage.lon,
                    lat:window.localStorage.lat,
                    local:1,
                    keywords:'',
                    limit:10,
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
                let dataSet = event.target.dataset,
                    type = dataSet.type,
                    text = dataSet.text,
                    code = dataSet.code
                this.params[type] = code
                console.log(1212)

//                this.more(true).then(() => {
//                    this.nav[type].text = text
//                    this.nav[type].code = code
//                    this.isActive = false
//                })
            }
            ,more(way) {
                this.busy = true
                return this.$store.dispatch("shopList",{params:this.params,way}).then(data => {
                    this.busy = !data
                    return Promise.resolve()
                })
            }
        }
        ,components:{
            shopBlock
        }
    }
</script>
