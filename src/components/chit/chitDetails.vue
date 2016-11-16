<template>
    <div class="chit-details-el flex-start">
        <div class="flex-center title-wrap">
            <div class="title">{{name}}</div>
            <div class="date">{{date}}</div>
        </div>
        <div class="flex-start pic" >
            <p class="num">{{code}}</p>
            <div class="img-wrap" ref="qrcode"></div>
        </div>
    </div>
</template>
<style lang="scss" rel="stylesheet/scss">
.chit-details-el{
    position:absolute;
    top:0;bottom:0;
    width:100%;
    flex-direction: column;
    height:100%;
    background:#fff;
    .title-wrap{
        flex-direction: column;
        height:172px;
        width:640px;
        border:1px solid #f0f0f0;
        border-bottom: none;
        text-align: center;
    }
    .title{
        line-height:54px;
        font-size:28px;
        color:#373737;
    }
    .date{
        line-height:48px;
        font-size:24px;
        color:#afafaf;
        &:before{content:"有效期至";}
    }
    .pic{
        flex-direction: column;
        flex-grow:1;
        width:640px;
        border:1px solid #f0f0f0;
        text-align: center;
        .num{
            padding:72px 0;
            font-size:28px;
            color:#373737;
            &:before{content:"券码";padding-right:1.5em;}
        }
        .img-wrap{
            padding:10px;
            border-radius: .5em;
            border:1px solid #f0f0f0;
            img{
                width:358px;
                height:358px;
            }
        }
    }
}
</style>
<script type="text/babel">
    import QRCode from "../../assets/js/qrcode"
    export default{
        data(){
            return{
                date:'',
                name:'',
                code:'',
                qrcode:null
            }
        }
        ,beforeRouteEnter (to, from, next) {
            let code = to.query.code,
                name = to.query.name,
                date = to.query.date
            next(vm => {
                let self = vm,
                    child = self.$refs.qrcode
                self.name = name
                self.code = code
                self.date = date
                self.qrcode = new QRCode(child, {
                    text: 'jfb-voucher:'+ code,
                    correctLevel : QRCode.CorrectLevel.H
                })
            })
        }
        ,components:{

        }
    }
</script>
