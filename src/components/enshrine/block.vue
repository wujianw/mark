<template>
    <div class="enshrine-block-el flex-space">
        <div class="flex-start">
            <div><img src="../../../static/img/good-pic.jpg" alt=""></div>
            <slot></slot>
        </div>
        <div>
            <div class="btn-wrap">
                <div class="btn flex-center">
                    <div>取消收藏</div>
                    <div class="in in-shop"></div>
                </div>
                <i class="icon"></i>
            </div>
        </div>
    </div>
</template>
<style lang="scss">
.btn-wrap{
    position:relative;
    .btn{
        position: absolute;
        right:0;
        height:40px;
        border-radius:.3em;
        background:#afafaf;
        text-align: center;
        font-size:26px;
        color:#fff;
        div{ width:5em; }
        .in{
            position:relative;
            border-left:1px solid #f2f2f2;
            &:after{position:absolute;right:-0.25em;width:.5em;height:.5em;background:#fff;}
        }
        .in-shop:before{content:"进入店铺";}
    }
}

</style>
<script type="text/babel">
    export default{
        data(){
            return{

            }
        }
        ,components:{

        }
    }
</script>
