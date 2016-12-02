<template>
    <div id="app">
        <router-view class="view-top"></router-view>
        <loading v-show="showLoading"></loading>
    </div>
</template>
<script type="text/babel">
    import loading from './components/loading'
    import Vue from 'vue'
    import MessageBox from './msgbox'
    import { mapGetters } from 'vuex'

    import shop from './api/shop'
    export default {
        data() {
            return {
                showLoading: false,
                showModal: false
            }
        }
        ,computed: {
            ...mapGetters({
                areaList:"areaList",
                geography:"geography"
            })
        }
        ,created:function() {
            let self = this
            Vue.http.interceptors.push((request, next) =>  {
                self.showLoading = true
                next((response) => {
                    if(!response.ok){
                        //if(response.status == 400) response.statusText ="登入超时，请重新登入"
//                        MessageBox.alert(response.statusText || "系统繁忙，请稍后再试！")
//                        console.log("失败")
                    }
                    self.showLoading = false
                    return response
                })
            })
            window.localStorage.openId = document.getElementById("open").value
            console.log(window.localStorage.openId)
            let appVersion = window.navigator.appVersion.toLowerCase(),  //客户端信息
                isSystem = appVersion.indexOf("micromessenger")>-1
            if(process.env.NODE_ENV != 'production' && !isSystem){
                window.localStorage.lat = 30.267442999999997
                window.localStorage.lon = 120.152792
            }
            return true
        }
        ,components:{
            loading
        }
    }
</script>
<style lang="scss" rel="stylesheet/scss">
    html {
        height: 100%;
    }
    body {
        position:relative;
        height: 100%;
        background: #f2f2f2;
    }
    #app{
        /*overflow:hidden;*/
        min-height:100%;
        .view-top{
            height:100%;
        }
    }

    /* 无限加载结束时显示---暂无更多 */
    .no-more{
        display:none;
        border-top:1px solid #f2f2f2;
        background: #fff;
        text-align: center;
        font:20px "Microsoft Yahei";
        color:#505050;
        transition: opacity 1s;
        &:before{content:"暂无更多";line-height:78px;}
    }
    .no-more.show{
        display: block;
    }
    .message-count{
        width:100%;
        line-height:1.5;
        font-size:26px;
        h2{font-size:40px;}
        h3{font-size:36px;}
        h4{font-size:30px;}
        p{font-size:28px;}
        img{
            max-width:100%
        }
    }
    /* -----内容------   结构样式 */
    .link-picword{
        margin-bottom:88px;
        text-align:center;font:26px/78px "微软雅黑";color:#505050;background:#e3e3e3;
        background:linear-gradient(0deg,#e3e3e3 38px,#a4a4a4 1px,#e3e3e3 40px) top left,
        linear-gradient(0deg,#e3e3e3 38px,#a4a4a4 1px,#e3e3e3 40px) bottom right,
        linear-gradient(0deg,#e3e3e3 38px,#e3e3e3 1px,#e3e3e3 40px) center;
        background-size: 266px 100%;background-repeat:no-repeat;
    }
    .flex-center{display: flex;align-items: center;justify-content: center;}
    .flex-start{display: flex;align-items: center;justify-content: flex-start;}
    .flex-space{display: flex;align-items: center;justify-content: space-between;}
    .flex-end{display: flex;align-items: center;justify-content: flex-end;}
    .flex-end-end{display: flex;align-items: flex-end;justify-content: flex-end;}
    .flex-space-around{display: flex;align-items: center;justify-content: space-around;}
    .nowrap{white-space:nowrap; text-overflow:ellipsis; -o-text-overflow:ellipsis; overflow:hidden;/* width:14em; */}
</style>
