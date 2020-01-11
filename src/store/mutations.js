import * as types from "./mutation-type"
import vue from "vue"
import { Toast } from 'vant';
export default {
  // this is reconfiguration ..
  [types.TOAST](state, { text }) {
    Toast(text)
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
  },
  [types.ROLE_TYPE] (state, { type }) {
    state.role_type = type
  }
}
