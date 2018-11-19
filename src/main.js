// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue"
import App from "./App"
import router from "./router"
import store from "./store"
import { i18n } from "./i18n"

import "@utils/rem"
import "@style/common"
import "@static/icon-font/iconfont.css"

// this is new reconfiguration
import "@style/base-style"

import { ToastPlugin } from "vux"

Vue.use(ToastPlugin)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  store,
  i18n,
  components: {
    App
  },
  template: "<App/>"
})

router.beforeEach((to, from, next) => {
  next()
})

router.afterEach((to, from, next) => {})