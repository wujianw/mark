/**
 * API
 */
import Vue from 'vue'
import store from '../store'
import {postData} from './public'
// const TOKEN = store.getters.getToken
/**
 * 数据请求 code:0 成功
 * @params
 */

export default {
    /**
     * 验证码和普通登入
     * @params  option:接口参数 ,cb：成功回调 ,errorCb：失败回调
     */
    getLoginInformation (option,cb,errorCb) {
        let url,params;
        if(typeof option.vcode != 'undefined') {
            url = '/api/open/member/vcodelogin.json'
            params = {"userType":"member","loginId":option.loginId,"vcode":option.vcode,}
        } else {
            url = '/api/open/member/login.json'
            params = {"userType":"member","loginId":option.loginId,"password":option.password}
        }
        return Vue.http.post(url,params).then(res => {
            let data = JSON.parse(res.data)
            if(data.code != 0) {
                errorCb()
                return Promise.reject(data.message)
            }else {
                window.localStorage.token = data.data.token
            }
            return cb(data.data)
        }).catch(res => {
            errorCb()
            return Promise.reject(res)
        })
    }
    /*
    * 修改密码
    * */
    ,pwd({token=store.getters.getToken,oldPassword,password}) {
        let url='/api/pri/member/modify_pwd.json',
            params = {token,oldPassword,password}
        return postData(url,params)
    }
// /api/pri/wallet/refushdata.htm
    /*
    * 55. 首页获取我的个人信息
    * */
    ,getIndex({token=store.getters.getToken}) {
        let url='/api/pri/wallet/refushdata.json',
            params = {token}
        return postData(url,params)
    }
    /**
     * 代金券列表
     * @params  token,start,rows
     */
    ,getChit({token=store.getters.getToken,start,rows}={}) {
        let url,params;
        url = '/api/pri/coupon/list.json'
        params = {token,start,rows}
        return postData(url,params)
    }

    /**
     * 订单列表
     * @params  function
     * @option  type 接口类型
     */
    ,postOrder(type,{token=store.getters.getToken,start=0,rows=10,isComment='',state}={}) {
        let url,params;
        if(type=="chit") {
            url = '/api/pri/order/listcoupon.json'
        } else if(type=="scan") {
            url = '/api/pri/scancode/cashOrderMember.json'
        }
        params = {token,start,rows,state,isComment}
        return postData(url,params)
    }

    /**
     * 29. 订单详情
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
    ,getCouponList({token=store.getters.getToken,start,rows,shopId=''}={}){
        let url,params;
        url = '/api/benefit/benefitmember/get_benefitMember.json'
        params = {token,start,rows,shopId}
        return postData(url,params)
    }
    /**
     * 所有可领取优惠券列表
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
     * 提交评论
     * @params  orderNo
     */
    ,getEvaluate({token=store.getters.getToken,orderNo,goodsId,score,content,photo1='',photo2='',photo3='',anonymityFlag}={}) {
        let url,params
        url = '/api/pri/memberreview/refer.json'
        params = {token,orderNo,goodsId,score,content,photo1,photo2,photo3,anonymityFlag}
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
     * 钱包支付password设置
     * @params
     */
    ,updatePwd({token=store.getters.getToken,password}={}){
        let url,params;
        url = '/api/open/wallet/checkpwd.json'
        params = {token,password}
        console.log(params)
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
    /*
    *  收藏商家 or 商品
    *  collectType => 收藏类型（0：商品、1：商户）
    *  collectId => 商品ID或商户ID
    * */
    ,getCollect({token=store.getters.getToken,collectType,collectId}={}){
        let url,params;
        url = '/api/pri/membercollect/collect.json'
        params = {token,collectType,collectId}
        return postData(url,params)

    }
    /*
    *  单个 取消收藏
    *  @params collectType => 收藏类型（0：商品、1：商户）
    *  @params collectId => 商品ID或商户ID
    * */
    ,getUnCollect({token=store.getters.getToken,collectType,collectId}={}){
        let url,params;
        url = '/api/pri/membercollect/uncollect.json'
        params = {token,collectType,collectId}
        return postData(url,params)
    }
    /**
     * 批量取消收藏
     * @params collectType => 0：商品、1：商户
     * @params collectIds => 商品ID或商户ID，以逗号隔开
     */
    ,getUnCollects({token=store.getters.getToken,collectType,collectIds}={}){
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
    ,getUsermessage({token=store.getters.getToken,senderId,start,rows}={}){
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
    /*
     *
     * 获取消息
     * @params
     */
    ,getReception(token=store.getters.getToken){
        let url,params;
        url = '/api/usermessage/reception.json'
        params = {token}
        return postData(url,params)
    }
    /*
     *
     * 消息详情
     * @params
     */
    ,getMessageDetails({token=store.getters.getToken,msgId}={}){
        let url,params
        url = '/api/usermessage/detail.json'
        params = {token,msgId}
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
    ,confirmScanbill({token=store.getters.getToken,merchantId,campaignId,orderAmount,paidAmount,disconuntAmount,noDisAmount,disAmount}={}){
        let url,params
        url = '/api/pri/scancode/creatOrder.json'
        params = {token,merchantId,campaignId,orderAmount,paidAmount,disconuntAmount,noDisAmount,disAmount}
        console.log(params)
        return postData(url,params)
    }
    ,scanBill({merchantId}={}){
        let url,params
        url = '/api/open/refund/listByMerchantId.json'
        params = {merchantId}
        return postData(url,params)
    }
    ,scanDetails({token,cashOrderId}={}){
        let url,params
        url = '/api/pri/scancode/cashOrderDetail.json'
        params = {token,cashOrderId}
        return postData(url,params)
    }
    //绑定
    ,changeCard({token=store.getters.getToken,blockNum,authCode}={}){
        let url,params;
        url = '/api/pri/member/bind_card.json'
        params = {token,"newCId":blockNum,"aCode":authCode}
        return postData(url,params)
    }
    //绑定认证
    ,activate({token=store.getters.getToken,name,idCard="",areaCode="",email=""}={}){
        let url,params;
        url = '/api/pri/member/name_auth.json'
        params = {token,name,idCard,areaCode,email}
        return postData(url,params)
    }
    //46. 绑定认证后修改
    ,changeInformation({token=store.getters.getToken,areaCode,email}={}){
        let url,params
        url = '/api/pri/member/modify_msg.json'
        params = {token,areaCode,email}
        return postData(url,params)
    }
    /*
    * 绑定手机号
    * type 1验证密码 => 2验证手机号是否存在 => 3提交验证码修改手机号
    * */
    ,bindMobile(type,{token=store.getters.getToken,password,mobile='',vcode=''}={}){
        let url,params
        url = '/api/pri/member/bind_mobile'+type+'.json'
        params = {token,password,mobile,vcode}
        return postData(url,params)
    }
    /*
    * 获取验证码
    * */
    ,getMobileCode({type,mobile=''}={}){
        let url,params
        url = '/api/open/common/get_vcode.json'
        params = {mobile,type}
        return postData(url,params)
    }
    /*
    * 获取会员信息
    * */
    ,getMember(token=store.getters.getToken) {
        let url = '/api/pri/member/getmember.json',
            params = {token}
        return postData(url,params)
    }
}
