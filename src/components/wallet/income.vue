<template>
    <div class="income-el">
        <header class="income-head">
            <div class="flex-space time-selected">
                <p class="income-time">
                    日期选择<date-picker class="" :date="startTime" :option="option" :limit="limitStart"></date-picker>
                    到&nbsp<date-picker class="" :date="endTime" :option="option" :limit="limitEnd"></date-picker>
                </p>
                <button class="search-btn" @click="toggleType()">搜索</button>
            </div>
            <div class="flex-space type-wrap">
                <button class="type-btn" @click="toggleType({type:''})" :class="[type==''?'active':'']">全部</button>
                <button class="type-btn" @click="toggleType({type:'earn'})" :class="[type=='earn'?'active':'']">收入</button>
                <button class="type-btn" @click="toggleType({type:'expense'})" :class="[type=='expense'?'active':'']">支出</button>
            </div>
        </header>
        <h3 class="list-title">收支明细</h3>
        <ul v-infinite-scroll="more" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
            <li v-for="item in rows" class="flex-space income-li">
                <div class="details">
                    <p class="name">{{item.transCodeName}}</p>
                    <p class="time">{{item.gmtCreated}}</p>
                </div>
                <div :class="item.tradeType==0 ? 'activeClass':'errorClass'"> {{item.tradeType ==0 ? '-':'+'}}{{item.transAmount}}</div>
            </li>
            <li class="no-more" :class="{'show':noMore}"></li>
        </ul>
    </div>
</template>
<style lang="scss" rel="stylesheet/scss">
    .income-el{
        padding-top:18px;
        header{
            background: #fff;
            font-size: 26px;
        }
        .search-btn{
            height: 60px;
            width: 124px;
            background: #e85453;
            border:none;
            border-radius:5px;
            line-height:55px;
            font-size:26px;
            color: #fff;
        }
        .time-selected{
            background: white;
            height: 128px;
            padding-left: 24px;
            padding-right: 24px;
        }
        /* 类型选择方式 ---全部，收入，支出 */
        .type-wrap{
            height: 90px;
            padding:0 24px;
            border:1px solid #f2f2f2;
        }
        .type-btn{
            height: 60px;
            width: 220px;
            border-radius:5px;
            background: #fff;
            line-height:55px;
            text-align:center;
            font-size: 26px;
            color: #e85453;
            border:1px solid #e85453;
        }
        .type-btn.active{
            background: #e85453;
            color: #fff;
        }
        /* 数据列表 */
        .list-title{
            margin-top:18px ;
            padding-left:26px;
            line-height: 78px;
            background: #fff;
            font-size: 30px;
            color: #807f7f;
        }
    }
    ul{background: #fff;}
    .income-li {
        padding:0 14px;
        height:100px;
        border-top: 1px solid #f2f2f2;
        font-size: 26px;
        .name{
            padding:8px 0;
            color: #505050;
        }
        .time{
            padding:8px 0;
            font-size: 20px;
            color: #afafaf;
        }
        .errorClass{
            color: #e85453;
        }
        .activeClass{
            color: #7c7c7c;
        }
    }
</style>
<script type="text/babel">
    import datePicker from 'vue-datepicker'
    import {getBeforeDate} from '../../assets/js/public'
    import member from "../../api/member"
    import { mapGetters } from 'vuex'
    export default {
        data() {
            return {
                noMore:false,
                busy:false,
                rows:[],
                isActive: true,
                start:0,
                type:'',//earn收入，expense支出
                startTime: {
                    time: getBeforeDate(7)
                },
                endTime: {
                    time: getBeforeDate(0)
                },

                option: {
                    type: 'day',
                    week: ['一', '二', '三', '四', '五', '六', '日'],
                    month: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月','9月', '10月', '11月', '12月'],
                    format: 'YYYY-MM-DD',
                    inputStyle: {
                        'display': 'line-block',
                        'width':'5.5em',
                        'padding': '6px',
                        'line-height': '22px',
                        'font-size': '26px',
                        'border': 'none',
                        'color': '#e85453'
                    },
                    color: {
                        header: '#ccc',
                        headerText: '#f00'
                    },
                    buttons: {
                        ok: '确定',
                        cancel: '取消'
                    }
                }
            }
        },
        created() {
//            this.fetchData()
        },
        computed: {
            ...mapGetters({
                getToken:'getToken'
            }),
            limitStart() {
                return [{
                    type: 'fromto',
                    to: this.endTime.time,
                }]
            },
            limitEnd() {
                return [{
                    type: 'fromto',
                    from: this.startTime.time,
                    to: getBeforeDate(1)
                }]
            }
        },
        methods:{
            //start,rows,type
            fetchData({start = this.start,rows=10,type=this.type}={}) {
                let self = this
                let startdate = self.startTime.time,
                    enddate = self.endTime.time
                member.getincome({startdate,enddate,rows,start,type}).then(val => {
                    self.start += rows
                    self.noMore = val.rows.length != rows
                    self.rows.push(...val.rows)
                    self.busy = val.rows.length != rows
                }).catch(()=>{
                    self.busy = true
                })
            },
            more() {
                this.busy = true
                this.fetchData()
            },
            toggleType({type=this.type}={}) {
                this.noMore = false
                this.type = type
                this.rows = []
                this.start = 0
                this.busy = false
            }

        },
        components:{datePicker}
    }
</script>
