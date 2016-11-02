<template>
    <div>
        <div class="flex-start grade">
            <div class="grade-title">满意度</div>
            <div class="go-grade">******</div>
            <div class="grade-lint">很好</div>
        </div>
        <div class="write">
            <textarea name="" id=""   placeholder="好的,不好的.都在这说说吧(最少需输入五个字哦)" class="write-input"></textarea>
        </div>
        <div class="add-img">
        </div>
        <input type="radio" value="1" class="anonymity-evalute"><span>匿名评价</span>
        <submit class="verify-submit" value="发布评论"></submit>
    </div>
</template>
<style lang="scss">

    .grade{
        margin-top: 18px;
        height: 68px;
        background: #ffffff;
        border-bottom: 1px solid #f2f2f2;

        padding-left: 25px;

        .grade-title{
            font-size:24px;
            color: #505050;
        }
        .go-grade{
            padding-left: 32px;
        }
        .grade-lint{
            font-size:22px;
            color: #f9a828;
            padding-left: 44px;
        }
    }


    .write{
        height: 190px;
        background: #ffffff;
        border-bottom: 1px solid #f2f2f2;
        padding: 10px 25px 10px 25px;

    }
    .write-input{


        width: 100%;
        height: 190px;

        outline:medium;
        border:none;
        resize:none;
        font-size:22px ;
        color: #505050;

    }

    .add-img{
        height: 196px;
        background: #ffffff;
    }
    .anonymity-evalute{
        padding-top: 38px;


    }
    .verify-submit{
        padding-top: 90px;
    }


</style>
<script type="text/babel">
    import submit from "../submit"
    export default{
        data(){
            return {

            }
        }
        , components: {
            submit
        }
    }
</script>
