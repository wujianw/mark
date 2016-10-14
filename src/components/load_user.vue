<template>
    <div class="load-view">
        <ul class="load-mobile-view">
            <li class="flex-space">
                <div class="mobile-text flex-space">
                    <i></i>
                    <input class="input" type="text" placeholder="请输入您的手机号码">
                    <i></i>
                </div>
            </li>
            <li class="flex-space">
                <div class="mobile-text flex-space">
                    <i></i>
                    <input class="input" type="text" placeholder="请输入您密码">
                    <i></i>
                </div>
            </li>
        </ul>
        <div class="load-btn" @click="">
            <span>登录</span>
        </div>
        <div class="flex-space no-password">
            <p><router-link :to="{ name: 'loadMobile'}"><span>立即注册</span></router-link></p>
            <p>忘记密码</p>
        </div>
    </div>
</template>
<script>
    export default{
        data(){
            return{
                msg:'hello vue'
            }
        }
    }
</script>
