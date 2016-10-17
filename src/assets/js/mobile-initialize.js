var appVersion = window.navigator.appVersion;   //客户端信息  
var isSystem=appVersion.indexOf("Android")>-1 || appVersion.indexOf("android")>-1?"android":false;  
if(isSystem!="android"){  
    isSystem=appVersion.indexOf("iPhone")>-1 || appVersion.indexOf("iPod")>-1?"iphone":false;
}
var meta_str  = "";
switch (isSystem){  
    case "android":
    	var AppleWebKitVersion = appVersion.substr(appVersion.indexOf('AppleWebKit') + 12, 3);
    	var androidVersion = appVersion.substr(appVersion.indexOf('Android') + 8, 3);
    	var windowWidth=window.screen.width;    //屏幕分辨率
        var devicePixelRatio = window.devicePixelRatio; //屏幕分辨率与像素比
       if(AppleWebKitVersion < 537){
    	   var targetDensitydpi =750/ windowWidth * devicePixelRatio * 160;
    	   meta_str = '<meta name="viewport" content="width=device-width,target-densitydpi='+targetDensitydpi+',user-scalable=yes">';
       }else{
    	   var targetDensitydpi=windowWidth/750;
    	   meta_str = '<meta name="viewport" content="width=device-width,initial-scale='+targetDensitydpi+',minimum-scale='+targetDensitydpi+', maximum-scale='+targetDensitydpi+',user-scalable=yes" />';
       }
        break;
    case "iphone":
        var windowWidth=window.screen.width;    //屏幕分辨率
        var targetDensitydpi=windowWidth/750;
        meta_str = '<meta name="viewport" content="width=device-width,initial-scale='+targetDensitydpi+',minimum-scale='+targetDensitydpi+', maximum-scale='+targetDensitydpi+',user-scalable=yes" />';
        meta_str += '<meta name="format-detection" content="telephone=no"><meta name="apple-mobile-web-app-capable" content="no" /><meta name="apple-mobile-web-app-status-bar-style" content="blank" />';
        break;
}
var $head = document.head || document.getElementsByTagName('head')[0];
$head.insertAdjacentHTML("beforeend",meta_str);
