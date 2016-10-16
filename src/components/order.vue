<template>
    <div class="order-el">
        <header class="flex-space header" :data-status="obj.statusName">
            <div class="title flex-space" :data-shop="obj.shopName">
                <div class="hd-logo"></div>
            </div>
        </header>
        <main class="">
            <div class="good-pic"><img src="" alt=""></div>
            <div class="good-details">
                <p>商品名称</p>
                <p>有效日期</p>
                <p>数量</p>
            </div>
        </main>
        <footer class="footer-btn flex-space">
            <router-link :to="obj.to">{{obj.btnName}}</router-link>
        </footer>
    </div>
</template>
<style lang="scss">
    .order-el{
        .header{
            height:64px;
            color:#505050;
            .title{
                &:after{
                     content:attr(data-shop);
                     font-size:26px;
                     color:#505050;
                 }
                .hd-logo{
                    width:50px;
                    height:50px;
                    margin:0 12px;
                    border-radius:50%;
                    background:#ee4e51;
                    text-align:center;
                    line-height:50px;
                    font-size:24px;
                    font-weight:700;
                    font-family:'Microsoft Yahei';
                    color:#fff;
                    &:after{content:"券";}
                }
            }
            &:after{content:attr(data-status);font-size:28px;color:#fcb111;}
        }
        .footer-btn{}
    }
</style>
<script type="text/babel">
    /*
     * params {obj:{}}
     */
    export default {
        data() {
            return {}
        }
        ,props:{
            obj:{
                type:Object,
                default: function() {
                    return {
                        status:""
                        ,statusName:"待消费"
                        ,shopName:"积分宝体验店"
                        ,to:{name:""}
                        ,btnName:""
                    }
                }
            }
        }
    }
</script>
