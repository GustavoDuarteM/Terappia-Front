import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    jwt_auth: '123456',
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
    get_jwt_auth(state){
      state.jwt_auth
    },
    get_jwt_refresh(state){
      state.jwt_refresh
    }
  },
  actions: {},
  modules: {}
})
