<template>
    <div>

        <div class="flex-start message-list">


            <div class="img"></div>
            <div class="lint">99+</div>

            <div class="count">
                <div class="flex-space title-time">

                    <div class="title">系统消息</div>

                    <div class="time">2012-12-12</div>

                </div>

                <div class="message">曾经沧海难为水,除却巫山不是云</div>


            </div>

        </div>

        <div class="flex-start message-list">


            <div class="img"></div>
            <div class="lint">99+</div>

            <div class="count">
                <div class="flex-space title-time">

                    <div class="title">系统消息</div>

                    <div class="time">2012-12-12</div>

                </div>

                <div class="message">曾经沧海难为水,除却巫山不是云</div>


            </div>

        </div>


        <div class="flex-start message-list">


            <div class="img"></div>
            <div class="lint">99+</div>

            <div class="count">
                <div class="flex-space title-time">

                    <div class="title">系统消息</div>

                    <div class="time">2012-12-12</div>

                </div>

                <div class="message">曾经沧海难为水,除却巫山不是云</div>


            </div>

        </div>





    </div>
</template>
<style lang="scss" rel="stylesheet/scss">

    .message-list{

        height: 120px;
        background: #fff;
        border-bottom: 1px solid #f2f2f2;
        padding-left: 22px;
        .img{

            height: 76px;
            width: 76px;
            background: grey;
            border-radius:5px;


        }
        .lint{
            width: 35px;
            height: 35px;
            border-radius:50%;
            background: #e85352;
            color: #fff;
            text-align: center;
            font-size: 18px;
            line-height: 35px;
            margin-top: -75px;
            margin-left:-15px;

        }
        .count{
            flex-grow: 1;
            height: 76px;
            padding-left: 59px;
            padding-right: 20px;
            .title{
                color: #505050;
                font-size:30px;
                padding-top: 3px;
            }
            .time{
                color: #838383;
                font-size:20px ;
            }
            .message{
                color: #afafaf;
                font-size:22px;
                padding-top: 15px;
            }
        }

    }

</style>
<script type="text/babel">
    export default{
        data(){
            return {}
        }
        , components: {}
    }
</script>
