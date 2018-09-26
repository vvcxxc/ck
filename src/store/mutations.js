import * as types from "./mutation-type"
// import router from "@/router/index"
// import store from "@/store/index"
import vue from "vue"

// import { timeout, ls } from "~utils/common"
// 跳转路由应该放在这里 ?
export default {
  // 登录 == 获取token
  // [types.GET_TOKEN](state, data) {
  //   state.token = data.token
  //   state.role_type = data.role_type

  //   vue.$vux.toast.text("登录成功")

  //   timeout(1000).then(res => {
  //     router.push("/")
  //   })
  // },
  // [types.LOADING](state, params) {
  //   state.isLoading = params
  // },
  // [types.GET_MEMBER_INFO](state, params) {
  //   state.memberInfo = params
  //   router.push({
  //     name: "memberDetails"
  //   })
  // },
  // [types.GET_SHOP_INFO](state, params) {
  //   state.shopInfo = params
  //   router.push({
  //     name: "shopDetails"
  //   })
  // },
  // [types.GET_SUPPLIER_INFO](state, params) {
  //   state.supplierInfo = params
  //   router.push({
  //     name: "supplierDetails"
  //   })
  // },
  // [types.GET_PROFIT_INFO](state, params) {
  //   state.profitInfo = params
  // },
  // [types.AUTH_USER](state, params) {
  //   state.authUser = params
  // },
  // [types.MEMBER_META_INFO](state, params) {
  //   state.memberMetaInfo = params
  // },
  // [types.SHOP_META_INFO](state, params) {
  //   state.shopMetaInfo = params
  // },
  // [types.WITHDRAW_META_INFO](state, params) {
  //   state.withdrawMetaInfo = params
  // },
  // [types.AREAS_META_INFO](state, params) {
  //   state.areasMetaInfo = params
  // },
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
