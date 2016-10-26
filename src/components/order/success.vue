<style>
    .success{padding-top:70px;text-align:center;position:relative;background:#fff;}
    .success:before {content:"";position: absolute;
        left: 0;bottom: 0; width: 100%;height: 0.25em;
        background:#fff;
        background: -webkit-linear-gradient(45deg, #f2f2f2 45%, #e3e3e3, transparent 55%, transparent 100%),-webkit-linear-gradient(315deg, #f2f2f2 45%, #e3e3e3, transparent 55%, transparent 100%);
        background: linear-gradient(45deg, #f2f2f2 45%, #e3e3e3, transparent 55%, transparent 100%),linear-gradient(315deg, #f2f2f2 45%, #e3e3e3, transparent 55%, transparent 100%);
        background-size: 0.5em 0.5em;
        background-repeat: repeat-x, repeat-x;}
    .success-hd{line-height:68px;color:#373737;font-family:"Microsoft Yahei";}
    .success-hd h3{font-size:30px;}
    .success-hd p{padding:8px 0;color:#c3c3c3;font-size:22px}
    .success-btn-wrap{-webkit-box-align:center;-webkit-box-pack:justify;align-items:center;justify-content:space-between;padding:67px 5%;}
    .success-btn-wrap a{color:#fff;background:#afafaf;font-size:32px;line-height:80px;width:48%;text-align:center;border-radius:0.2em;display:block;}
    .success-btn-wrap a:first-of-type{background:#e85350;}
</style>
<template>
    <div class="success-wrap">
        <div class="success">
            <header class="success-hd">
                <h3>恭喜您兑换成功</h3>
                <p>您可以在我的商品订单中查看发货进度</p>
            </header>
        </div>
        <div class="success-btn-wrap flex-box">
            <a>兑换商场首页</a>
            <a>我的商品订单</a>
        </div>
    </div>
</template>
<script type="text/babel">
  export default{
  }
</script>
