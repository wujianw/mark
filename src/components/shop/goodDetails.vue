<template>
    <div class="good-details-el">
        <header class="hd">
            <div class="hd-pic">
                <img src="" alt=""/>
            </div>
            <div class="hd-title">
                <p>{{goods.goodsName}}</p>
                <p>{{goods.goodsTitle}}</p>
            </div>
        </header>
        <section class="section gold-information flex-space">
            <div class="price flex-box">
                <p class="gold pro-pay"><span class="rmb">&yen</span>{{goods.buyPrice}}</p>
                <div>
                    <p class="old-pay">赠{{goods.buyPension}}元&#47;件</p>
                    <p class="gold market-pay">门市价:<span class="rmb">&yen</span>{{goods.marketPrice}}</p>
                </div>
            </div>
            <span class="color-size">已售:{{goods.virtualBuy}}笔</span>
        </section>
        <section class="section inventory-quota flex-space">
            <div class="color-size">库存：</div>
            <div class="color-size">每人限购:{{goods.canBuyNum}}件</div>
        </section>
        <section class="gd-mark flex-start">
            <span>到店使用</span>
            <span>支持退货</span>
        </section>
        <main>
            <section class="lump">
                <h3>
                    <p>商品评论({{countreview}}人评价)</p>
                </h3>
                <div class="lump-content">
                    <good-review></good-review>
                </div>
            </section>
            <section class="lump">
                <h3>
                    <p>商家信息</p>
                </h3>
                <div class="lump-content flex-space shop">
                    <!--<div class="pic-shop"><img src="" alt=""></div>-->
                    <div class="info">
                        <p class="info-name">{{shop.name}}</p>
                        <p>{{shop.address}}</p>
                        <p><i class="icon icon-position"></i>1.8km</p>
                    </div>
                    <div>
                        电话
                    </div>
                </div>
            </section>
            <div class="link-picword">
                <p>向下拖动 查看详情</p>
            </div>
            <div id="picWord">
            </div>
        </main>
        <footer class="footer">
            <div class="flex-box ft">
                <div class="iphone" :data-phone="shop.telephone"><i class="icon icon-iphone"></i><p>电话</p></div>
                <div>
                    <p class="buy-btn">
                        <router-link :to="{name:''}">
                            立即购买
                        </router-link>
                    </p>
                </div>
            </div>
        </footer>
    </div>
</template>
<style lang="scss" rel="stylesheet/scss">
    .good-details-el{background:#fff;
        .gold .rmb{font-size:75%;font-family: "Microsoft YaHei";}
        .hd{position:relative;}
        .hd-pic{width:750px;height:750px;}
        .hd-pic img{width:100%;height:100%;}
        .hd-title{position:absolute;bottom:0;height:78px;padding:6px 25px;background:#000;opacity:.27;filter:alpha(opacity=27);}
        .hd-title p{white-space:nowrap; text-overflow:ellipsis; -o-text-overflow:ellipsis; overflow:hidden;color:#fff;}
        .hd-title p:nth-of-type(1){width:25em;font-size:28px;padding:10px 0;}
        .hd-title p:nth-of-type(2){width:30em;font-size:20px;}

        .flex-box{display: flex;}
        .section{
            padding:0 18px 0 30px;
            border-bottom:1px solid #f2f2f2;
            .color-size{
                color:#807f7f;
                font-size:24px;
            }
        }
        /* 商品金钱等信息 */
        .gold-information{
            height:108px;
            .price{
                align-items:flex-end;
                justify-content:flex-start;
                height:58px;
                .pro-pay{
                    color:#e85352;
                    font-size:28px;
                }
                .market-pay{
                    color:#807f7f;
                    font-size:20px;
                    font-family: "微软雅黑";
                    padding-left:10px;
                    padding-top:8px;
                }
                .old-pay{
                    display:inline-block;
                    padding:0 17px;
                    color:#fff;
                    font:20px/1.5 "微软雅黑";
                    background:#e8534f;
                    background:linear-gradient(135deg, transparent 12px, #e8534f 14px) top left,
                    linear-gradient(45deg, transparent 12px, #e8534f 14px) bottom left,
                    linear-gradient(90deg, transparent 10px, #e8534f 10px) top left,
                    linear-gradient(90deg, transparent 10px, #e8534f 10px) bottom left;
                    background-size:100% 50%;
                    background-repeat:no-repeat;
                }
            }
        }
        .inventory-quota{
            height:75px;
            border-bottom:1px solid #f2f2f2;
        }

        /* 服务 */
        .gd-mark{
            height:84px;
            padding-left:30px;
            &:before{content:"服务：";color:#838383;font-size:24px;}
            span{
                margin-right:.8em;
                padding:0 .3em;
                border:1px solid #f9a828;
                border-radius:.2em;
                text-align: center;
                line-height:1.8;
                font-size:20px;
                color:#f9a828;
            }
        }

        .lump{border-top:16px solid #e3e3e3;}
        .lump h3{
            display: flex;justify-content: space-between;
            font:24px/60px "Microsoft YaHei";
            padding:0 26px;
            border-bottom:1px solid #e6e6e6;
            color:#373737;
        }
        /* 商家信息 */
        .shop{
            padding:0 26px;
            .info{padding:14px 0;}
            p{padding:6px 0;color:#838383;font-size:20px;}
            p.info-name{color:#505050;font-size:26px;}
            .info-price p{display:inline-block;}
            .info-price .market-pay{color:#b5b5b5;}
        }

        .footer{position:fixed;bottom:0;width:750px;background:#f2f2f2;z-index:2;}
        .ft{justify-content: space-between;align-items:center;color:#838383;}
        .buy-btn a{display:inline-block;background:#e85350;height:88px;line-height:88px;font-size:40px;color:#fff;width:376px;text-align:center;}
        .iphone{font:20px/1.2 "Microsoft YaHei";padding:0 26px;border-right:1px solid #d9d9d9;text-align:center;}
        i.icon-iphone{font-size:38px;}

        /* 图文详情 */
        .link-picword{
            margin-bottom:88px;
            text-align:center;font:20px/78px "微软雅黑";color:#505050;background:#e3e3e3;
            background:linear-gradient(0deg,#e3e3e3 38px,#a4a4a4 1px,#e3e3e3 39px) top left,
            linear-gradient(0deg,#e3e3e3 38px,#a4a4a4 1px,#e3e3e3 39px) bottom right,
            linear-gradient(0deg,#e3e3e3 38px,#e3e3e3 1px,#e3e3e3 39px) center;
            background-size: 266px 100%;background-repeat:no-repeat;}
        #picWord {margin-bottom:88px;}
        #picWord img{max-width:100%;}
    }

</style>
<script type="text/babel">
    import goodReview from './goodReview'
    export default{
        data(){
            return{
                countreview:"121212"
            }
        }
        ,components:{
            goodReview
        }
        ,props:{
            goods:{
                type:Object,
                default() {
                    return {
                        goodsName:"积分宝体验店100代金券"
                        ,goodsTitle:"到店使用"
                        ,buyPension:"1.50"
                        ,buyPrice:"58.00"
                        ,marketPrice:"100"
                        ,virtualBuy:"1000"
                        ,canBuyNum:""
                        ,couponUseDesc:""
                        ,couponGmtStart:""
                        ,couponGmtEnd:""
                        ,buyerTips:""
                    }
                }
            }

            ,shop:{
                type:Object,
                default() {
                    return {
                        name:"积分宝体验店"
                        ,address:"中栋国际"
                        ,telephone:"0571-11110000"
                    }
                }
            }
        }
    }
</script>
