<template>
    <div id="app">
        <router-view class="view-top" v-if="showView"></router-view>
        <loading v-show="showLoading"></loading>
    </div>
</template>
<script type="text/babel">
    import loading from './components/loading'
    import Vue from 'vue'
    import MessageBox from './msgbox'
    import { mapGetters } from 'vuex'
    import WX from './api/wx'
    import shop from './api/shop'
    export default {
        data() {
            return {
                showLoading: false,
                showModal: false,
                showView:false
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

            // 初始化获取经纬度
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

                        })
                        wx.ready(function(){
                            wx.getLocation({
                                type: 'gcj02', // 默认为wgs84的gps坐标,'gcj02'
                                success:function(res) {
                                    latitude = res.latitude // 纬度，浮点数，范围为90 ~ -90
                                    longitude = res.longitude // 经度，浮点数，范围为180 ~ -180。
                                    self.getGeography({latitude,longitude})
                                }
                            })
                        })
                    })
                self.showView = true
            }
            if(process.env.NODE_ENV != 'production'){
                window.localStorage.lat = 30.267442999999997
                window.localStorage.lon = 120.152792
            }
            return true
        }
        ,methods:{
            getGeography({latitude,longitude}={}) {
                let self = this
                let params = { gcjLon:latitude,gcjLat:longitude }
                shop.getLonLat(params).then(data => {
                    let latitude = data.bdlat,
                        longitude = data.bdlon
                    window.localStorage.lon = longitude // 经度
                    window.localStorage.lat = latitude // 纬度
                    self.$store.dispatch('fetchGeography',{latitude,longitude}).then(() => {
                        self.showView = true
                    })
                })
            }
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
