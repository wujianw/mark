    <template>
    <div class="message-item-el" v-show="show">
        <div class="flex-center msg-time">
            <span class="msg-time-span">{{obj.msgPushDate}}</span>
        </div>
        <div class="msg-body">
            <div class="msg-title">{{msgTitle}}</div>
            <div>
                <div class="msg-content"
                     :class="obj.msgType == 1 ? 'msg-plc-text' : 'msg-pic'">
                    <img v-if="obj.coverImg && obj.msgType != 2" :src="obj.coverImg" alt="">
                    <span>{{msgDesc}}</span>
                </div>
            </div>
        </div>
        <div class="flex-space msg-op">
            <div @click="remove(obj.id)">
                <i class="icon icon-delete"></i>
            </div>
            <router-link v-if="obj.coverImg && obj.msgType != 3" :to="{name:'messageDetails',query:{msgId:obj.msgId}}" class="wallet-agreement" tag="div">查看详情&gt;</router-link>
        </div>
    </div>
</template>
<style lang="scss" rel="stylesheet/scss">
    .message-item-el{
        .msg-time-span{
            color: #fff;
            padding: 5px;
            margin:20px 0;
            font-size:20px;
            background:#828585;
            text-align: center;
            width: 250px;
            border-radius: 15px;
        }
        .msg-body{
            padding:28px 36px 7px;
            border-bottom:1px solid #f2f2f2;
            background: #fff;
            /* 摘要 */
            color:#afafaf;
            span{
                display: inline-block;
                padding-left: 10px;
                width:460px;
                font:24px/32px sans-serif;
            }
            /*.msg-content:after{
                content:attr(data-content);
                font:24px/32px sans-serif;
            }*/
        }
        .msg-plc-text{
            /* 图文详情 */
            display:flex;
            justify-content:flex-start;
            align-items: center;
            padding:8px 0;
            img{width:180px;height:115px;}
            &:after{padding-left:20px;}
        }
        .msg-pic{
            /* 纯图片或者纯文字 */
            background:#fff;
            img{width:660px;}
        }
        .msg-title{
            font: 26px/40px "Microsoft Yahei";
            color: #505050;
        }
        .msg-op{
            background: #ffffff;
            padding: 0 23px;
            height: 56px;
            font-size: 22px;
            color: #505050;
            i{
                font-size:32px;
            }
        }
    }
</style>
<script type="text/babel">
    /*
     * 消息概要
     * @params
     */
    import member from "../../api/member"
    export default{
        data(){
            return{
                show:true
            }
        },
        computed:{
            msgTitle() {
                // 处理标题，大于40字，省略
                if(this.obj.msgTitle){
                    return this.obj.msgTitle.length > 40 ? this.obj.msgTitle.slice(0,40)+'...' : this.obj.msgTitle
                }else {
                    return ''
                }

            },
            msgDesc() {
                if(this.obj.msgType==1){
                    return this.obj.msgDesc.length > 72 ? this.obj.msgDesc.slice(0,72)+'...' : this.obj.msgDesc
                }else{
                    return this.obj.msgDesc
                }
            }
        },
        methods:{
            remove(id){
                member.getDelete({id}).then(() => {
                    this.show = false
                })
            }
        }
        ,props:{
            obj:{
                type:Object,
                default() {
                    return {
                        msgTitle:''
                    }
                }
            }
        }
    }
</script>
