export const getBeforeDate = n => {
    let d = new Date(),
        year = d.getFullYear(),
        mon = d.getMonth()+1,
        day = d.getDate()
    if(day <= n){
        if(mon > 1) {
            mon = mon-1
        }
        else {
            year = year-1;
            mon = 12;
        }
    }
    d.setDate(d.getDate()-n)
    year = d.getFullYear()
    mon=d.getMonth()+1
    day=d.getDate()
    let s = year+"-"+(mon<10?('0'+mon):mon)+"-"+(day<10?('0'+day):day)
    return s;
}

//createobjecturl()静态方法创建一个包含了DOMString代表参数对象的URL。该url的声明周期是在该窗口中.也就是说创建浏览器创建了一个代表该图片的Url.
export const getObjectURL = (file) => {
    var url = null ;
    if (window.createObjectURL!=undefined){
        // basic
        url = window.createObjectURL(file) ;
    } else if (window.URL!=undefined){
        // mozilla(firefox)
        url = window.URL.createObjectURL(file) ;
    } else if (window.webkitURL!=undefined){
        //web_kit or chrome
        url = window.webkitURL.createObjectURL(file) ;
    }
    return url ;
}

//生成图片的base64编码
export const convertImgToBase64 = (url, callback, outputFormat) => {
    //html5 的convas画布
    var canvas = document.createElement('CANVAS');
    var ctx = canvas.getContext('2d');
    var img = new Image;
    img.crossOrigin = 'Anonymous';
    img.onload = function(){
        var width = img.width;
        var height = img.height;
        // 按比例压缩4倍
        //var rate = (width<height ? width/height : height/width)/4;
        //原比例生成画布图片
        var rate = 0.1;
        canvas.width = width*rate;
        canvas.height = height*rate;
        ctx.drawImage(img,0,0,width,height,0,0,width*rate,height*rate);
        // canvas.toDataURL 返回的是一串Base64编码的URL，当然,浏览器自己肯定支持
        var dataURL = canvas.toDataURL(outputFormat || 'image/png');
        callback.call(this, dataURL);
        canvas = null;
    };
    img.src = url;
}
