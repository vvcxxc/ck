import Vue from 'vue'
import Vuex from 'vuex'

import getters from './getters'
import mutations from './mutations'
import ql from './modules/ql'
import ql_bank from './modules/ql_bank'//我的银行卡

Vue.use(Vuex)
// 创建vux中的store容器对象
const store = new Vuex.Store({
  getters,
  mutations,
  modules: {
    ql,
    ql_bank
  },
  state: {
    chooseTime:'',
    isLoading: {
      status: false
    },
    isHideTabbar: true,
    role_type: ""
  }
})

export default store

