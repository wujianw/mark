<template>
    <div class="chit-list-el">
        <div v-infinite-scroll="more" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
            <chit-block v-for="list in lists"  :code="list.code" :name="list.name" :date="list.useEndDateTime"></chit-block>
        </div>
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
                busy: false,
                start:0,
                lists:[]
            }
        }
        ,methods:{
            fetchData(rows=10) {
                member.getChit({rows,start:this.start}).then(data => {
                    this.start += rows
                    this.lists.push(...data.rows)
                    this.busy = data.rows.length != rows
                })
            },
            more() {
                this.busy = true
                this.fetchData()
            }
        }
        ,components:{chitBlock}
    }
</script>
