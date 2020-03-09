import Vue from 'vue'
import Vuex from 'vuex'

import getters from './getters'
import mutations from './mutations'
import ql from './modules/ql'
import ql_bank from './modules/ql_bank'//我的银行卡
import actions from './actions'
Vue.use(Vuex)
// 创建vux中的store容器对象
const store = new Vuex.Store({
  getters,
  mutations,
  actions,
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
    role_type: "",
    info: {
      tip:'',//拒绝原因
      party_id: '', // 用户id
      identity_name: '', // 用户名
      identity_card: '', // 身份证号
      identity_validity_card: '', // 身份证有效期
      identity_card_positive: '', // 身份证正面
      identity_card_opposite: '', // 身份证反面
      identity_hand_card: '', //手持身份证
      bank_name: '', // 所属银行
      bank_account_name: '', // 银行账户名
      bank_card_number: '', // 银行卡号
      bank_positive: '', // 银行卡正面
      bank_opposite: '', // 银行卡反面
      bank_branch: '', // 支行地址
    }
  }
})

export default store

