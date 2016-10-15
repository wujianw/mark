<template>
    <div id="app">
        <user-load></user-load>
    </div>
</template>
<script>
    import userLoad from './components/Loads'

    export default {
        components: {
            userLoad
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
</style>
