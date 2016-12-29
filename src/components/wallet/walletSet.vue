<template>
    <div>
        <link-list :title="pwoSet.title" :to="pwoSet.to"></link-list>
        <a class="flex-space link-li" href="tel:400-699-9226">
            <div class="title-name flex-space" data-text="联系客服"></div>
            <div class="link-details">
                <i class="icon icon-arrow-right"></i>
            </div>
        </a>
        <link-list :title="about.title" :to="about.to" ></link-list>
    </div>
</template>
<style>
    .link-li a{color:#000;}
</style>
<script type="text/babel">
    import linkList from '../linkList'
    export default{
        data(){
            return {
                pwoSet:{
                    title:"支付密码",
                    to:{name:"keyboard",params:{type:'oldPassword'}}
                },
                about:{
                    title:"关于我的钱包",
                    to:{name:"agreementDetails",query:{title:'《关于我的钱包》',type:2}}
                }
            }
        }
        , components: {
            linkList
        }
    }
</script>
