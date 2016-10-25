<template>
    <div class="good-review-el">
        <ul >
            <li v-for="review in reviews" class="good-review-li">
                <div class="flex-space">
                    <p class="info info-js evaluate">
                        <span class="info-name">{{review.memberName}}</span>
                        <star :score="review.score"></star>
                    </p>
                    <p class="time">2016-10-02 10:00</p>
                </div>
                <p class="content">{{review.content}}</p>
            </li>
        </ul>
        <div class="btn-wrap flex-center">
            <router-link tag="span" :to="{name:'evaluateList'}">查看全部</router-link>
        </div>
    </div>
</template>
<style lang="scss">
    /* 评论 */
    .good-review-el{
        .good-review-li{
            padding:0 26px;
            border-bottom:1px solid #e6e6e6;
            &:last-of-type{
                 border:none;
                .content{margin:0;}
            }
            p{
                padding:10px 0;
                font-size:20px;
                font-family:"Microsoft Yahei";
                &.time{
                     font-size:18px;
                     color:#bab9b9;
                 }
            }
            .info{color:#f90;}
            .info-name{padding-right:46px;}
            .content{
                margin:2px 0 6px;
                line-height:1.2;
                color:#505050;
            }
        }
        .btn-wrap{
            padding:20px 0;
            span{
                padding:0.2em .6em;
                border:1px solid #e85453;
                border-radius: .2em;
                font-size:24px;
                color:#e85352;
            }
        }
    }
</style>
<script type="text/babel">
    import star from "../star"
    export default{
        components:{
            star
        }
        ,props:{
            reviews:{
                type:Array,
                default() {
                    return [
                        {
                            content: "少年阿飞少年阿飞少年阿少年少年少年少年少年少年少年少年少年少年少年少年少年少年少年少年少年少年少年少年飞少年阿飞少年阿飞"
                            , memberName: "少年阿飞"
                            , score: 3.1
                        }
                        ,{
                            content: "少年阿飞少年阿飞少年阿飞少年阿飞少年阿飞"
                            , memberName: "少年阿飞"
                            , score:0.1
                        }

                    ]
                }
            }
        }
    }
</script>
