import * as types from "./mutation-type"

import Vue from "vue"

import {
  login,
  memberDetails,
  shopDetails,
  profitDetails,
  authUser,
  supplierDetails
} from "~api/self"

export default {
  login({ commit, state }, params) {
    login(params).then(({ code, data, message }) => {
      // 成功没有状态码 和 信息, 失败才有

      // code && commit('TIPS', { status: true, txt: message })
      code && Vue.$vux.toast.text("登录成功")

      !code && commit(types.GET_TOKEN, data)
      // commit(type.ROLE_TYPE, )
    })
  },
  authUser({ commit, state }, params) {
    authUser()
      // .then(({ code, data, message }) => {
      .then(res => {
        console.log(res)

        // !code && commit(types.AUTH_USER, ...data)
        // if(!code){
        //   commit(types.AUTH_USER, ...data)
        // }
      })
  },
  getMemberDetails({ commit, state }, params) {
    memberDetails(params).then(({ code, message, data }) => {
      // .then(res => {
      !code && commit(types.GET_MEMBER_INFO, ...data)
    })
  },
  getShopDetails({ commit, state }, params) {
    shopDetails(params).then(({ code, data, message }) => {
      !code && commit(types.GET_SHOP_INFO, ...data)
    })
  },
  getProfitDetails({ commit, state }, params) {
    profitDetails(params).then(({ data, code, message }) => {
      !code && commit(types.GET_PROFIT_INFO, data)
    })
  },
  getSupplierDetails({ commit, state }, params) {
    supplierDetails(params).then(res => {
      console.log(res)
    })
  }
}
