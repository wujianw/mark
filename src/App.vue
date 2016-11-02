<template>
    <div id="app">
        <router-view></router-view>
        <loading v-show="showLoading"></loading>
    </div>
</template>
<script type="text/babel">
    import loading from './components/loading'
    import Vue from 'vue'
    import MessageBox from './msgbox';
    export default {
        data() {
            return {
                showLoading: false,
                showModal: false
            }
        }
        ,created() {
            let self = this
            Vue.http.interceptors.push((request, next) =>  {
                self.showLoading = true
                next((response) => {
                    if(!response.ok){
                        //if(response.status == 400) response.statusText ="登入超时，请重新登入"
                        MessageBox.alert(response.status || "系统繁忙，请稍后再试！")
//                        console.log("失败")
                    }
                    self.showLoading = false
                    return response
                })
            })
        }
        ,components:{
            loading
        }
    }

</script>
<style>
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
    }
    .flex-center{display: flex;align-items: center;justify-content: center;}
    .flex-start{display: flex;align-items: center;justify-content: flex-start;}
    .flex-space{display: flex;align-items: center;justify-content: space-between;}
    .flex-end{display: flex;align-items: center;justify-content: flex-end;}
    .flex-end-end{display: flex;align-items: flex-end;justify-content: flex-end;}
    .flex-space-around{display: flex;align-items: center;justify-content: space-around;}
    .nowrap{white-space:nowrap; text-overflow:ellipsis; -o-text-overflow:ellipsis; overflow:hidden;/* width:14em; */}
</style>
