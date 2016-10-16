<template>
    <div>
        <div class="load-wrap flex-center" v-if="false">
            <router-link :to="{ name: 'loadMobile'}" active-class="load-active" class="load-link"><span>手机验证登入</span></router-link>
            <router-link :to="{ name: 'loadUser'}" active-class="load-active" class="load-link"><span>账号密码登入</span></router-link>
        </div>
        <router-view></router-view>
        <footer-nav></footer-nav>
    </div>
</template>
<script type="text/babel">
    import footerNav from './footerNav'
    export default {
        data () {
            return {

            }
        },
        components:{
            footerNav
        }

    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
    .load-wrap{ background: #fff; text-align: center; }
    .load-link{ flex-grow: 1; font: 28px/76px "Microsoft Yahei"; border-bottom: 5px solid #afafaf; }
    .load-link span{ color: #505050; }
    .load-active{ border-bottom: 5px solid #e85350; }
    .load-active span{ color: #e85352; }

    .left-enter-active, .left-leave-active {
        transition: opacity .5s;
    }
    .left-enter, .left-leave-active {
        opacity: 0;
    }
</style>
