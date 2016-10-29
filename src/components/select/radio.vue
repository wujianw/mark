<template>
    <div class="radio-check">
        <input :type="type" :id="id" :name="name" :checked="check"/>
        <label :for="id" @touchstart="touchStart" @click="sum">
            {{text}}
            <slot></slot>
        </label>
    </div>
</template>
<style lang="scss" rel="stylesheet/scss">
    .radio-check{
        label{
            display:block;
            position:relative;
            height:85px;
            padding-left:24px;
            border-bottom:1px solid #f2f2f2;
            line-height:85px;
            font-size:26px;
            color:#373737;
            cursor:pointer;
            &:active{background:rgba(232,83,80,.2);}
        }
        input{display: none;}
        input+label:after {
            content:'';
            position:absolute;
            top:50%;
            right:40px;
            width:36px;
            height:36px;
            transform:translate(50%,-50%);
            border-radius:50%;
            border:2px solid #b0b0b0;
        }
        input:checked + label:after{
            border:2px solid #e85352;
        }
        /* 单选框样式 */
        input[type='radio']+label:before {
            content:'';
            position:absolute;
            top:50%;
            right:40px;
            width:24px;
            height:24px;
            transform:translate(50%,-50%);
            border-radius:50%;
            background:transparent;
        }
        input[type='radio']:checked + label:before{
            background:#e85352;
        }
        /* 复选框样式 */
        input[type='checkbox']+label:before {
            content:'\e61d';
            font-family:"iconfont" !important;
            font-size:44px;
            font-style:normal;
            -webkit-font-smoothing: antialiased;
            -webkit-text-stroke-width: 0.2px;
            -moz-osx-font-smoothing: grayscale;
            position:absolute;
            top:50%;
            right:40px;
            line-height:44px;
            transform:translate(50%,-50%);
            border-radius:50%;
            color:transparent;
        }

        input[type='checkbox']:checked + label:before{
            color:#e85352;
        }

    }
</style>
<script type="text/babel">
    /*
     *@params {name,id,text,type,check}
     */
    export default {
        data() {
            return {
                checked:false
            }
        },
        methods:{
            touchStart(){},
            sum(){
                this.checked = !this.checked
                this.$emit('sum', this.checked)
            }
        }
        ,props:{
            name:{
                type:String,
                default:""
            }
            ,id:{
                type:String,
                default:"awesome"
            }
            ,text:{
                type:String,
                default:""
            }
            ,type:{
                type:String,
                default:"radio"
            }
            ,check:{
                type:Boolean,
                default:false
            }
        }
    }
</script>
