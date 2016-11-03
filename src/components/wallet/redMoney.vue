<template>
    <div class="red-money-el">
        <header>
            <div class="red-head">
                <p class="title">收到<span>{{rows.length}}</span>个红包,共</p>
                <p class="money">{{blance}}<span>元</span> </p>
            </div>
            <div class="go-next flex-space">
                <router-link tag="p" :to="{name:''}">去逛逛</router-link>
                <router-link tag="p" :to="{name:''}">去充值</router-link>
            </div>
        </header>
        <h3 class="title-details">最近30天红包明细</h3>

        <ul>
            <li v-for="item in rows" :rows="item" class="flex-space cell-view">

                <div class="red-image"></div>
                <div class="red-details">
                    <div class="flex-space type-gold">
                        <p>{{item.transCodeName}}</p>
                        <p>{{item.transAmount}}元</p>
                    </div>
                    <div class="flex-space time-state">
                        <p> 来自****{{item.gmtCreated}}</p>
                        <p>已领取</p>
                    </div>
                </div>
            </li>
        </ul>


    </div>
</template>
<style lang="scss" rel="stylesheet/scss">
    .red-money-el{
        header{
            padding:0 14px;
            height: 376px;
            .red-head{
                height: 278px;
                text-align:center;
                    .title{
                        padding-top: 76px;
                        font-size: 26px;
                        color: #afafaf;
                        span{color: #e85352}
                    }
                    .money{
                        padding-top: 48px;
                        font-size: 72px;
                        color: #e85352;
                        span{
                            padding-left:4px;
                            font-size:26px;
                            color: #505050;
                        }
                    }

            }
            .go-next p{
                width:350px;
                line-height:70px;
                border:1px solid #e85352;
                border-radius:.2em;
                text-align:center;
                font-size:30px;
                cursor:pointer;
                color:#e85352;
                &:last-of-type{
                    background: #e85352;
                    color:#fff;
                }
            }
        }
        h3.title-details{
            padding-left: 38px;
            background: #fff;
            line-height: 60px;
            font-weight: normal;
            font-size: 26px;
            color: #807f7f;
        }
        .cell-view {
            background: white;
            padding-left: 14px;
            border-top: 1px solid #f2f2f2;
        }
        .red-details{
            padding-left:32px;
            padding-right:20px;
            flex-grow: 3;
            height: 130px;
            line-height:2;
            .type-gold{
                padding-top:25px;
                height:40px;
                font-size: 26px;
                color: #505050;
            }
            .time-state{
                font-size: 20px;
                color: #afafaf;
            }
        }
        .red-image{
            width: 80px;
            height: 80px;
            background: #e85352;
            border-radius:50%;
        }
    }
</style>
<script type="text/babel">

    import member from "../../api/member"
    import { mapGetters } from 'vuex'
    export default {
        data() {
            return {
                rows:[]
                ,blance:''
            }
        }

        ,computed: {
            ...mapGetters({
                getToken:'getToken'
            })
        }
        ,beforeRouteEnter (to, from, next) {
            next(vm => {
                member.getRedMoney(vm.getToken).then(val => {
                    vm.blance = val.blance
                    vm.rows = val.rows


                    console.log(JSON.stringify(val))


                })
            })
        }
    }
</script>
