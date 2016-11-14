<template>
    <div>
        <div class="scan-bill-el">
            <div>
                <h3 class="title">积分宝体验店</h3>
                <div class="">
                    <h4 class="message">询问营业员确定消费金额后输入</h4>
                    <div class="gold-input flex-start">
                        <div><input type="text" v-model="shouldGetValue" placeholder="0.00" ref="shouldGetRef"></div>
                    </div>
                    <div class="btn-dialog flex-start" @click="inputnofavourable" v-show="toinputshow">输入不享受优惠金额</div>
                    <div class="flex-space afterinputnofavourable" @click="inputnofavourable" v-show="modifyshow">
                        <span style="padding-left: 12px">不享受优惠的金额为:  ￥{{nofavourable}}</span>
                        <button style="background: #e85352;border:none;color: #fff ; padding:0 20px;font-size:24px; line-height:74px">修改</button>
                    </div>
                    <div class="favor-wrap">
                        <h4 class="favor">优惠活动</h4>
                        <div class="signedin" v-show="signedin">
                            <p>每满100立减5元，最高减免50元</p>
                            <p>酒水部分不参与优惠，请输入不享受优惠金额</p>
                        </div>
                        <div class="unsignedin" v-show="unsignedin">
                            <p>您还不是积分宝认证会员，请先 <span class="btn_login" @click="btn_login">注册或登录</span> 后查看是否有优惠</p>
                        </div>
                    </div>
                    <div class="gold-wrap">
                        <div class="flex-space">
                            <span>实付金额</span>
                            <span class="gold">{{realPayValue}}</span>
                        </div>
                        <div class="flex-space">
                            <span>赠养老金</span>
                            <span class="gold">11</span>
                        </div>
                    </div>
                </div>
                <div class="submit-wrap">
                    <p>询问营业员确定消费金额后输入</p>
                    <submit value="确认买单" @commit="submitScanBill" :dis="false"></submit>
                </div>
            </div>
        </div>
        <div class="flex-center popup" v-show="popupshow">
            <div class="popupbtn " >
                <h3 class="flex-center btntittle">输入不享受优惠金额</h3>
                <div style="padding: 0 24px">
                    <input class="btninput" type="text" placeholder="￥ 0.00" v-model="nofavourable_edit">
                </div>
                <div class="flex-space btnconfirm">
                    <div class="btnconfirmleft" @click="cancelClick">取消</div><div class="btnconfirmright" @click="okClick">确认</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script type="text/babel">
    import submit from '../submit'
    import member from '../../api/member'
    import { mapGetters } from 'vuex'
    export default {
        data () {
            return {
                toinputshow:true,
                popupshow:false,
                modifyshow:false,
                nofavourable:null,
                nofavourable_edit:null,

                realPay:"实付金额：",
                shouldGet:"将获养老金：",
                realPayValue:"0.00",
                shouldGetValue:"",
                total:"消费总额",
                second:"￥",
                merchantId:"8",//商户ID
                campaignId:"",//活动ID
                orderAmount:"100",//订单总金额
                paidAmount:"100",//实付总金额
                disconuntAmount:"0",//折扣扣除金额
                noDisAmount:"100",//不参加折扣的金额
                disAmount:"0", //参加折扣的金额

                token:"",
                signedin:false,
                unsignedin:true,
            }
        }
        ,components:{
            submit
        }
        ,beforeRouteEnter(to,from,next){
            next(vm=>{
                if(vm.token==""||vm.token==undefined||vm.token==null){
                    console.log(vm.token+"1")
                    vm.unsignedin=true
                    vm.signedin=false
                }else{
                    console.log(vm.token+"2")
                    vm.unsignedin=false
                    vm.signedin=true
                }
            })
        }
        ,computed: {
            ...mapGetters({
                token:'getToken',
            })
        }
        ,methods:{
            submitScanBill(){
                let self=this
                if (self.merchantId==""||self.campaignId==""||self.orderAmount==""||self.paidAmount==""||self.disconuntAmount==""||self.noDisAmount==""
                    ||self.disAmount==""){
                    alert("金额不能为空")
                }
                let params = {
                    "merchantId":self.merchantId,
                    "campaignId":self.campaignId,
                    "orderAmount":self.orderAmount,
                    "paidAmount":self.paidAmount,
                    "disconuntAmount":self.disconuntAmount,
                    "noDisAmount":self.noDisAmount,
                    "disAmount":self.disAmount
                }
                member.confirmScanbill(params).then(val => {
                    this.$router.push({name:'scanBillPay',query:val})
                    console.log(val)
                    console.log("fuck")
                }).catch(res => {
                    console.log("failed")
                })
            }
            ,mold() {
                this.total=total
            }
            ,inputnofavourable(){
                this.nofavourable_edit=this.nofavourable
                let self=this
                console.log(self.$refs.shouldGetRef)
                if(this.shouldGetValue==""||this.shouldGetValue==0){
                    self.$refs.shouldGetRef.focus();
                    return
                }
                this.popupshow=true
            }
            ,cancelClick(){
                this.popupshow=false
            }
            ,okClick(){
                this.popupshow=false
                this.nofavourable=this.nofavourable_edit
                if(this.nofavourable==0){
                    this.toinputshow=true
                    this.modifyshow=false
                }else{
                    this.toinputshow=false
                    this.modifyshow=true
                }
            }
            ,btn_login(){
                this.$router.push({name:'loadMobile'})
            }
        }
    }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
    .show{
        display: none;
    }
    .popup{
        position:fixed;
        z-index:5;
        width: 750px;
        height: 100%;
        top:0;
        background: rgba(102,104,109,.8);
        .popupbtn{
            border-radius: 12px;
            width: 540px;
            background: #fff;
            padding: 32px 0 0;
        }
    }
    .btntittle{
        color: #373737;
        font-size: 34px;
        margin-bottom: 32px;
    }
    .btninput{
        width: 490px;
        height: 80px;
        border: 1px solid #d1d1d1;
        border-radius: 8px;
        font-size: 36px;
        padding-left: 24px;
        margin-bottom: 24px;
    }
    .btnconfirm{
        border-bottom-left-radius: 8px;
        border-bottom-right-radius: 8px;
        line-height:102px;
        background: #e85352;
        width: 540px;
        .btnconfirmleft{
            flex-grow: 1;
            border-bottom-left-radius: 8px;
            text-align: center;
            color: #fff;
            font-size: 43px;
            border-right: 1px solid #fff;
        }
        .btnconfirmright{
            border-left: 1px solid #fff;
            flex-grow: 1;
            border-bottom-right-radius: 8px;
            text-align: center;
            color: #fff;
            font-size: 43px;
        }
    }
    .afterinputnofavourable{
        line-height: 74px;
        background:#f2f2f2;
        font:24px "Microsoft Yahei";
        color:#e85352;
    }
    .scan-bill-el{
        background: #fff;
        /* 金额输入 */
        .gold-input{
            padding:0 24px;
            height:84px;
            font-size:26px;
            color:#807f7f;
            &:before{content:"消费总额";}
            div{
                padding-left:24px;
                &:before{content:"￥";font-family: "Microsoft Yahei";}
                input{
                    border:none;
                    height:40px;
                    font-size:26px;
                }
            }
        }
        .title{
            text-align: center;
            font:normal 30px/82px 'Microsoft Yahei';
            color:#e85352;
        }
        /* 弹框按钮 */
        .btn-dialog{
            height: 74px;
            background:#f2f2f2;
            font-size:24px;
            color:#e85352;
            &:before{
                content:"+";
                margin:0 10px;
                width:30px;
                border-radius: 50%;
                background:#e85352;
                line-height: 30px;
                text-align:center;
                color:#fff;
            }
        }
        /* 询问营业员确定消费金额后输入 */
        .message{
            padding-left:24px;
            background:#f2f2f2;
            line-height:68px;
            font-size:22px;
            font-weight:normal;
            color: #807f7f;
        }
        /* 优惠说明 */
        .favor-wrap{
            border-bottom:34px solid #f2f2f2;
            line-height:52px;
            .favor{padding-left:24px;border-bottom:1px solid #f2f2f2;line-height:66px;background:#fff;font-size:26px;color:#807f7f;}
            p{padding:0 24px;}
            .unsignedin{
                p{
                    padding-top:20px;font-size:26px;color:#807f7f;
                    .btn_login{
                        text-decoration: underline;
                        color: #e85352;
                    }
                }
            }
            .signedin{
                p:first-of-type{padding-top:20px;font-size:26px;color:#373737;}
                p:last-of-type{font-size:24px;color:#afafaf;}
            }
        }
        /* 实付&养老金 */
        .gold-wrap{
            color:#807f7f;
            font-size:26px;
            div{padding:0 24px;border-top:1px solid #f2f2f2;line-height:82px;}
            .gold{
                font-size:30px;
                color:#e85352;
                &:before{content:"￥";font-size:26px;font-family: "Microsoft Yahei";}
            }
        }
        /* 提交按钮 */
        .submit-wrap{
            background:#f2f2f2;
            padding:24px;
            p{ padding:16px;text-align: center;font-size:22px;color:#afafaf;}
        }
    }
</style>
