import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    jwt_auth: '',
    jwt_refresh: '',
  },
  mutations: {
    set_jwt_auth(state, jwt_auth){
      state.jwt_auth = jwt_auth
    },
    authenticate(state, payload){
      state.jwt_refresh = payload.jwt_refresh
      state.jwt_auth = payload.jwt_auth
    }
  },
  getters:{
    user_authenticated(state){
      return state.jwt_auth && state.jwt_refresh
    }
  },
  actions: {},
  modules: {}
})
