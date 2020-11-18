import axios from "./request"
import base from "./base"
const api={
    login(params){
        return axios.post(base.base+'/Login',params);
    }
}
export default api;