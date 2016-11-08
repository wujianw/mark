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
                <div class="nav-sort flex-center" @click="showSelect(countyList)">
                    <span>区县</span>
                    <i class="icon"
                       :class="isActive ? 'icon-pull-down' : 'icon-pull-down-after'"></i>
                </div>
                <div class="nav-sort flex-center" @click="showSelect(shopMenu)">
                    <span>分类</span>
                    <i class="icon icon-pull-down"></i>
                </div>
                <div class="nav-sort flex-center" @click="showSelect(sort)">
                    <span>排序</span>
                    <i class="icon icon-pull-down"></i>
                </div>
            </nav>
            <ul class="menu-ul" @click="toggleList">
                <li v-for="item in list"
                    :data-type="item.currentCode ? 'currentCode' : item.menu_code ? 'menu_code' : 'sortrule'"
                    :data-name="item.currentCode || item.menu_code || item.sortrule">
                    <span>{{item.currentName || item.menu_subtitle || item.name}}</span>
                </li>
            </ul>
        </div>
        <div class="shade" :class="isActive ? 'active' : ''" @click="showShade"></div>
        <div>
            <shop-block v-for="n in 4"></shop-block>
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
    export default {
        data() {
            return {
                isActive:false,
                list:null,
                sort:[
                    {sortrule:"intelligence",name:"智能排序"},
                    {sortrule:"distance",name:"距离最近"},
                    {sortrule:"ratio",name:"积分率最高"}
                ]
            }
        }
        ,created() {
            if(!this.shopMenu || this.shopMenu.length == 0){
                this.$store.dispatch("shopMenu")
            }
            this.$store.dispatch("toggleArea")
        }
        ,computed: {
            ...mapGetters({
                shopMenu:'shopMenu',
                countyList:'countyList'
            })
        }
        ,methods:{
            showSelect(data) {
                if(!this.isActive){
                    this.isActive = true
                }else if(this.isActive && this.list == data){
                    this.isActive = false
                }
                this.list = data
            }
            ,showShade() {
                this.isActive = false
            }
            ,toggleList(event) {
                let dataSet = event.target.dataset,
                    type = dataSet.type,
                    name = dataSet.name
                let params = {
                    currentCode:'',
                    menu_code:'',
                    sortrule:''
                }
                params[type] = name
                console.log(params)
            }
        }
        ,components:{
            shopBlock
        }
    }
</script>
