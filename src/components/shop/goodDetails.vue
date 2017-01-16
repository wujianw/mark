<template>
    <div class="good-details-el">
        <header class="hd">
            <div class="enshrine" @click="collect"><i class="icon" :class="isCollect ? 'icon-is-collect' : 'icon-collect'"></i></div>
            <div class="hd-pic">
                <img :src="goods.goodsImages" alt=""/>
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
            <div class="color-size">库存:{{goods.stockNumber}}件</div>
            <div class="color-size">每人限购:{{goods.canBuyNum}}件</div>
        </section>
        <section class="gd-mark flex-start">
            <span>到店使用</span>
            <span>支持退货</span>
        </section>
        <main>
            <section class="lump">
                <h3>
                    <p>商品评论({{countreviewLen || 0}})</p>
                </h3>
                <div class="lump-content">
                    <good-review :reviews="countreview" :goodsId="goods.id"></good-review>
                </div>
            </section>
            <section @click="linkShop"class="lump">
                <h3>
                    <p>商家信息</p>
                </h3>
                <div class="lump-content flex-space shop" >
                    <div class="pic-shop"><img :src="shop.logoImg" alt="" class="shop-logo"></div>
                    <div class="info">
                        <p class="info-name">{{shop.name}}</p>
                        <p>{{shop.address}}</p>
                        <!--<p><i class="icon icon-position"></i>1.8km</p>-->
                    </div>
                    <div><a :href="'tel:'+shop.mobile"><i class="icon icon-tel"></i></a></div>
                </div>
            </section>
            <div class="link-picword">
                <!--<p>向下拖动 查看详情</p>-->
            </div>
            <div id="picWord">

            </div>
        </main>
        <footer class="footer">
            <div class="flex-box ft">
                <div class="flex-start">
                    <router-link :to="{name:'nearbyHot'}" class="btn-link flex-space">
                        <i class="icon icon-index"></i>
                        <span>首页</span>
                    </router-link>
                    <a class="btn-link flex-space" :href="'tel:'+shop.telephone">
                        <i class="icon icon-tel"></i>
                        <span>电话</span>
                    </a>
                </div>
                <div>
                    <p class="buy-btn">
                        <router-link :to="{name:'createOrder',query:{goodId:goods.id}}">立即购买</router-link>
                    </p>
                </div>
            </div>
        </footer>
    </div>
</template>
<style lang="scss" rel="stylesheet/scss">
    .good-details-el{background:#fff;
        .gold .rmb{font-size:75%;font-family: "Microsoft YaHei";padding-right:4px;}
        .hd{position:relative;}
        .hd-pic{width:750px;height:750px;}
        .hd-pic img{width:100%;height:100%;}
        .hd-title{position:absolute;bottom:0;height:78px;padding:6px 25px;background:#000;opacity:.27;filter:alpha(opacity=27);}
        .hd-title p{white-space:nowrap; text-overflow:ellipsis; -o-text-overflow:ellipsis; overflow:hidden;color:#fff;}
        .hd-title p:nth-of-type(1){width:25em;font-size:28px;padding:10px 0;}
        .hd-title p:nth-of-type(2){width:30em;font-size:20px;}
        .enshrine{
            position:absolute;
            top:0;
            width:90%;
            padding:0 5%;
            line-height:78px;
            background:rgba(0,0,0,.3);
            text-align: right;
            i{font-size:30px;color:#f7a926;}
        }
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
                    font-size:50px;
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
                    background:linear-gradient(135deg, transparent 14px, #e8534f 14px) top left,
                    linear-gradient(45deg, transparent 14px, #e8534f 14px) bottom left,
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
            padding:15px 26px;
            .info{padding:14px 0;}
            p{padding:6px 0;color:#838383;font-size:20px;}
            p.info-name{color:#505050;font-size:26px;}
            .info-price p{display:inline-block;}
            .info-price .market-pay{color:#b5b5b5;}
            .pic-shop{
                width: 200px;
                height: 100px;
                .shop-logo{width: 100%;height:100%}
            }
        }

        .footer{position:fixed;bottom:0;width:750px;background:#f2f2f2;z-index:2;}
        .ft{justify-content: space-between;align-items:center;color:#838383;}
        .buy-btn a{display:inline-block;background:#e85350;height:88px;line-height:88px;font-size:40px;color:#fff;width:376px;text-align:center;}
        .btn-link{
            flex-direction: column;
            padding:0 26px;
            border-right:1px solid #d9d9d9;
            text-align:center;
            font:20px/1.2 "Microsoft YaHei";
        }
        a{color:#e85354;
            i{font-size:38px;}
            span{

            }
        }
        #picWord {margin-bottom:88px;}
        #picWord img{max-width:100%;}
    }

</style>
<script type="text/babel">
    import goodReview from './goodReview'
    import shop from "../../api/shop"
    import member from "../../api/member"
    import MessageBox from "../../msgbox"
    import { mapGetters,Store } from 'vuex'
    import store from '../../store'
    export default{
        data(){
            return{
                countreviewLen:0,// 评论长度
                countreview:[], // 评论数量
                isCollect:false
            }
        },
        computed:{
            ...mapGetters({
                goods:'goodDetails',
                shop:'goodDetailsShop'
            })
        }
        ,beforeRouteEnter (to, from, next) {
            let goodsId = to.query.goodsId
            store.dispatch('goodDetails',{goodsId}).then(obj => {
                next(vm => {
                    vm.countreview = obj.countreview
                    vm.countreviewLen = obj.countreviewLen
                    vm.isCollect = vm.goods.isCollect
                })
            })
        }
        ,methods:{
            /*
            * 商家详情
            * */
            linkShop() {
                this.$router.push({name:'shopDetails',query:{shopId:this.goods.merchantId}})
            },
            /*
            * 收藏按钮
            * */
            collect() {
                if(!window.localStorage.token){
                    MessageBox.confirm("请重新登入").then(() => {
                        this.$router.push({name:'loadMobile'})
                    }).catch(() => {})
                }else {
                    if(this.isCollect){
                        MessageBox.confirm("是否取消收藏").then(() => {
                            return member.getUnCollect({collectType:"0",collectId:this.$route.query.goodsId})
                        }).then(() => {
                            this.isCollect = false
                        }).catch(() => {
                            MessageBox.alert("您已经收藏该商品")
                        })
                    }else {
                        member.getCollect({collectType:'0',collectId:this.$route.query.goodsId}).then(() => {
                            this.isCollect = true
                        }).catch(() => {
                            MessageBox.alert("您已经收藏该商品")
                        })
                    }
                }
            }
        }
        ,beforeRouteLeave(to,from,next) {// 销毁实例
            this.$nextTick(() =>{
                this.$destroy()
            })
            next()
        }
        ,components:{
            goodReview
        }
    }
</script>
