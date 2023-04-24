import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    nickname:'',
    token:'',
    cartList:[]
  },
  mutations: {
    login(state,value){
      state.nickname = value.nickname,
      state.token = value.token
    },
    get_cartList(state,value){
      state.cartList.push(value)
    }
  },
  actions: {
    userLogin({commit},value){
      commit("login",value)
    },
    getCartList({commit},value){
      commit("get_cartList",value)
    }
  },
  modules: {
  }
})
