<template>
    <div class="chit-list-el">
        <!--<div ref="more" v-infinite-scroll="more" infinite-scroll-disabled="busy" infinite-scroll-distance="10">-->
            <chit-block v-for="list in lists"  :code="list.code" :name="list.name" :date="list.useEndDateTime"></chit-block>
        <!--</div>-->
    </div>
</template>
<style lang="scss" rel="stylesheet/scss">
    .chit-list-el{
        padding:0 17px;
    }
</style>
<script type="text/babel">
    import chitBlock from "./chitBlock"
    import member from "../../api/member"
    export default{
        data(){
            return{
                busy: false
                ,lists:null
            }
        }
        ,components:{
            chitBlock
        }
        ,beforeRouteEnter (to, from, next) {
            member.getChit().then(val => {
                next(vm => {
                    vm.lists = val.rows
//                    console.log(JSON.stringify(val.rows))
                })
            }).catch(res => {
                next(false)
            })
        }
        ,methods:{
            more() {
                var self = this;
                self.busy = true;
                var app = self.$refs.more
                console.log('loading... ' + new Date());
                setTimeout(() => {
                    var height = app.clientHeight;
                    app.style.height = height + 300 + 'px';
                    self.busy = false;
                }, 1000);
            }
        }
    }
</script>
