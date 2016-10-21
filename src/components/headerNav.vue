<template>
    <header class="header-nav-wrap">
        <nav class="flex-space header-nav load-wrap flex-center">
<<<<<<< HEAD
<<<<<<< HEAD
            <router-link tag="div" active-class="load-active" class="load-link" v-for="item in links" :to="item.to" >{{item.name}}</router-link>
=======
            <router-link tag="div" active-class="load-active" class="load-link" v-for="item in links" :to="item.to" replace>{{item.name}}</router-link>
>>>>>>> 7c6bba66ebdc46888a8e7b270da403a03b171902
=======
            <router-link tag="div" active-class="load-active" class="load-link" v-for="item in links" :to="item.to" replace>{{item.name}}</router-link>
>>>>>>> 200acd83eba2c8e2b16851d8fda8a3ee4e3657f9
        </nav>
        <router-view></router-view>
    </header>
</template>
<style lang="scss">
<<<<<<< HEAD
<<<<<<< HEAD
    .header-nav-wrap{
        .load-wrap{ background: #fff; text-align: center; }
        .load-link{ flex-grow: 1; font: 28px "Microsoft Yahei"; line-height:76px; border-bottom: 5px solid #afafaf; }
        .load-link span{ color: #505050; }
        .load-active{ border-bottom: 5px solid #e85350; }
        .load-active span{ color: #e85352; }
=======
=======
>>>>>>> 200acd83eba2c8e2b16851d8fda8a3ee4e3657f9
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
<<<<<<< HEAD
>>>>>>> 7c6bba66ebdc46888a8e7b270da403a03b171902
=======
>>>>>>> 200acd83eba2c8e2b16851d8fda8a3ee4e3657f9
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
