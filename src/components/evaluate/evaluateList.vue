<template>
    <ul class="evaluate-list-el">
        <li v-for="n in 3" class="evaluate-block-el">
            <div class="flex-start list-user-details">
                <div class="head-img"></div>
                <div class="user-details">
                    <div class="user-name">姓名</div>
                    <div class="time-grade">
                        <star :score="score"></star>
                        <span class="time">2016-34-34</span>
                    </div>
                </div>
            </div>
            <p class="content">草泥马草泥马草泥马草泥马草泥马草泥马草泥马草泥马草泥马草泥马草泥马草泥马草泥马草泥马草泥马草泥马草泥马</p>
            <div class="flex-space evaluate-img">
                <div class="img" v-for="n in 3"><img src="" alt=""></div>
            </div>
            <p class="shop-message">三大航飞机失控的风景和斯蒂芬黑色的减肥还是的很快就可</p>
        </li>
    </ul>
</template>
<style lang="scss">

    .evaluate-list-el{
        background:#fff;
        .evaluate-block-el{
            padding:0 38px 24px;
            border-bottom: 1px solid #f2f2f2;
        }
        /* 用户详情 */
        .list-user-details{
            height: 127px;
            padding:26px 0;
            .head-img{
                height:75px;
                width: 75px;
                border-radius:50%;
                background: grey;
            }
            .user-details{
                padding-left: 42px;
                height: 75px;
                .user-name{
                    padding-top: 9px;
                    font-size: 28px;
                    color: #373737;
                }
                .time-grade{
                    padding-top: 9px;
                    font-size: 20px;
                    color: #807f7f;
                }
            }
        }
        /* 评论内容 */
        .content{
            color:#807f7f;
            font-size: 26px;
        }
        /* 晒图 */
        .evaluate-img{
            height: 220px;
            padding-top:20px;
            div{
                width: 220px;
                height: 220px;
                background: grey;

            }
        }
        /* 商家回复 */
        .shop-message{
            position:relative;
            margin-top:24px;
            padding:15px;
            border-radius:.4em;
            background:#eee;
            line-height:1.2;
            font-size:22px;
            color:#807f7f;
            &:before{content:"商家回复：";color:#f9a828;}
            &:after{content:'';
                position:absolute;
                top:-.7em;
                left:2em;
                transform:rotate(45deg) scale(.7);
                width:36px;
                height:36px;
                background:#eee;
            }
        }
    }

</style>
<script type="text/babel">
    import star from "../star"
    export default{
        data() {
            return {
                score:3.1
            }
        }
        ,components: {
            star
        }
    }
</script>
