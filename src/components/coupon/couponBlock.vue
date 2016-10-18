<template>
    <div class="coupon-block-el flex-space">
        <div class="coupon-content">
            <h3>测试代金券</h3>
            <div>
                <p :data-num="couponNum">券码</p>
                <p>有效期至{{date}}</p>
            </div>
        </div>
        <div class="pic-code flex-center">
            <img src="../../../static/img/pic-code.png" alt="">
        </div>
    </div>
</template>
<style lang="scss">
    .coupon-block-el{
        border-top:22px solid #f2f2f2;
        .coupon-content{
            padding-left:52px;
            h3{font-size:30px;line-height:1.6;}
            p{
                font-size:24px;
                line-height:1.5;
                color:#afafaf;
                &:after{content:attr(data-num);color:#505050;padding-left:25px;}
                &:first-of-type{font-size:28px;}
            }
        }
        .pic-code{
            height:168px;
            width:174px;
            border-left:1px solid #e0e0e0;
        }
    }
</style>
<script type="text/babel">
    export default{
        props:{
            chitNum:String,
            date:String,
            to:{
                type:Object,
                default() {
                    return {
                        name:"couponDetails"
                    }
                }
            }
        }
    }
</script>
