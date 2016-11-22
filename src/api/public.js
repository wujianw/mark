import MessageBox from '../msgbox'
export default {
    postData(url,params){
        return Vue.http.post(url,params).then(res => {
            let data = JSON.parse(res.data)
            if(data.code != 0) {
                MessageBox.alert(data)
                return Promise.reject()
            }
            // console.log(JSON.stringify(data.data))
            return Promise.resolve(data.data)
        }).catch(res => {
            return Promise.reject()
        })
    },
    getData(url,params){
        return Vue.http.get(url,params).then(res => {
            let data = JSON.parse(res.data)
            if(data.code != 0) {
                MessageBox.alert(data)
                return Promise.reject()
            }
            // console.log(JSON.stringify(data.data))
            return Promise.resolve(data.data)
        }).catch(res => {
            return Promise.reject()
        })
    }
}
