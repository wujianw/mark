<template>
    <div class="search-el">
        <header class="flex-center header-search">
            <input type="search" placeholder="输入商品搜索" v-model="searchContent" @focus="onFocus" @blur="onBlur" >
            <button v-if="!showBg" @click="opClick">{{searchContent ? "搜索" : "取消"}}</button>
        </header>
        <ul class="history-wrap" v-show="showRecord">
            <li class="flex-space" v-for="item in searchHistorys">
                <span @click="insertHis(item)">{{item}}</span>
                <i class="icon icon-off" @click="deleteHis(item)"></i>
            </li>
        </ul>
    </div>
</template>
<style lang="scss" rel="stylesheet/scss">
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
            padding:0 20px;
            background: #fff;
            overflow: auto;
            &::-webkit-scrollbar{width:0;}
            span{flex-grow: 1}
            li {
                line-height:2;
                border-bottom: 1px solid #f2f2f2;
                font-size:28px;
                i{
                    font-size: 32px;
                    color: #afafaf;
                }
            }
        }
    }
</style>
<script >
    export default{
        data(){
            return{
                searchContent:""
                ,showBg:true
                ,showRecord:false
                ,searchHistorys:[]
            }
        }
        ,methods:{
            onFocus(){
                if(window.localStorage.searchHistory!=undefined&&window.localStorage.searchHistory!=""){
                    this.searchHistorys=window.localStorage.searchHistory.substr(0,window.localStorage.searchHistory.length-1).split(",").reverse()
                }
                this.showBg=false
                this.showRecord=true
            }
            ,opClick(){
                if(!this.searchContent){
                    this.doSearch()
                    this.showBg=false
                    this.showRecord=false
                }else{
                    this.showBg=true
                    this.showRecord=false
                }
            }
            ,doSearch(){
                let reg =new RegExp(this.searchContent)
                if(window.localStorage.searchHistory==undefined||window.localStorage.searchHistory==""){
                    window.localStorage.searchHistory=this.searchContent+","
                }else if(window.localStorage.searchHistory.match(reg)==null){
                    window.localStorage.searchHistory+=this.searchContent+","
                }
            }
            ,insertHis(n){
                this.searchContent=n
                this.doSearch()
                this.showRecord=false
            }
            ,deleteHis(n){
                let tmp =n+","
                window.localStorage.searchHistory=window.localStorage.searchHistory.replace(tmp,'')
                this.searchHistorys=this.searchHistorys.filter(item=>n!=item)
            }
        }
    }
</script>
