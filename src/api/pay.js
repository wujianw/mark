/*
* pay API
* */
import {postData} from './public'
import store from '../store'
export default {
    /*
    * 69.  充值钱包赠送红包金额
    * token,amount
    * */
    ablePacketRed({token=store.getters.getToken,amount}={}) {
        let url = '/api/pri/campaign/getablePacketRed.htm',
            params = {token,amount}
        return postData(url,params)
    },
    /*
     * 64.	钱包充值
     * token,tradeAmount
     * */
    recharge({token=store.getters.getToken,tradeAmount}={}) {
        let url = '/api/pri/wallet/recharge.htm',
            params = {token,tradeAmount}
        return postData(url,params)
    },

//

    /*
     * 185.	微信统一下单H5版
     * params body描述,outTradeNo
     * notifyUrl:'/wechatpay/wechat_paynotify.htm'
     * outTradeNo:tradeSid
     * */
    placeOrder({body,outTradeNo,totalFee,notifyUrl,openid}={}) {
        let url = '/wechatpay/uniform_order_h5.htm',
            params = {notifyUrl, totalFee, outTradeNo, body, openid, deviceInfo:'WEB'}
        console.log(params)
        return postData(url,params)
    },
    payCb({orderNum,type='LOCAL'}={}) {
        let url = '/wechatpay/orderquery_h5.htm',
            params = {orderNum,type}
        return postData(url,params)
    },
    /*
    * 27. 创建订单
    * token,goodsId,number,buyerRemark,totalPrice,packetPayAmout,benefitId
    * */
    createOrder({token=store.getters.getToken,goodsId,number,buyerRemark,totalPrice,packetPayAmout,benefitId}={}) {
        let url = '/api/pri/order/create.json',
            params = {token,goodsId,number,buyerRemark,totalPrice,packetPayAmout,benefitId}
        return postData(url,params)
    }
}
