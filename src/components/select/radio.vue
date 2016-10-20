<template>
    <div class="radio-check">
        <input type="checkbox" id="awesome" />
        <label for="awesome"></label>
    </div>
</template>
<style lang="scss">
        label{
            width:10px;height:10px;border:1px solid #000;
        }
        input{display: none;}
        input[type="checkbox"]+label::before {
            content:' ';
            border:1px solid #000;font-size: 28px;line-height:1;
        }
</style>
<script type="text/babel">
    export default {
        data() {
            return {}
        }
    }
</script>
