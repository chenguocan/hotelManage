import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    itemTypes:{
      list: [],
      title: '',
      sub_title: '',
    },
    itemType:{},
  },
  mutations: {
      getTypes(state,types){
        state.itemTypes=types;
      },
      getType(state,types){
        state.itemType=types;
      }
  },
  actions: {
  },
  modules: {
  }
})
