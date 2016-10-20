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
                        <i v-for="n in 5" class="icon icon-evaluate">&nbsp</i>
                        <span>{{evaluate}}评价</span>
                        <i class="icon icon-evaluate half-style">&nbsp</i>
                    </div>
                </div>
            </div>
            <div class="integral-distance">
                <div class="distance">1.8km</div>
                <div class="integral">10%</div>
            </div>
        </div>
        <div><i class="icon icon-benefit"></i><span></span></div>
        <div><i class="icon icon-special"></i><span></span></div>
    </div>
</template>
<style lang="scss">
    .shop-block-el{
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
                    width:1em;
                    font-size:22px;
                    color: transparent;
                    overflow:hidden;
                    white-space: pre;
                }
                .half-style:before {
                    display:block;
                    z-index:1;
                    position:absolute;
                    top:0;
                    width: 50%;
                    overflow:hidden;
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
    }

</style>
<script type="text/babel">
    export default {
        data() {
            return {
                evaluate:0
            }
        }
    }
</script>