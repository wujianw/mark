<template>
    <div class="flex-center num-key-el">
        <ul class="">
            <li v-for="text in list" @click="simulate" :data-text="text"></li>
        </ul>
        <div @click="isComputed">完&nbsp&nbsp成</div>
    </div>
</template>
<style lang="scss" rel="stylesheet/scss">
.num-key-el{
    flex-direction: column;
    position:fixed;
    z-index: 500;
    bottom:0;
    width:750px;
    margin: 0 auto;
    background:#f2f2f2;
    text-align: center;
    font-size:38px;
    ul{
        background:#fff;
        width:100%;
        li{
            display: inline-block;
            width:calc(25% - 20px);
            border:10px solid #f2f2f2;

            line-height:160px;
            &:before{content:attr(data-text)}
        }
        li:last-of-type{color:#fff;}
    }
    div{
        width:100%;
        line-height:118px;
        background:#e85453;
        color:#fff;
    }
}
</style>
<script type="text/babel">
    /*
     * 箭头标签组件
     * @params
     */
    export default{
        data(){
            return{
                list:[1,2,3,'删除',4,5,6,0,7,8,9,'X']
            }
        }
        ,methods:{
            simulate(event) {
                let text = event.currentTarget.dataset.text
                this.$emit('simulate',text)
            },
            isComputed() {
                this.$emit('isComputed')
            }
        }
        ,components:{

        }
    }
</script>
