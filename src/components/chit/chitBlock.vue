<template>
    <router-link tag="div" :to="to" class="chit-block-el flex-space">
        <div class="chit-content">
            <h3>{{name}}</h3>
            <p :data-num="code">券码</p>
            <p>有效期至{{date}}</p>
        </div>
        <div class="pic-code flex-center">
            <img src="../../../static/img/pic-code.png" alt="">
        </div>
    </router-link>
</template>
<style lang="scss" rel="stylesheet/scss">
    .chit-block-el{
        border-top:22px solid #f2f2f2;
        background:#fff url('../../assets/img/chit-block-bg.png') no-repeat;
        .chit-content{
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
            code:String,
            name:String,
            date:String,
            to:{
                type:Object,
                default() {
                    return {
                        name:"chitDetails",
                        query:{
                            codeContent:'http://www.jfb315.com'
                        }
                    }
                }
            }
        }
    }
</script>
