<template>
    <div id="app">
<<<<<<< HEAD
        <user-load></user-load>
    </div>
</template>
<script>
    import userLoad from './components/loads'
    export default {
        components: {
            userLoad
=======
        <router-view></router-view>
    </div>
</template>
<script>
//    import userLoad from './components/loads'
    export default {
        components: {
//            userLoad
>>>>>>> 7c6bba66ebdc46888a8e7b270da403a03b171902
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
        height:100%;
    }
    .flex-center{display: flex;align-items: center;justify-content: center;}
    .flex-start{display: flex;align-items: center;justify-content: flex-start;}
    .flex-space{display: flex;align-items: center;justify-content: space-between;}
    .flex-end{display: flex;align-items: center;justify-content: flex-end;}
    .flex-end-end{display: flex;align-items: flex-end;justify-content: flex-end;}
    .flex-space-around{display: flex;align-items: center;justify-content: space-between;}
</style>
