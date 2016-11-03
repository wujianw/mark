<template>
    <div>

        <div class="income-head">
            <div class="flex-space time-selected">

                <div class="income-time">日期选择 <span class="income-time-set">2016-07-06</span> 到 <span class="income-time-set">2016-07-06</span> </div>
                <router-link class="go-next-seach" tag="p" :to="{name:''}">搜索</router-link>
            </div>


            <div class="flex-space type-selected">

                <router-link class="go-next-selected" tag="p" :to="{name:''}">全部</router-link>
                <router-link class="go-next-normal" tag="p" :to="{name:''}">收入</router-link>
                <router-link class="go-next-normal" tag="p" :to="{name:''}">支出</router-link>

            </div>
        </div>
        <div class="income-table-title"><span>7</span>天收支明细</div>



        <div v-for="item in rows" :rows="item" class="flex-space income-cell">

                <div class="income-table-details" >
                    <p class="income-table-name">{{item.transCodeName}}</p>
                    <p class="income-table-time">{{item.gmtCreated}}</p>
                </div>


                <div :class="item.tradeType==0 ? 'activeClass':'errorClass'"> {{item.tradeType==0?'-':'+'}}{{item.transAmount}}</div>


        </div>


    </div>
</template>
<style lang="scss" rel="stylesheet/scss">

    .income-head{
        box-sizing: border-box;
        padding-top: 18px ;
        height:167px;
        background: #f2f2f2;
        font-size: 26px;
    }

    .time-selected{
        background: white;
        height: 78px;
        padding-left: 24px;
        padding-right: 24px;
    }
    .type-selected{

        background: white;
        margin-top: 1px;
        height: 78px;
        padding-left: 24px;
        padding-right: 24px;
    }
    .go-next-selected{

        height: 60px;
        width: 220px;
        background: #e85453;
        border-radius:5px;
        line-height:55px;
        text-align:center ;
        color: white;
    }
    .go-next-normal{

        height: 60px;
        width: 220px;
        background: white;
        border-radius:5px;
        line-height:55px;
        text-align:center ;
        color: #e85453;
        border:1px solid #e85453;
    }

    .go-next-seach{

        height: 60px;
        width: 124px;
        background: #e85453;
        border-radius:5px;
        line-height:55px;
        text-align:center ;
        color: white;
    }
    .income-time-set{
        color: #e85453;
    }

    .income-table-title{
        margin-top:18px ;
        padding-left: 22px;
        padding-top:13px;
        height: 52px;
        background: white;
        font-size: 26px;
        box-sizing: border-box;
        color: #807f7f;


    }
    .income-cell {
        background: white;
        padding-left: 14px;
        padding-right: 14px;
        height:72px ;
        border-top: 1px solid #f2f2f2;


        .income-table-details {

        }
      .income-table-name{

          font-size: 26px;
          color: #505050;
      }
        .income-table-time{

            margin-top: 8px;
            font-size: 20px;
            color: #afafaf;

        }

        .errorClass{
            font-size: 26px;
            color: #e85453;
        }
        .activeClass{
            font-size: 26px;
            color: #7c7c7c;
        }
    }
</style>
<script type="text/babel">

    import member from "../../api/member"
    import { mapGetters } from 'vuex'

    export default {
        data() {
            return {
                rows:[],
                isActive: true,
            }
        }

        ,computed: {
            ...mapGetters({
                getToken:'getToken'
            })


        }
        ,beforeRouteEnter (to, from, next) {
            next(vm => {
                member.getincome(vm.getToken).then(val => {
                    vm.blance = val.blance
                    vm.rows = val.rows

                    console.log(JSON.stringify(val))



                })
            })
        }
    }
</script>
