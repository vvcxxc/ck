import Vue from 'vue'
import Vuex from 'vuex'

import getters from './getters'
import mutations from './mutations'
import ql from './modules/ql'

Vue.use(Vuex)
// 创建vux中的store容器对象
const store = new Vuex.Store({
  getters,
  mutations,
  modules: {
    ql
  },
  state: {
    chooseTime:'',
    isLoading: {
      status: false
    },
    isHideTabbar: true,
    role_type: "",
    info: {
      id: '',
      party_id: '', // 用户id
      name: '', // 用户名
      identity_card: '', // 身份证号
      validity_card: '', // 身份证有效期
      identity_card_positive: '', // 身份证正面
      identity_card_opposite: '', // 身份证反面
      hand_identity_card: '', //手持身份证
      bank_name: '', // 所属银行
      bank_account_user_name: '', // 银行账户名
      bank_card_number: '', // 银行卡号
      positive: '', // 银行卡正面
      opposite: '', // 银行卡反面
      bank_branch: '', // 支行地址
    }
  }
})

export default store

