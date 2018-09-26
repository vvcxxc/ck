import * as types from "./mutation-type"
import vue from "vue"

export default {
  // this is reconfiguration ..
  [types.TOAST](state, { text }) {
    vue.$vux.toast.text(text)
  },
  [types.HIDE_TABBAR](state, { path }) {

    const targets = ['/my']

    const excludes = ['/login']

    if(excludes.includes(path)) return false

    if (targets.includes(path)) {
      state.isHideTabbar = true
    } else {
      state.isHideTabbar = false
    }
  }
}
