import * as types from '../mutation-type'
// initial state
const state = {
  day: '',  //精确到天数
  month: '',//精确到月数
  years: '',  //精确到年
  Index: 3,  // 收益类型 年 月 日 总收益
  time: '',
  profit_type: ''//收益类型 费率返点，卷分润 广告分润
}

// getters
const getters = {
}

// mutations
const mutations = {
  [types.GET_ORDER_DETAIL](state, order) {
    switch (order.type) {//仅作为判断条件
      case 0:
        state.day = order.time
        break;
      case 1:
        state.month = order.time
        break;
      case 2:
        state.years = order.time
        break;
      default:
        break;
    }
  },
  [types.WIRTEINDEX](state, order) {
    state.Index = order
  },
  [types.WIRTECONTENT](state, order) {
    if (order.profit_type) {
      state.profit_type = order.profit_type
    }
    if (order.time) {
      state.time = order.time
    }
  }
}

const actions = {
  fetchOrderDetail({ commit, state }, props) {
    commit(types.GET_ORDER_DETAIL, props)
  },
  writeIndex({ commit, state }, props) {
    commit(types.WIRTEINDEX, props)
  },
  wirteContent({ commit, state }, props) {
    commit(types.WIRTECONTENT, props)
  },

}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
