import md5 from "js-md5";

export default function getMd5(key,params=''){
    let signStr;

    if(params){
        signStr=`id=${params}&sign=${key}`;
    }else{
        signStr=`sign=${key}`;
    }
    console.log(signStr);
    let sign=md5(signStr).toUpperCase();
    console.log(sign);
    sessionStorage.setItem("sign",sign);
    console.log(sign);
}