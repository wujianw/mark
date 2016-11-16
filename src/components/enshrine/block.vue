<template>
    <transition name="left">
        <div @click="link" class="enshrine-block-el flex-space">
            <div class="flex-start">
                <div class="delete-select" v-if="isDelete">
                    <i class="icon" :class="{'icon-ok':deleteActive}"></i>
                </div>
                <div class="pic"><img :src="goodsdata"></div>
                <slot name="text"></slot>
            </div>
            <slot name="btn"></slot>
        </div>
    </transition>
</template>
<style lang="scss" rel="stylesheet/scss">
    .enshrine-block-el{
        height:170px;
        padding-left:12px;
        border-top:1px solid #f2f2f2;
        background:#fff;
        /* 删除选择 */
        .delete-select{
            width:82px;
            padding:50px 0;
            text-align: center;
            i{
                display: inline-block;
                width:40px;
                height:40px;
                font-size:40px;
                color:#e85453;
            }
            .icon{

                border:1px solid #afafaf;
                border-radius:50%;
            }
            .icon.icon-ok{
                border:none;
            }
        }
        /* 取消收藏，进入店铺按钮 */
        .btn-wrap{
            position:relative;
            padding:50px 34px;
            i{font-size:40px;color:#aeaeae;}
            .btn{
                display:flex;
                position: absolute;
                top:50%;
                right:100%;
                height:40px;
                transform:translate(-20%,-50%);
                border-radius:.3em;
                background:#afafaf;
                text-align: center;
                font-size:26px;
                color:#fff;
                .close-btn:before{content:"";}
                div{
                    width:0;
                    opacity:0;
                    transition:width .3s, opacity .5s;
                }
                .in{
                    display:none;
                    position:relative;
                    border-left:1px solid #f2f2f2;
                    &:after{position:absolute;right:-0.25em;width:.5em;height:.5em;background:#fff;}
                }
                .in-shop{
                    display:block;
                    &:before{content:"";}
                }

            }
            &.active .btn{
                .close-btn:before{content:"取消收藏";}
                div{
                    width:5em;
                    opacity: 1;
                }
                .in-shop{
                    &:before{content:"进入店铺";}
                }
            }
        }
        &.good-block{
            .pic{
                width:140px;
                height:140px;
            }
        }
        .pic{
            width:225px;
            height:144px;
            img{width:100%;height:100%;}
        }
    }
</style>
<script type="text/babel">

    export default{
        data(){
            return{
                deleteActive:false
            }
        }
        ,methods:{
            link() {
                if(this.isDelete){
                    this.deleteActive = !this.deleteActive
                    this.$emit('toggleDelete',this.index) // 编辑删除状态，传递ID
                } else {
                    this.$router.push(this.to) // 非编辑删除状态为导航
                }
            }
        },
        watch:{
            isDelete(newVal,oldVal) {
                newVal && (this.deleteActive = false) // 监听编辑状态，清楚选中按钮样式
            },
        }

        ,props:{
            index:[Number,String],// 对应的商品或商家ID，回传给父级，处理删除用
            isDelete:Boolean,// 删除状态显示选择按钮
            goodsdata:String,// 图片数据
            to:Object // 导航数据
        }
    }
</script>
