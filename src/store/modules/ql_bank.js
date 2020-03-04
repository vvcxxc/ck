import * as types from '../mutation-type'

const state = {
  party_id: '', //创客id
}

// getters
const getters = {
}

// mutations
const mutations = {
  [types.ActivateBankCard](state, order) {
    state.party_id = order.party_id
  }
}

const actions = {
  recordInformation({ commit, state }, props) {
    commit(types.ActivateBankCard, props)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
