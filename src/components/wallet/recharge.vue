<template>
    <div class="recharge-el">
        <div class="recharge-head">
            <div class="input-money flex-start">
                <label>金额</label>
                <input class="recharge-money" v-model="money" type="number"  placeholder="请输入您收到的短信验证码">
            </div>
            <ul class="type-selected" @click="choice">
                <li v-for="item in choiceList" :class="{active:item.active}" :data-gold="item.gold"></li>
            </ul>
        </div>
        <div class="pay-way">
            <radio id="wx" name="check" :check="true">
                <div class="way flex-start wx">
                    <img src="../../assets/img/wx.png" alt="">
                    <div class="message">
                        <h4>微信支付</h4>
                        <p>推荐安装微信5.0及以上版本的用户使用</p>
                    </div>
                </div>
            </radio>
        </div>
        <div class="submit-wrap">
            <submit value="确认支付" :dis="false" @commit="success"></submit>
        </div>
    </div>
</template>
<style lang="scss" rel="stylesheet/scss">
    $placeholderColor:#afafaf;
    .recharge-el{
        .recharge-head{
            border-top: 18px solid #f2f2f2;
            background: #fff;
        }
        .input-money{
            padding:0 38px;
            border-bottom: 1px solid #f2f2f2;
            font-size: 28px;
            color: #505050;
            line-height:42px;
            label{
                padding-right:46px;
                border-right:1px solid #afafaf;
            }
            .recharge-money{
                width:400px;
                height: 80px;
                padding-left:10px;
                border:none;
                font-size: 26px;
                &::-webkit-input-placeholder {color:$placeholderColor;font-size:25px;}
                &:-moz-placeholder {color:$placeholderColor;font-size:25px;}
                &::-moz-placeholder {color:$placeholderColor;font-size:25px;}
                &:-ms-input-placeholder {color:$placeholderColor;font-size:25px;}
            }
        }
        .type-selected{
            padding:18px 0;
            li{
                display:inline-block;
                width:194px;
                margin:10px 25px;
                border:1px solid #e85453;
                border-radius:8px;
                text-align: center;
                line-height:80px;
                font-size:28px;
                color:#e85453;
                &:before{content:attr(data-gold);}
                &:after{content:"元";}
                transition:background .3s;
            }
            li.active{
                background:#e85453;
                color:#fff;
            }
        }
        .recharge-centre{
            margin-top:18px;
            height: 344px;
            background: white;
        }
        /*.success-hd h3{font-size:30px;}*/
        .pay-way{
            margin-top:18px;
            background:#fff;
            label{height:138px;}
            .way{
                height:138px;
                img{width:70px;height:70px;}
                .message{
                    padding-left:40px;
                    line-height:40px;
                    font-size:30px;
                    color:#505050;
                    p{font-size:22px;color:#afafaf;}
                }
            }
        }
        .submit-wrap{padding:50px 15px;background:#f2f2f2;}
    }
</style>
<script type="text/babel">
    import submit from "../submit"
    import radio from '../select/radio'
    export default{
        data(){
            return {
                money:5,
                choiceList:[
                    {gold:5,active:true},
                    {gold:10,active:false},
                    {gold:20,active:false},
                    {gold:30,active:false},
                    {gold:50,active:false},
                    {gold:100,active:false},
                ]
            }
        }
        ,methods: {
            choice(e) {
                let target = e.target
                if(target.tagName.toLowerCase() == 'li'){
                    target.className = 'active'
                    this.choiceList.map(item => {
                        item.active = false
                        if(item.gold == target.dataset.gold){
                            this.money = target.dataset.gold
                            item.active = true
                        }
                    })
                }
            },
            success() {
                this.$router.push({name:'success'})
            }
        }
        ,components: { radio, submit }
    }
</script>
