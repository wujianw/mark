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
    export default {
        data() {
            return {
                showLoading: false,
                showModal: false
            }
        }
        ,computed: {
            ...mapGetters({
                areaList:"areaList"
            })
        }
        ,created() {
            let self = this
            Vue.http.interceptors.push((request, next) =>  {
                self.showLoading = true
                next((response) => {
                    if(!response.ok){
                        //if(response.status == 400) response.statusText ="登入超时，请重新登入"
                        MessageBox.alert(response.statusText || "系统繁忙，请稍后再试！")
//                        console.log("失败")
                    }
                    self.showLoading = false
                    return response
                })
            })
            // 初始化区县数据
            if(!this.areaList || this.areaList.length == 0){
                this.$store.dispatch("allArea")
            }
//            window.localStorage.lat = 30.267442999999997
//            window.localStorage.lon = 120.152792
            if(!window.localStorage.lat){
                navigator.geolocation.getCurrentPosition(function(position){
                    let lat = position.coords.latitude,
                        lon = position.coords.longitude
                    window.localStorage.lat = lat
                    window.localStorage.lon = lon
                    console.log(lat+','+lon)
                },function(error){
                    MessageBox.alert("定位失败").then(()=>{
                        // 去默认定位
                    })
                })
            }
            console.log(window.localStorage.lat)
            console.log(window.localStorage.lon)
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
        min-height:100%;
        .view-top{
            height:100%;
        }
    }
    .flex-center{display: flex;align-items: center;justify-content: center;}
    .flex-start{display: flex;align-items: center;justify-content: flex-start;}
    .flex-space{display: flex;align-items: center;justify-content: space-between;}
    .flex-end{display: flex;align-items: center;justify-content: flex-end;}
    .flex-end-end{display: flex;align-items: flex-end;justify-content: flex-end;}
    .flex-space-around{display: flex;align-items: center;justify-content: space-around;}
    .nowrap{white-space:nowrap; text-overflow:ellipsis; -o-text-overflow:ellipsis; overflow:hidden;/* width:14em; */}
</style>
