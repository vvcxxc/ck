import Vue from 'vue'
import Vuex from 'vuex'

import getters from './getters'
// import actions from './actions'
import mutations from './mutations'
import ql from './modules/ql'

Vue.use(Vuex)
// 创建vux中的store容器对象
const store = new Vuex.Store({
  getters,
  // actions,
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
    role_type: ""
  }
})

export default store

// import Vuex from 'vuex'
// import Vue from 'vue'

// // import createLogger from 'vuex/dist/logger'
// import * as actions from './actions'
// // import ql from './modules/ql'
// import ql from './modules/ql'
// // const debug = process.env.NODE_ENV !== 'production'

// // import sideBar from './modules/side-bar'
// // import product from './modules/product'
// // import platform from './modules/platform'
// // import organization from './modules/organization'
// // import jurisdiction from './modules/jurisdiction'
// // import plugin from './modules/plugin'
// // import deviceFilter from './modules/device-filter'
// // import appToken from './modules/apptoken'
// // import warranty from './modules/warranty'
// // import warrantyFilter from './modules/warranty-filter'
// // import dealer from './modules/dealer'
// // import corp from './modules/corp'

// // const debug = process.env.NODE_ENV !== 'production'

// Vue.use(Vuex)

// const store = new Vuex.Store({
//   actions,
//   modules: {
//     ql
//     // sideBar,
//     // product,
//     // platform,
//     // deviceFilter,
//     // appToken,
//     // organization,
//     // jurisdiction,
//     // plugin,
//     // warranty,
//     // warrantyFilter,
//     // dealer,
//     // corp
//   },
//   // strict: debug,
//   // plugins: debug ? [createLogger()] : []
// })
// export default store

