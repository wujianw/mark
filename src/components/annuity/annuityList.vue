<template>
    <div>
        <div class="annuity-title flex-end">
            <div class="title">累计养老金</div>
            <div class="gold">{{total}}</div>
        </div>
        <div class="flex-space time-selected">
            <p class="income-time">
                日期选择<date-picker class="" :date="startTime" :option="option" :limit="limitStart"></date-picker>
                到&nbsp<date-picker class="" :date="endTime" :option="option" :limit="limitEnd"></date-picker>
            </p>
            <button class="search-btn" @click="toggleType()">搜索</button>
        </div>
        <div v-infinite-scroll="more" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
            <annuity-block  v-for="item in items" :oName="item.oName" :dealtime="item.dealtime" :ratio="item.ratio" :point="item.point" :dealMny="item.dealMny"></annuity-block>
        </div>
    </div>
</template>
<style lang="scss" rel="stylesheet/scss">

    /* 主题栏 */
    .annuity-title{
        flex-direction: column;
        height:264px;
        font-family:"Microsoft YaHei";
        .gold{
            padding:42px 0 60px;
            font-size:72px;
            color:#e85453;
            &:after{content:"元";font-size:27px;color:#373737;}
        }
        .title{font-size:26px;color:#afafaf;}
    }
    /*!* 查询条件 *!*/
    /*.annuity-query-condition{*/
        /*height:64px;*/
        /*align-items:stretch;*/
        /*input{*/
            /*width:248px;*/
            /*border:none;*/

            /*background:#e0dedf;*/
            /*font-size:28px;*/
            /*color:#505050;*/
        /*}*/
        /*input.active{background:#e55451;color:#fff;}*/
    /*}*/
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
        font-size:26px;
        background: white;
        height: 128px;
        padding-left: 24px;
        padding-right: 24px;
    }
</style>
<script type="text/babel">
    import datePicker from 'vue-datepicker'
    import annuityBlock from './annuityBlock'
    import member from "../../api/member"
    import {getBeforeDate} from '../../assets/js/public'
    export default {
        data() {
            return {
                items:[],
                total:this.$route.query.gold,
                busy:false,
                pageIndex:1,
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
        }
        ,computed: {
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
                    to: getBeforeDate(0)
                }]
            }
        }
        ,components:{ annuityBlock,datePicker }
        ,methods:{
            fetchData({pageSize=10,pageIndex=this.pageIndex,startTime=this.startTime.time,endTime=this.endTime.time}={}) {
                member.getAnnuityList({startTime,endTime,pageSize,pageIndex}).then(data => {
                    this.pageIndex++
                    this.items.push(...data.data)
                    this.busy = pageSize != data.data.lengths
                }).catch(() => {
                    this.busy = true
                })
            },
            more() {
                this.busy = true
                this.fetchData()
            },
            toggleType(type) {
                this.pageIndex = 1
                this.items = []
                this.busy = false
            }
        }

    }
</script>
