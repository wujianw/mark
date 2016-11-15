<template>
    <ul class="evaluate-list-el" v-infinite-scroll="more" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
        <li v-for="item in details"  class="evaluate-block-el" :key="item.id">
            <div class="flex-start list-user-details">
                <div class="head-img">
                    <img src="../../assets/img/evaluate-hd.png" alt="">
                </div>
                <div class="user-details">
                    <div class="user-name">{{item.memberName}}</div>
                    <div class="time-grade">
                        <star :score="item.score"></star>
                        <span class="time">{{item.reviewTime}}</span>
                    </div>
                </div>
            </div>
            <p class="content">{{item.content}}</p>
            <div class="flex-space evaluate-img" v-if="item.reviewPic">
                <div class="img" v-for="url in item.reviewPic.split(',')"><img :src="url" alt=""></div>
            </div>
            <p v-if="item.listreply" class="shop-message">{{item.listreply}}</p>
        </li>
    </ul>
</template>
<style lang="scss" rel="stylesheet/scss">
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
    import member from "../../api/member"
    export default{
        data() {
            return {
                busy:true,
                start:0,
                details:null
            }
        }
        ,created() {
            this.toggleMode()
        }
        ,watch:{
            $route() {
                this.toggleMode()
            }
        }
        ,methods: {
            // 切换导航获取数据
            toggleMode(rows=20) {
                let self = this
                self.busy = true
                let query = self.$route.query,
                    goodsId = query.goodsId || '',
                    merchantId = query.merchantId || '',
                    mode = self.$route.params.mode
                if(mode == 0){
                    self.$store.dispatch("evaluateCount",{
                        countAll:0,
                        countIsReply:0,
                        countNoReply:0,
                        countDownScore:0
                    })
                }
                member.getEvaluateList({goodsId,merchantId,mode,rows}).then(val => {
                    self.details = val
                    self.start = rows
                    self.busy = val.length < rows
                    if(mode == 0) {
                        self.$store.dispatch("evaluateCount",val[0])
                    }
                })
            },
            // 无限加载获取数据
            more(rows=20) {
                let self = this
                self.busy = true
                let query = self.$route.query,
                    goodsId = query.goodsId || '',
                    merchantId = query.merchantId || '',
                    mode = self.$route.params.mode,
                    start = self.start
                member.getEvaluateList({goodsId,merchantId,mode,start,rows}).then(val => {
                    self.start += rows
                    self.busy = val.length < rows
                    self.details.push(...val)
                })
            }
        }
        ,components: {
            star
        }
    }
</script>
