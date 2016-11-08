// 根据cityCode fetch 对应区县
export const cityFetchCounty = (areaList,cityCode) => {
    return Promise.resolve(areaList.filter(item => item.parentCode == cityCode))
}
//图像预加载处理方法
export const imgLoad = () => {
    var list = [], intervalId = null,
        tick = function () {
            for (var i = 0; i < list.length; i++) {
                list[i].end ? list.splice(i--, 1) : list[i]()
            }
            !list.length && stop()
        },
        stop = function () {
            clearInterval(intervalId)
            intervalId = null;
        };
    return function (url, ready, load, error) {
        let onready, width, height, newWidth, newHeight,
            img = new Image()
        img.src = url
        //如果图片被缓存，则直接返回缓存数据
        if (img.complete) {
            ready.call(img)
            load && load.call(img)
        }
        width = img.width
        height = img.height
        // 加载错误后的事件
        img.onerror = function () {
            error && error.call(img)
            onready.end = true
            img = img.onload = img.onerror = null
        };
        // 图片尺寸就绪
        onready = function () {
            newWidth = img.width
            newHeight = img.height
            if (newWidth !== width || newHeight !== height ||
                // 如果图片已经在其他地方加载可使用面积检测
                newWidth * newHeight > 1024
            ) {
                ready.call(img)
                onready.end = true
            }
        };
        onready();
        // 完全加载完毕的事件
        img.onload = function () {
            !onready.end && onready()
            load && load.call(img)
            img = img.onload = img.onerror = null
        }
        // 加入队列中定期执行
        if (!onready.end) {
            list.push(onready)
            // 无论何时只允许出现一个定时器，减少浏览器性能损耗
            if (intervalId === null) intervalId = setInterval(tick, 40)
        }
    }
}
