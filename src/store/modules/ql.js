import * as types from '../mutation-type'
// initial state
const state = {
  day: '',  //精确到天数
  month: '',//精确到月数
  years: '',  //精确到年
  Index: 0,  // 索引

  type1: '',  //年月日类型
  time: '',
  type2:'' //收益类型 费率返点，卷分润 广告分润
}

// getters
const getters = {
}

// mutations
const mutations = {
  [types.GET_ORDER_DETAIL](state, order) {
    switch (order.type) {
      case 'day':
        state.day = order.time
        break;
      case 'month':
        state.month = order.time
        break;
      case 'year':
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
    
    if (order.type1) {
      state.type1 = order.type1
    }
    if (order.time) {
      state.time = order.time
    }
    if (order.type2) {
      state.type2 = order.type2
    }
    
  },
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
