import axios from 'axios';
// 创建axios实例
// 创建请求时可以用的配置选项
// axios的全局配置
axios.defaults.baseURL = 'https://www.hotelcard.cn/Publish';
axios.interceptors.request.use(config=>{
    let uid=sessionStorage.getItem('uid');
    let sign=sessionStorage.getItem('sign');
    if(uid && sign) {
        config.headers.common.uid = uid;
        config.headers.common.sign = sign;
    }
    return config
},error => {
    return Promise.error(error);
})
export  default axios;

