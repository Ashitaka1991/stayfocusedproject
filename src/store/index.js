import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VueAxios from 'vue-axios'

axios.defaults.baseURL = 'http://59.110.152.211:56001'
axios.defaults.withCredentials = true

Vue.use(Vuex);
Vue.use(VueAxios,axios)


import defaultState from './state'
import getters from './getters'
import mutations from './mutations'
import actions from './actions'

export default ()=>{
  const store = new Vuex.Store({
    state: defaultState,
    getters,
    mutations,
    actions
  });

  //debug
  if(module.hot){
    module.hot.accept([
      './state',
      './getters',
      './mutations',
      './actions',
    ],()=>{
      const newState = require('./state').default
      const newGetters = require('./getters').default
      const newMutations = require('./mutations').default
      const newActions = require('./actions').default

      store.hotUpdate({
        state: newState,
        getters: newGetters,
        mutations: newMutations,
        actions: newActions,
        modules: {
        }
      })
    })
  }

  return store;
}
