<template>
    <div>
        <div class="flex-start grade">
            <span class="grade-title">满意度</span>
            <div class="flex-space go-grade">
                <i v-for="index in 5" class="icon icon-evaluate" :class="{'no-grade' : index > grade}" @touchend="goGrade(index)"></i>
            </div>
            <mark class="grade-lint">{{gradeLint}}</mark>
        </div>
        <div class="write">
            <textarea v-model="content"   placeholder="好的,不好的.都在这说说吧(最少需输入五个字哦)" class="write-input"></textarea>
        </div>
        <div class="add-img-wrap flex-start">
            <div class="add-img" v-for="(item,index) in photos" @click="deletePic(index)">
                <i class="icon icon-off"></i>
                <img :src="item" alt="">
            </div>
            <div class="add-img add-img-btn">
                <input type="file" value="" @change="addPic">
            </div>
        </div>
        <div class="anonymity-evaluate" @touchend="anonymity"><i class="icon icon-ok" :class="{'ok':isAnonymity}"></i><span>匿名评价</span></div>
        <div class="submit-wrap">
            <submit class="verify-submit" :dis="!1" value="发布评论" @commit="submit"></submit>
        </div>
    </div>
</template>
<style lang="scss" rel="stylesheet/scss">
    .grade{
        margin-top: 18px;
        height: 68px;
        background: #ffffff;
        border-bottom: 1px solid #f2f2f2;
        padding-left: 25px;
        .grade-title{
            font-size:28px;
            color: #505050;
        }
        .go-grade{
            padding-left:32px;
            width:250px;
            i{font-size:40px;color:#ff9a00;}
            i.no-grade{color:#e1e0e0;}
        }
        .grade-lint{
            font-size:27px;
            color: #f9a828;
            padding-left: 44px;
            background:#fff;
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
    .add-img-wrap{
        background:#fff;
    }
    .add-img{
        position:relative;
        margin:20px;
        width: 155px;
        height: 155px;
        border:1px dashed rgb(189, 189, 189);
        border-radius: 5px;
        overflow: hidden;
        i{
            position:absolute;
            top:0;
            right:0;
            font-size:28px;
        }
        img{
            width:100%;
            height:100%;
        }
        input{
            opacity: 0;
            width: 150px;
            height: 150px;
        }
    }
    .add-img-btn{
        background:url(../../assets/img/camera.png) no-repeat center;
    }
    .anonymity-evaluate{
        padding-top: 38px;
        font-size:28px;

        i{
            margin:10px;
            border:1px solid #e85453;
            border-radius: 50%;
            font-size:28px;
            color:transparent;
        }
        i.ok{
            border:1px solid #f2f2f2;
            color:#e85453;
        }
    }
    .verify-submit{
        padding-top: 90px;
    }
    .submit-wrap{
        padding:15px;
    }
</style>
<script type="text/babel">
    import submit from "../submit"
    import {getObjectURL,convertImgToBase64} from "../../assets/js/public"
    import MessageBox from "../../msgbox"
    import member from "../../api/member"
    export default{
        data(){
            return {
                gradeLint:"满意",
                grade:5,
                imgCount:0,
                content:'',
                photos:[],
                isAnonymity:false
            }
        },
        computed:{
            gradeLint() {
                if(this.grade == 5){
                    return "满意"
                }else if(this.grade == 4){
                    return "挺好"
                }else if(this.grade == 3){
                    return "一般"
                }else if(this.grade == 2){
                    return "较差"
                }else if(this.grade == 1){
                    return "差评"
                }
            }
        },
        methods:{
            goGrade(index) {
                this.grade = index
            },
            addPic(event) { // 上传图片
                let currentTarget = event.currentTarget,
                    self = this
                var imageUrl = getObjectURL(currentTarget.files[0]);
                convertImgToBase64(imageUrl, function(base64Img){
                    if(self.imgCount >= 3){
                        MessageBox.alert("最多只能上传3张图片")
                    }else{
                        self.photos.push(base64Img)
                        self.imgCount++
                    }

                });
            },
            deletePic(index) {/* 删除图片 */
                this.photos.splice(index,1)
            },
            anonymity() {
                this.isAnonymity = !this.isAnonymity
                this.imgCount--
            },
            submit(){
                let self = this
                let option = Object.assign({
                    score:self.grade,
                    content:self.content,
                    anonymityFlag:self.isAnonymity ? 1 : 0
                },self.$route.query)
                self.photos.map((item,index) => {
                    option['photo'+(index+1)] = item.split(",")[1]
                })
                member.getEvaluate(option).then(() => {
                    this.$router.replace({name:'user'})
                }).catch(() => {})
            }
        },
        components: {submit}
    }
</script>
