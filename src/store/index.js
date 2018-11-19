import Vue from 'vue'
import Vuex from 'vuex'

import getters from './getters'
import actions from './actions'
import mutations from './mutations'

Vue.use(Vuex)

const store = new Vuex.Store({
  getters,
  actions,
  mutations,
  state: {
    isLoading: {
      status: false
    },
    isHideTabbar: true,
    role_type: ""
  }
})

export default store
