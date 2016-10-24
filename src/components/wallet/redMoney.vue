<template>
    <div>
        <div class="redHead">

            <div class="moneyView">
                <p class="titleLint">收到<span class="numberLint">2</span>个红包,共</p>
                <p class="money">20.00<span class="moneyLint">&nbsp元</span> </p>
            </div>

            <footer class="flex-space">
                <router-link class="go-next" tag="p" :to="obj.to">{{obj.btnName}}</router-link>
                <router-link class="go-next1" tag="p" :to="obj.to">{{obj.btnName}}</router-link>
            </footer>
        </div>

        <div class="timeLint">最近30天红包明细</div>

        <router-link tag="main" :to="details.to" class="flex-space cell-view">

                <div class="red-image"></div>

                <div class="good-details">

                   <div class="flex-space redNumner" >
                       <p class="title-money">现金红包</p>
                       <p class="title-money">10.00元</p>
                   </div>

                    <div class="flex-space red-details">
                        <p class="time-type"> 来自****2016-5-5</p>
                        <p class="time-type">已领取</p>
                    </div>

                </div>

        </router-link>
    </div>
</template>
<style lang="scss">

    .redHead{


        height: 376px;
       padding-left: 14px;
        padding-right: 14px;
    }

    .moneyView{

        height: 278px;
        text-align:center;
            .titleLint{
                font-size: 26px;
                padding-top: 76px;
                color: #afafaf;
                .numberLint{color: #e85352}
            }
            .money{
                margin-top: 48px;
                font-size: 72px;
                color: #e85352;
                .moneyLint{font-size: 13px;color: #505050}
            }

    }

    .go-next1{
        width:350px;
        height:70px;
        background: #e85352;
        border-radius:5px;
        text-align:center;
        font-size:30px;
        line-height:65px;
        cursor:pointer;
        color:white;
    }

    .go-next{

        width:350px;
        height:70px;
        border:1px solid #e85352;
        border-radius:5px;
        text-align:center ;
        font-size:30px;
        line-height:65px;
        cursor:pointer;
        color:#e85352;
    }
    .timeLint{
        box-sizing: border-box;
        font-size: 26px;
        color: #807f7f;
        background: white;
        height: 60px;
        padding-top: 17px;
        padding-left: 38px;
    }
    .cell-view {
        background: white;
        padding-left: 14px;
        border-top: 1px solid #f2f2f2;
    }

    .good-details{
        flex-grow: 3;
        height: 130px;
        padding-right: 14px;
        padding-left:32px;
        .redNumner{
            padding-top:25px; height:40px
        }
        .red-details{
            height:40px;
        }
    }
    .title-money{
        font-size: 26px;
        color: #505050;
    }
    .time-type{
        font-size: 20px;
        color: #afafaf;
    }
.red-image{


    width: 80px;
    height: 80px;
    background: #e85352;
    border-radius:50%;
}

</style>
<script type="text/babel">
    export default {
        data() {
            return {}
        }
        ,props:{
            details:{
                type:Object,
                default: function() {
                    return {
                        to:{
                            name:"",
                            type:1
                        }
                    }
                }
            },
            obj:{
                type:Object,
                default: function() {
                    return {
                         to:{
                            name:"",
                            type:1
                        }
                        ,btnName:"去逛逛"
                    }
                }
            }
        }
    }
</script>
