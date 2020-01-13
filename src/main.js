// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue"
import App from "./App"
import router from "./router"
import store from "./store"
import {
  i18n
} from "./i18n"
import {
  Icon,
  Popup,
  Overlay,
  DatetimePicker,
  List,
  Row,
  Col,
  Tag,
  NavBar,
  Tab,
  Tabs,
  Toast,
  CountDown,
  Tabbar, TabbarItem,Field, Button, Cell, CellGroup
} from "vant";
import "@utils/rem"
import "@style/common"
import "@static/icon-font/iconfont.css"

// this is new reconfiguration
import "@style/base-style"

import {
  ToastPlugin
} from "vux"
Vue.use(Popup)
Vue.use(Toast)
Vue.use(CountDown);
Vue.use(Field);
Vue.use(Button);
Vue.use(Tabbar).use(TabbarItem);
Vue.use(ToastPlugin)
Vue.use(Icon);
Vue.use(Popup);
Vue.use(Overlay);
Vue.use(DatetimePicker)
Vue.use(List);
Vue.use(Tag);
Vue.use(Row).use(Col);
Vue.use(NavBar);
Vue.use(Tab).use(Tabs);
Vue.use(Cell).use(CellGroup);
Vue.config.productionTip = false

const isAndroid = navigator.userAgent.indexOf('Android') > -1 || navigator.userAgent.indexOf('Adr') > -1; //android终端
Vue.directive('resetInput', {
  // 当被绑定的元素插入到 DOM 中时……
  inserted: function (el) {
    if (isAndroid) {
      return;
    }

    let input = document.getElementById('reset-input');

    if (!input) {
      input = document.createElement('INPUT');
      input.type = 'text';
      input.style.height = '0px'
      input.style.width = '0px'
      input.style.position = 'absolute'
      input.id = 'reset-input';
      document.body.prepend(input);
    }

    el.addEventListener('blur', function () {
      input.focus();
      input.blur();
    });

    // console.log(el)
    // el.addEventListener('click', function () {
    //   input.focus();
    //   input.blur();
    // })
  }
});

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
