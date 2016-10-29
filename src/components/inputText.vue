<template>
    <div class="flex-space input-el">
        <div class="input flex-space">
            <i class="icon" :class="icon.iconClass" :style="styleObj"></i>
            <input :type="type" :value="value" :placeholder="placeholder" :maxlength="maxLength" @input="onInput">
            <i class="icon icon-off" @click="emptyText"></i>
        </div>
        <slot></slot>
    </div>
</template>
<style lang="scss" rel="stylesheet/scss">
    $placeholderColor:#e1dfdf;
    .input-el{
        flex-grow: 2;
        padding:12px 0;
        height:74px;
        .input{
            flex-grow:3;
            height:100%;
            border-radius:10px;
            background:#fff;
            i:first-of-type{
                width:60px;
                text-align:center;
                font-size:40px;
                color:#afafaf;
            }
            i:last-of-type{
                width:56px;
                text-align:center;
                font-size:32px;
                color:#afafaf;
            }
            input{
                flex-grow:2;
                padding-left:20px;
                border:none;
                border-left:1px solid #afafaf;
                font-size:30px;
                line-height:42px;
                color:#000;
                &::-webkit-input-placeholder {color:$placeholderColor;font-size:25px;}
                &:-moz-placeholder {color:$placeholderColor;font-size:25px;}
                &::-moz-placeholder {color:$placeholderColor;font-size:25px;}
                &:-ms-input-placeholder {color:$placeholderColor;font-size:25px;}
                &:focus+i:last-of-type{
                    color:#000;
                }
            }
        }
    }
</style>
<script type="text/babel">
    /*
     *@v-model 语法糖 =>  <input :value="value" @input="onInput">
     *@params {placeholder,icon,details:"状态说明"}
     */
    export default {
        data() {
            return {
                styleObj: {
                    color:this.icon.color
                }
            }
        }
        ,methods: {
            emptyText() {
                this.$emit('input', "")
            }
            ,onInput(event) {
                //此处的  'input' 为父组件 v-model 语法糖中的 @input
                this.$emit('input', event.target.value)
            }
        }
        ,props: {
            placeholder: String
            ,icon: {
                type:Object,
                default: function () {
                    return {
                        iconClass:'',
                        color:'#505050'
                    }
                }
            }
            ,type: {
                type: String,
                default: "text"
            }
            ,maxLength: String
            ,value: {
                type:String,
                default: ""
            }
        }
    }
</script>
