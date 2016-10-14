<template>
    <div class="user-center flex-space">
        <div class="flex-space">
            <div class="hd-pic"><img src="../../static/img/hd-pic.png" alt=""/></div>
            <div class="nickname">
                <div></div>
                <div>养老金：&nbsp<span class="annuity">{{annuity}}</span></div>
            </div>
        </div>
        <div>
            <router-link></router-link>
        </div>
    </div>
</template>
<style lang="scss">
    .user-center{
        height:222px;
        padding:0 24px;
        background:url("../assets/img/user-center.png") no-repeat;
        background-size:100% 100%;
    }
    .hd-pic{
        height:110px;width:110px;
        padding:0 8px;
    }
    .nickname{
        .annuity:after{
            content:"元";
        }
    }
</style>
<script>
    export default{
        data(){
            return{
                annuity : 0.00
            }
        }
    }
</script>
