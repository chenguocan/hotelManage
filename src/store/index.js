import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token:sessionStorage.getItem("token")?sessionStorage.getItem("token"):'',
  },
  getters:{
    getSotrage(state){
      if(!state.token){
        state.token=JSON.parse(sessionStorage.getItem("token"))
      }
      return state.token
    }
  },
  mutations: {
    //设置Token
    setToken(state,value){
      state.token=value;
      sessionStorage.setItem('token',value);
    },
    //移除Token
    removeStorage(){
      sessionStorage.removeItem('token')
    }
  },
  actions: {
  },
  modules: {
  }
})
