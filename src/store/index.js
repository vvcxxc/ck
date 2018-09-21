import Vue from 'vue'
import Vuex from 'vuex'

import getters from './getters'
import state from './state'
import actions from './actions'
import mutations from './mutations'

// import { ls } from '~utils/common'

// const myPlugin = store => {

//   // 本地化存储 state
//   if (ls.getObj('state')) store.replaceState(ls.getObj('state'))

//   store.subscribe((mutation, state) => {
//     ls.setObj('state', state)
//   })
// }

Vue.use(Vuex)

const store = new Vuex.Store({
  getters,
  state,
  actions,
  mutations,
  // plugins: [myPlugin]
})

export default store
