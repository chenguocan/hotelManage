import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    itemTypes:{
      list: [],
      title: '',
      sub_title: '',
    }
  },
  mutations: {
      getTypes(state,types){
        console.log(state);
        state.itemTypes=types;
      }
  },
  actions: {
  },
  modules: {
  }
})
