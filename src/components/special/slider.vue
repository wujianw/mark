<template>
    <div class="islider"></div>
</template>
<style lang="scss" rel="stylesheet/scss">
    .banner {position:relative;height:280px;width:100%;overflow:hidden;}
    .islider{position:relative;overflow:hidden;}
    .islider-outer {height:100%;overflow:hidden;}
    .islider-outer li { position:absolute;height: 100%;width:100%;overflow:hidden;display:-webkit-box;-webkit-box-pack:start;}
    .islider-outer li a{display: block;width:100%;height:100%;}
    .islider-outer li img {width:100%;height:100%;}
    /* Slider.plugin.dot */
    .islider-dot-wrap {position:absolute;left:0;right:0;bottom:0;z-index:2;width:80%;margin:0 auto;text-align:center;}
    .islider-dot {position:relative;display:inline-block;width:0.8em;height:0.8em;margin:5px;border-radius: 50%;border:1px solid #fff;}
    .islider-dot.active {background-color: #fff;}
</style>
<script type="text/babel">
    /*
     * 轮播组件
     * @params
     */
    import plugins from '../../assets/js/iSlider.plugin.dot.min'
    import wx from '../../../static/img/special-bg.png'
    import {mapGetters} from 'vuex'
    export default{
        data(){
            return{
                slider:null
            }
        },
        computed:{
            ...mapGetters({
                banner:'specialBanner'
            })
        },
        watch: {
            banner() {
                this.fetchData()
            }
        },
        mounted() {
            this.fetchData()
        },
        methods:{
            fetchData() {
                if(this.banner){
                    let self = this,
                        banner = this.banner.map((banner) => {
                            let render
                            if(banner.linkType == 2){
                                render = `<a href="${banner.imgLink}"><img src="${banner.imgUrl}" alt=""></a>`
                            }else if(banner.linkType == 1) {
                                render = `<a href="#/goodDetails?goodsId=${banner.goodId}"><img src="${banner.imgUrl}" alt=""></a>`
                            }else if(banner.linkType == 0) {
                                render = `<a href="http://shop.jfb315.cn/api/open/goods/load.htm?id=${banner.id}"><img src="${banner.imgUrl}" alt=""></a>`
                            }
                            return {"content": render}
                        }),
                        plugins = [['dot', {locate:'relative'}]]
                    this.slider = new iSlider({
                        dom: self.$el,
                        data: banner,
                        isVertical: false,
                        isLooping: true,
                        isDebug: false,
                        isAutoplay: true,
                        plugins: plugins
                    });
                }
            }
        },
        props:{
            list:[Array,null]
        }
    }
</script>
