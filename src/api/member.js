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
            return Promise.reject()
        }
        console.log(JSON.stringify(data))
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
     * 订单详情
     * @params  function
     * @option  type 接口类型
     */
    ,postChitOrderDetails({token=store.getters.getToken,orderId}={}) {
        let url,params;
        url = '/api/pri/order/detail.json'
        params = {token,orderId}
        return postData(url,params)
    }
    ,postScanOrderDetails({token=store.getters.getToken,cashOrderId}={}) {
        let url,params;
        url = '/api/pri/scancode/ cashOrderDetail.json'
        params = {token,cashOrderId}
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
     * @option  token,refundReason,refCashAmout,refRedPacket,refGiveAway,refundRemark,couponIds
     */
    ,postApplyRefund({token=store.getters.getToken,refundReason,refCashAmount,refRedPacket,refGiveAway,refundRemark,couponIds}={}) {
        let url,params;
        url = '/api/pri/refund/applycouponrefund.json'
        params = {token,refundReason,refCashAmount,refRedPacket,refGiveAway,refundRemark,couponIds}
        console.log(params)
        return postData(url,params)
    }

    /**
     * 取消退款
     * @params  function
     * @option  orderNum
     */
    ,postRefundClose({token=store.getters.getToken,orderNum}={}) {
        let url,params;
        url = '/api/pri/refund/cancelrefund.json'
        params = {token,orderNum}
        return postData(url,params)
    }

    /**
     * 查看退款详情
     * @params  token,refundOrderNum:退款编号
     */
    ,getRefundDetails({token=store.getters.getToken,refundOrderNum}={}){
        let url,params
        url = '/api/pri/refund/refundschedule.json'
        params = {token,refundOrderNum}
        return postData(url,params)
    }
    /**
     * 优惠券请求
     * @params  shopId:接口参数 ,errorCb：失败回调
     */
    ,getCouponList({token=store.getters.getToken,start,rows}={}){
        let url,params;
        url = '/api/benefit/benefitmember/get_benefitMember.json'
        params = {token,start,rows}
        return postData(url,params)
    }
    /**
     * 所有可领取代金券列表
     * @params  shopId:接口参数 ,errorCb：失败回调
     */
    ,getAllCoupon({start=0,rows=10}={}){
        let url,params
        url = '/api/open/benefitcampaign/data.json'
        params = {campType:1,start,rows}
        return postData(url,params)
    }
    /**
     * 会员领取优惠券
     * @params  shopId:接口参数 ,errorCb：失败回调
     */
    ,fetchCoupon({token=store.getters.getToken,campaignId}={}){
        let url,params
        url = '/api/benefit/benefitmember/draw.json'
        params = {token,campaignId}
        return Vue.http.post(url,params).then(res => {
            let data = JSON.parse(res.data)
            return Promise.resolve(data)
        }).catch(res => {
            return Promise.reject(res)
        })
    }

    /**
     * 评论列表
     * @params
     */
    ,getEvaluateList({merchantId,goodsId,start=0,rows=10,mode=0}={}){
        let url,params
        url = '/api/open/review/data.json'
        params = {merchantId,start,rows,goodsId,mode}
        return postData(url,params)
    }

    /**
     * 钱包首页
     * @params
     */
    ,getwelletHome(token=store.getters.getToken){
        let url,params
        url = '/api/pri/wallet/index.json'
        params = {token}
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
    ,getincome({token=store.getters.getToken,startdate,enddate,start,rows,type}={}){
        let url,params;
        url = '/api/pri/wallet/cashdetail.json'
        params = {token,startdate,enddate,start,rows,type}
        return postData(url,params)
    }
    /**
     *
     * 现金红包明细
     * @params
     */
    ,getRedMoney(token=store.getters.getToken){
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
    ,getMemberCollect(token=store.getters.getToken){
        let url,params;
        url = '/api/pri/membercollect/mycollect.json'
        params = {"token":token}
        return postData(url,params)

    }
    /**
     *
     * 取消收藏
     * @params collectType => 0：商品、1：商户
     * @params collectIds => 商品ID或商户ID，以逗号隔开
     */
    ,getCloseCollect({token=store.getters.getToken,collectType,collectIds}={}){
        let url,params;
        url = '/api/pri/membercollect/uncollects.json'
        params = {token,collectType,collectIds}
        return postData(url,params)

    }
    /*
     *
     * 消息列表
     * @params
     */
    ,getMessage(token=store.getters.getToken){
        let url,params
        url = '/api/usermessage/packetList.json'
        params = {token}
        return postData(url,params)
    }
    /*
     *
     * 二级消息列表
     * @params
     */
    ,getUsermessage({token=store.getters.getToken,senderId,start=0,rows=10}={}){
        let url,params
        url = '/api/usermessage/data.json'
        params = {token,senderId,start,rows}
        return postData(url,params)
    }
    /*
     *
     * 删除消息
     * @params
     */
    ,getDelete({token=store.getters.getToken,id}={}){
        let url,params
        url = '/api/usermessage/delete.json'
        params = {token,id}
        return postData(url,params)
}
    /**
     * 养老金列表
     * @params  token,start,rows
     */
    ,getAnnuityList({token=store.getters.getToken,startTime,endTime,pageSize,pageIndex}={}) {
        let url,params
        url = '/api/pri/member/old_age_persions.json'
        params = {token,startTime,endTime,pageSize,pageIndex}
        return postData(url,params)
    }
    /**
     * 扫码支付
     * @params  token,start,rows
     */
    ,confirmScanbill({token=store.getters.getToken,merchantId="8",campaignId="42",orderAmount=10,paidAmount=10,disconuntAmount=10,noDisAmount=10,disAmount=10}={}){
        let url,params
        url = '/api/pri/scancode/creatOrder.htm'
        params = {token,merchantId,campaignId,orderAmount,paidAmount,disconuntAmount,noDisAmount,disAmount}
        return postData(url,params)
    }
    //绑定
    ,changecard({token=store.getters.getToken,blockNum="22",authCode=""}={}){
        let url,params;
        url = '/api/pri/member/bind_card.json'
        params = {"token":token,"newCId":blockNum,"aCode":authCode}
        console.log(params)
        return Vue.http.post(url,params).then(res => {
            let data = JSON.parse(res.data)
            if(data.code != 0) {
                return Promise.reject(data.message)
            }
            console.log(data.data)
            return Promise.resolve(data.data)
        }).catch(res => {
            return Promise.reject(res)
        })
    }
    //绑定认证
    ,activate({token=store.getters.getToken,name="22",idCard="",areaCode="",email=""}={}){
        let url,params;
        url = '/api/pri/member/name_auth.json'
        params = {token,name,idCard,areaCode,email}
        return postData(url,params)
    }
    /*
    * 获取会员信息
    * */
    ,getMember(token=store.getters.getToken) {
        let url = '/api/pri/member/getmember.htm',
            params = {token}
        return postData(url,params)
    }
}
