<template>
    <div class="submit-el">
        <input type="button" :value="value" :disabled="dis" @click.prevent="commit">
    </div>
</template>
<style lang="scss">
    .submit-el{
        input{
            width:100%;
            line-height:80px;
            border: none;
            border-radius:.2em;
            background:#e85352;
            font-size:30px;
            color:#fff;
            &[disabled]{
                 background:#afafaf;
            }
        }
    }
</style>
<script type="text/babel">
    /*
     *提交按钮组件
     */
    export default{
        methods:{
            commit(){
                this.$emit('commit')
            }
        },
        props:{
            value:{
                type:String,
                default:"提交"
            }
            ,dis:{
                type:Boolean
                ,default:true
            }
        }
    }
</script>
