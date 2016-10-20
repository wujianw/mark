<template>
    <header class="header-nav-wrap">
        <nav class="flex-space header-nav load-wrap flex-center">
            <router-link tag="div" active-class="load-active" class="load-link" v-for="item in links" :to="item.to" >{{item.name}}</router-link>
        </nav>
        <router-view></router-view>
    </header>
</template>
<style lang="scss">
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
<script type="text/babel">
    import blockBtn from './blockBtn'
    export default {
        data() {
            return {

            }
        }
        ,components:{
            blockBtn
        }
        ,props:{
            links:{
                type:Object,
                default() {
                    return {
                        to:{name:""}
                        ,name:""
                    }
                }
            }
        }
    }
</script>
