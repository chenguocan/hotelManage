import md5 from "js-md5";

export default function getMd5(key){
    let signStr;
    signStr=`sign=${key}`;
    let sign=md5(signStr).toUpperCase();
    sessionStorage.setItem("sign",sign);
}