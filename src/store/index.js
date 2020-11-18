import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token:localStorage.getItem("token")?localStorage.getItem("token"):'',
  },
  getters:{
    getSotrage(state){
      if(!state.token){
        state.token=JSON.parse(localStorage.getItem("token"))
      }
      return state.token
    }
  },
  mutations: {
    //设置Token
    setToken(state,value){
      state.token=value;
      localStorage.setItem('token',value);
    },
    //移除Token
    removeStorage(){
      localStorage.removeItem('token')
    }
  },
  actions: {
  },
  modules: {
  }
})
