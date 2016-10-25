<template>
    <div class="shop-details-el">
        <header class="hd">
            <img src="" alt="">
        </header>
        <section>
            <div class="title-wrap flex-space">
                <h3>积分宝体验店</h3>
                <div class="integral">10%</div>
            </div>
            <div class="position-wrap flex-space">
                <div class="position">
                    <i class="icon icon-position"></i>
                    <span>滨江区..0.0.0.0.0.</span>
                </div>
                <div class="phone">
                    <i class="icon icon-benefit"></i>
                </div>
            </div>
        </section>
        <section class="sweep-pay-wrap section">
            <div class="sweep-pay title-wrap flex-space">
                <div class="title">
                    <i class="icon icon-benefit"></i>
                    <span>到店买单</span>
                </div>
                <span class="sweep-pay-link">我要买单</span>
            </div>
            <div class="active-rule">
                <p>满就10减2元，最高减免50元</p>
            </div>
        </section>
        <section class="coupon-wrap section">
            <div class="coupon title-wrap flex-space">
                <div class="title">
                    <i class="icon icon-special"></i>
                    <span>商家优惠券</span>
                </div>
            </div>
            <div class="coupon-list">
                <div class="coupon-item flex-space">
                    <div class="bg">
                        <p class="gold">20.0</p>
                    </div>
                    <div class="rule">满30使用</div>
                    <div class="btn">
                        <span>领取</span>
                    </div>
                </div>
            </div>
        </section>
        <section class="good-wrap section">
            <div class="good title-wrap flex-space">
                <div class="title">
                    <i class="icon icon-special"></i>
                    <span>商家E店</span>
                </div>
            </div>
            <ul class="good-list">
                <good-item></good-item>
            </ul>
        </section>
        <div class="link-picword">
            <p>向下拖动 查看详情</p>
        </div>
    </div>
</template>
<style lang="scss">
    .coupon-list{
        margin-left:66px;
        .coupon-item{
            height:90px;
            border-bottom:1px solid #f2f2f2;
            .bg{
                width:120px;
                background:url("../../assets/img/shop-coupon-bg.png") no-repeat;
                background-size:100% 100%;
                text-align: center;
                line-height:76px;
                font-size:22px;
                font-family:"Microsoft Yahei";
                color:#fff;
                .gold{
                    &:before{content:"￥";font-size:14px;}
                }
            }
            .rule{
                font-size:22px;
                color:#afafaf;
            }
            .btn{
                padding:0 24px;
                span{
                    display: inline-block;
                    width:138px;
                    border:1px solid #e85352;
                    border-radius: .2em;
                    text-align: center;
                    line-height:50px;
                    font-size:26px;
                    color:#e85352;
                }
            }
        }
    }
    .active-rule{
        text-align:center;
        p{line-height:66px;font-size:22px;color:#505050;}
    }
    .shop-details-el{
        background:#fff;
        .hd{
            position:relative;
            height:380px;
            img{width:100%;height:100%;}
        }
        /* 标题&积分率 */
        .title-wrap{
            height:90px;
            h3{
                padding-left:26px;
                text-align:center;
                font-size:32px;
                color:#505050;
            }
            .integral{
                padding:0 20px 0 30px;
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
        /* 位置 */
        .position-wrap{
            height:66px;
            padding-left:26px;
            border-top:1px solid #f2f2f2;
            .position{

                font-size:26px;
                color:#807f7f;
                span{padding-left:12px;}
                i{font-size:26px;}
            }
            .phone{
                padding:2px 22px;
                border-left:1px solid #f2f2f2;
                color:#e85352;
                i{font-size:40px;}
            }
        }
        /* section 通用样式 */
        .section{
            border-top:16px solid #f2f2f2;
            .title-wrap{
                height:84px;
                padding:0 22px 0 26px;
                border-bottom:1px solid #f2f2f2;
                .title{
                    span{
                        padding-left:26px;
                        font-size:28px;
                        color:#505050;
                    }
                    i{font-size:26px;}
                }
                .sweep-pay-link{
                    display: inline-block;
                    width:138px;
                    border-radius: .2em;
                    background:#e85352;
                    text-align: center;
                    line-height:52px;
                    font-size:24px;
                    color:#fff;
                }
            }
        }
        /* 到店买单 */
        .sweep-pay{
            i{color:#f8ac20;}
        }
        /* 商家优惠券 */
        .coupon{
            i{color:#f8ac20;}
        }
        .good{
            i{color:#e65150;}
        }
        .link-picword{
            margin-bottom:88px;
            text-align:center;font:20px/78px "微软雅黑";color:#505050;background:#e3e3e3;
            background:linear-gradient(0deg,#e3e3e3 38px,#a4a4a4 1px,#e3e3e3 39px) top left,
            linear-gradient(0deg,#e3e3e3 38px,#a4a4a4 1px,#e3e3e3 39px) bottom right,
            linear-gradient(0deg,#e3e3e3 38px,#e3e3e3 1px,#e3e3e3 39px) center;
            background-size: 266px 100%;background-repeat:no-repeat;}

    }
</style>
<script type="text/babel">
    import goodItem from "./goodItem"
    export default{
        data(){
            return{

            }
        }
        ,components:{
            goodItem
        }
    }
</script>
