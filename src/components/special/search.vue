<template>
    <div class="search-el-wrap">
        <div class="search-el">
            <header class="flex-center header-search">
                <input type="search" placeholder="输入商品搜索" v-model="searchContent" @focus="onFocus">
                <button v-if="showBtn" @click="opClick">{{searchContent ? "搜索" : "取消"}}</button>
            </header>
            <ul class="history-wrap" v-show="showRecord">
                <li class="flex-space" v-for="(item,index) in searchHistorys">
                    <span @click="insertHis(item)">{{item}}</span>
                    <i class="icon icon-off" @click="deleteHis(index)"></i>
                </li>
            </ul>
        </div>
        <div v-infinite-scroll="more" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
            <div class="nearby-list">
                <good-item v-for="good in specialGoods" :good="good"></good-item>
            </div>
        </div>
    </div>
</template>
<style lang="scss" rel="stylesheet/scss">
    .search-el-wrap{
        padding-top:105px;
        background: #fff;
    }
    .search-el{
        position:fixed;
        z-index:5;
        top:0;
        width: 750px;
        background: #afafaf;
        /* 搜索框头部 */
        .header-search{
            margin:15px 20px;
            button{
                width:5em;
                margin:5px 0 5px 15px;
                background:#e85453;
                border-radius: .2em;
                line-height:60px;
                font-size:28px;
                color:#fff;
            }
            input{
                flex-grow: 2;
                margin:7px 0;
                padding: 0 15px;
                border:none;
                border-radius: 5px;
                background:#fff;
                line-height: 60px;
                font-size: 24px;
                color: #afafaf;
                &::-webkit-input-placeholder{
                    text-align: center;
                }
            }
        }

        /* 历史记录 */
        .history-wrap{
            max-height: 400px;
            padding-left:20px;
            background: #fff;
            overflow: auto;
            &::-webkit-scrollbar{width:0;}
            span{flex-grow: 1}
            li {
                line-height:2;
                border-bottom: 1px solid #f2f2f2;
                font-size:28px;
                i{
                    padding:0 20px;
                    font-size: 32px;
                    color: #afafaf;
                }
            }
        }
    }
</style>
<script >
    import shop from "../../api/shop"
    import { mapGetters } from 'vuex'
    import goodItem from './indexGoodItem'
    export default{
        data(){
            return{
                busy :true
                ,searchContent:""
                ,showBtn:false //按钮的显示和隐藏
                ,showRecord:false // 历史记录显示和隐藏
                ,searchHistorys:[] // 搜索历史记录
                ,specialGoods:[] // 特产商品
            }
        }

        ,computed:{
            ...mapGetters({
                geography:'geography'
            }),
            params() {
                return {
                    type:'',// 特卖类型 特卖类别（18,19,20,21）
                    lon:this.geography.longitude || window.localStorage.lon || '',
                    lat:this.geography.latitude || window.localStorage.lat || '',
                    start:0,
                    rows:10,
                    goodsName:this.searchContent// 模糊查询用
                }
            }
        }
        ,created() {
            /*
            * 从本存储中读取 历史搜索记录
            * */
            let searchHistory = window.localStorage.searchHistory
            searchHistory && (this.searchHistorys = JSON.parse(searchHistory))
        }
        ,methods:{
            onFocus(){
                this.showBtn = this.showRecord = true
            },
            opClick(){
                if(this.searchContent){
                    this.doSearch()
                    this.showBtn=true
                }else{
                    this.showBtn = this.showRecord = false
                }
            },
            doSearch(){
                if(this.searchHistorys.indexOf(this.searchContent) == -1){
                    this.searchHistorys.push(this.searchContent)
                }
                this.showRecord = false
                /*
                * 这里不能用this.more() 无限加载bug
                * */
                this.busy = true
                this.specialGoods = []
                this.fetchData()
            },
            insertHis(item){// 点击历史进行搜索
                this.searchContent = item
                this.doSearch()
            },
            deleteHis(index){// 删除历史记录
                this.searchHistorys.splice(index,1)
            },
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
        ,beforeDestroy() {// 销毁前数据做本地存储
            window.localStorage.searchHistory = JSON.stringify(this.searchHistorys)
        }
        ,components:{goodItem}
    }
</script>
