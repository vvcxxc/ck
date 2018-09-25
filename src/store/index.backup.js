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
    token: "",
    role_type: "",
    // authUser: {},
    // memberInfo: {},
    // shopInfo: {},
    // profitInfo: {},
    // supplierInfo: {},
    // isLoading: {
    //   status: false
    // },
    // 分页信息
    // memberMetaInfo: {},
    // shopMetaInfo: {},
    // withdrawMetaInfo: {},
    // areasMetaInfo: {},
    // profitShareMetaInfo: {}
  }
})

export default store
