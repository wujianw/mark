<template>
    <div>
        <div></div>
        <order :details="details"></order>
    </div>
</template>
<style></style>
<script type="text/babel">
    import order from './order'
    export default {
        data() {
            return {
                details:{
                    to:{
                        name:'orderDetails',
                        params:{type:1}
                    }
                }
            }
        }
        ,components:{
            order
        }
    }
</script>
