<template>
    <div class="shop-block-el">
        <div class="flex-space">
            <div class="flex-start content-wrap">
                <div class="pic">
                    <img src="" alt="">
                </div>
                <div class="content">
                    <div class="shop-name">商家名称<i class="icon icon-yen"></i></div>
                    <div class="evaluate">
                        <i v-for="n in 5" class="icon icon-evaluate" :class="[n >= score + 1 ? 'no':'',n > score && n < score + 1 ? 'half-style' : '']"></i>
                        <span>{{evaluate}}评价</span>
                    </div>
                </div>
            </div>
            <div class="integral-distance">
                <div class="distance">1.8km</div>
                <div class="integral">10%</div>
            </div>
        </div>
        <div class="benefit-special">
            <div class="benefit"><i class="icon icon-benefit"></i>到店买单<span>9折（扫码立减）</span></div>
            <div class="special"><i class="icon icon-special"></i>商家E&nbsp店<span>多件特价正在进行中</span></div>
        </div>
    </div>
</template>
<style lang="scss">
    .shop-block-el{
        background:#fff;
        .pic{
            height:146px;
            width:226px;
            padding:12px;
            img{width:100%;height:100%;}
        }
        .content{
            padding-left:15px;
            .shop-name{
                font-size:30px;
                color:#505050;
                i{font-size:30px;color:#e95453;}
            }
            /* 评价 */
            .evaluate{
                padding-top:26px;
                font-size:20px;
                color:#afafaf;
                i{margin-right:12px;color:#f9a929;font-size:22px;}
                i.no{color:#e0dfdf;}
                span{padding-left:2px;}
                /* 半个星星 */
                .half-style {
                    position:relative;
                    display:inline-block;
                    width:22px;
                    font-size:22px;;
                    height:18px;
                    color: transparent;
                    /*overflow:hidden;*/
                    white-space: pre;
                }
                .half-style:before {
                    display:block;
                    z-index:1;
                    position:absolute;
                    top:0;
                    width: 50%;
                    /*overflow:hidden;*/
                    color: #f9a929;
                }
                .half-style:after {
                    display:block;
                    direction: rtl;
                    position:absolute;
                    z-index:2;
                    top:0;
                    left:50%;
                    width: 50%;
                    content: "\e622";
                    overflow:hidden;
                    color: #e0dfdf;
                }
            }
        }
        /* 积分率&距离 */
        .integral-distance{
            align-self:flex-start;
            .distance{
                text-align:center;
                line-height:68px;
                font-size:20px;
                color:#838383;
            }
            .integral{
                margin-top:16px;
                padding:0 10px 0 20px;
                background:#f9a929;
                background:
                        linear-gradient(135deg,transparent 15px , #f9a929 0) top left,
                        linear-gradient(45deg,transparent 15px , #f9a929 0) bottom left;
                background-size:100% 50%;
                background-repeat:no-repeat;
                line-height:30px;
                color:#fff;
                &:before{content:"赠";}
                &:after{content:"养老金";}
            }

        }
        /* 活动简介--> 优惠&特殊 */
        .benefit-special{
            border-top:1px solid #f2f2f2;
            border-bottom:1px solid #f2f2f2;
            color:#505050;
            font-size:22px;
            i{padding:12px;font-size:26px;}
            .benefit{
                padding:16px 0 8px;
                i{color:#f7a926;}
            }
            .special{
                padding:8px 0 16px;
                i{color:#e85350;}
            }
            span{padding-left:40px;color:#afafaf;}
        }
    }

</style>
<script type="text/babel">
    export default {
        data() {
            return {
                evaluate:0,
                score:3
            }
        }
        ,computed:{
        }
        ,methods:{
        }
    }
</script>
