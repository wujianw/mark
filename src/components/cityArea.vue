<template>
    <div class="city-area-el" :class="{'show':show}">
        <div class="btn">
            <button @click.stop="close">取消</button>
        </div>
        <div class="flex-center address-wrap" @click.stop="cityArea">
            <ul>
                <li v-for="item in provinceList" class="province" ref="item.currentCode" :data-code="item.currentCode" :data-text="item.currentName"></li>
            </ul>
            <ul>
                <li v-for="item in cityList" class="city" ref="item.currentCode" :data-code="item.currentCode" :data-text="item.currentName"></li>
            </ul>
            <ul>
                <li v-for="item in areaList" class="area" ref="item.currentCode" :data-code="item.currentCode" :data-text="item.currentName"></li>
            </ul>
        </div>
    </div>
</template>
<style lang="scss" rel="stylesheet/scss">
    .city-area-el{
        height:0;
        transition:height 1s;
        overflow:hidden;
        .address-wrap{

        }
        ul{
            flex-grow: 1;
            width:33%;
            height:280px;
            overflow: auto;
        }
        li{
            line-height:70px;
            text-align: center;
            font-size:28px;
            &:before{content:attr(data-text);}
        }
        li:nth-of-type(2n){
            background:#fff;
        }
        li:nth-of-type(2n+1){
            background:#e85453;
        }
        .btn {
            position:relative;
            height:70px;
            border-top:1px solid #f2f2f2;
            border-bottom:1px solid #f2f2f2;
            background:#fff;
            button{
                position:absolute;
                top:10px;
                right:50px;
                width:150px;
                height:50px;
                font-size:30px;
            }
        }
        &.show{
            height:360px;
        }
    }
</style>
<script type="text/babel">
    /*
     * 箭头标签组件
     * @params
     */
    import { mapGetters } from 'vuex'
    export default{
        data(){
            return{
                provinceName:null,
                cityName:null
            }
        },
        computed:{
            ...mapGetters({
                /*
                 * 省市区数据，当前所在城市code
                 * */
                provinceList:'provinceList',
                areaList:'areaList',
                cityList:'cityList',
                cityCode:'cityCode',
                provinceCode:'provinceCode',
                location:'location'
            })
        },
        created() {
            // 初始化区县数据
            if(!this.areaList || this.areaList.length == 0){
                this.$store.dispatch("allArea")
                this.$store.dispatch("toggleProvince",this.provinceCode)
                this.$store.dispatch("toggleCity",this.cityCode)
            }
            this.provinceName = this.location.province
            this.cityName = this.location.city
        },
        methods:{
            cityArea(event) {
                let target = event.target,
                    code = target.dataset.code,
                    name = target.dataset.text
                if(target.tagName.toLowerCase() != 'li') return
                if(target.className=='province'){
                    this.$store.dispatch("toggleProvince",code)
                    this.provinceName = name
                }else if(target.className=='city'){
                    this.$store.dispatch("toggleCity",code)
                    this.cityName = name
                }else{
                    let option = {
                        name:this.provinceName + this.cityName + name,
                        areaId:code
                    }
//                    console.log(option)
                    this.$emit('cityArea',option)
                }
//                this.$emit('cityArea')
            },
            close() {
                this.$emit('close')
            }
        },
        props:{
            show:Boolean,
        }
    }
</script>
