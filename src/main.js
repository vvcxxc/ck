// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue"
import App from "./App"
import router from "./router"
import "~utils/rem"
import "~style/common"
import "~static/icon-font/iconfont.css"
import store from "./store"
import { i18n } from "./i18n"

// this is new reconfiguration
import "@style/base-style"

import { InfiniteScroll } from "mint-ui"

import {
  Cell,
  Group,
  XHeader,
  XInput,
  Tab,
  TabItem,
  LoadMore,
  Card,
  XButton,
  PopupPicker,
  ToastPlugin,
  Loading,
  DatetimePlugin
} from "vux"

Vue.component("cell", Cell)
Vue.component("group", Group)
Vue.component("x-header", XHeader)
Vue.component("x-input", XInput)
Vue.component("load-more", LoadMore)
Vue.component("card", Card)
Vue.component("x-button", XButton)
Vue.component("popup-picker", PopupPicker)
Vue.component("tab", Tab)
Vue.component("tab-item", TabItem)
Vue.component("loading", Loading)

Vue.use(InfiniteScroll)
Vue.use(ToastPlugin)
Vue.use(DatetimePlugin)

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
