/**
 * API
 */
import Vue from 'vue'
import store from '../store'
import MessageBox from '../msgbox';
// const TOKEN = store.getters.getToken
/**
 * 数据请求 code:0 成功
 * @params
 */
const postData = (url,params) => {
    return Vue.http.post(url,params).then(res => {
        let data = JSON.parse(res.data)
        if(data.code != 0) {
            MessageBox.alert(data)
            return Promise.reject()
        }
        console.log(JSON.stringify(data.data))
        return Promise.resolve(data.data)
    }).catch(res => {
        return Promise.reject()
    })
}
export default {
    /**
     * 验证码和普通登入
     * @params  option:接口参数 ,cb：成功回调 ,errorCb：失败回调
     */
    getLoginInformation (option,cb,errorCb) {
        let url,params;
        if(typeof option.vcode != 'undefined') {
            url = '/api/open/member/vcodelogin.json'
            params = {"userType":"member","loginId":option.loginId,"vcode":option.vcode}
        } else {
            url = '/api/open/member/login.json'
            params = {"userType":"member","loginId":option.loginId,"password":option.password}
        }
        return Vue.http.post(url,params).then(res => {
            let data = JSON.parse(res.data)
            if(data.code != 0) {
                errorCb()
                return Promise.reject()
            }else {
                window.localStorage.token = data.data.token
            }
            return cb(data.data)
        }).catch(res => {
            errorCb()
            return Promise.reject()
        })
    }
    /**
     * 代金券列表
     * @params  token,start,rows
     */
    ,getChit({token=store.getters.getToken,start=0,rows=10}={}) {
        let url,params;
        url = '/api/pri/coupon/list.json'
        params = {"token":token,"start":start,"rows":rows}
        return postData(url,params)
    }
    /**
     * 订单列表
     * @params  function
     * @option  type 接口类型
     */
    ,postOrder(type,{token=store.getters.getToken,start=0,rows=10}={}) {
        let url,params;
        if(type=="chit") {
            url = '/api/pri/order/listcoupon.json'
        } else if(type=="scan") {
            url = '/api/pri/scancode/cashOrderMember.json'
        }
        params = {"token":token,"start":start,"rows":rows}
        return postData(url,params)
    }

    /**
     * 订单列表
     * @params  function
     * @option  type 接口类型
     */
    ,postOrderDetails({token=store.getters.getToken,orderId}={}) {
        let url,params;
        url = '/api/pri/order/detail.json'
        params = {token,orderId}
        return postData(url,params)
    }

    /**
     * 获取可退款代金券列表
     * @params  function
     * @option  orderNum
     */
    ,postCanRefund({token=store.getters.getToken,orderNum}={}) {
        let url,params;
        url = '/api/pri/refund/canrefundoffline.json'
        params = {"token":token,"orderNum":orderNum}
        return postData(url,params)
    }
    /**
     * 获取会员退款原因模板
     * @params  function
     * @option  orderNum
     */
    ,postRefundReason() {
        let url = '/api/open/refund/refundresaon.json'
        return postData(url)
    }
    /**
     * 提交退款申请
     * @params  function
     * @option  orderNum
     */
    ,postApplyRefund({token=store.getters.getToken,refundReason,refCashAmout,refRedPacket,refGiveAway,refundRemark,couponIds}={}) {
        let url,params;
        url = '/api/pri/refund/applycouponrefund.json'
        params = {token,refundReason,refCashAmout,refRedPacket,refGiveAway,refundRemark,couponIds}
        return postData(url,params)
    }
    /**
     * 优惠券请求
     * @params  shopId:接口参数 ,errorCb：失败回调
     */
    ,getCouponList(token,start=0,rows=10){
        let url,params;
        url = '/api/benefit/benefitmember/get_benefitMember.json'
        params = {"token":token,"start":start,"rows":rows}
        return postData(url,params)
    }

    /**
     * 评论列表
     * @params
     */
    ,getEvaluateList(merchantId=8,start=0,rows=10){
        let url,params;
        url = '/api/open/review/data.json'
        params = {"merchantId":merchantId,"start":start,"rows":rows}
        return postData(url,params)
    }

    /**
     * 钱包首页
     * @params
     */
    ,getwelletHome(token){
        let url,params;
        url = '/api/pri/wallet/index.json'
        params = {"token":token}
        return postData(url,params)

    }

    /**
     *钱包收支明细
     * @params
     * type （''全部，earn收入，expense支出）可不传为全部
     * startdate 开始时间
     * enddate 结束时间
     * rows   每页几条记录
     * start 记录起始条数
     */
    ,getincome(token,startdate='2015-05-01',enddate='2016-10-01',start=0,rows=10,type=''){
        let url,params;
        url = '/api/pri/wallet/cashdetail.json'
        params = {
            "token":token,
            "startdate":startdate,
            "enddate":enddate,
            "start":start,
            "rows":rows,
            "type":type,
        }
        return postData(url,params)
    }
    /**
     *
     * 现金红包明细
     * @params
     */
    ,getRedMoney(token){
        let url,params;
        url = '/api/pri/wallet/reddetail.json'
        params = {"token":token}
        return postData(url,params)
    }
    /**
     *
     * 我的收藏 含店铺收藏列表  商品收藏列表
     * @params
     */
    ,getMembercollect(token){
        let url,params;
        url = '/api/pri/membercollect/mycollect.json'
        params = {"token":token}
        return postData(url,params)

    }
    /*
     *
     * 消息列表
     * @params
     */
    ,getMessage(token){
        let url,params;
        url = '/api/usermessage/packetList.json'
        params = {"token":token}
        return postData(url,params)
    }
}
