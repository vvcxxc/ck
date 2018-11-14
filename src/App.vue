<template>
  <div id="app">
    <keep-alive include="member, balance, profitShareHistory, withdrawHistory">
      <router-view/>
    </keep-alive>
    <keep-alive>
      <router-view name="tabbar"></router-view>
    </keep-alive>
    <div v-transfer-dom>
      <loading :show="isLoading.status"></loading>
    </div>

  </div>
</template>

<script>
import { Loading, querystring, TransferDomDirective as TransferDom } from 'vux'
import { mapState } from 'vuex'

import VConsole from "vconsole/dist/vconsole.min.js"
const PRODUCTION = 'production'

export default {
  name: 'App',
  directives: {
    TransferDom
  },
  data () {
    return {
      show: true
    }
  },
  components: {
    Loading
  },
  computed: {
    ...mapState(['isLoading'])
  },
  created () {
    if (process.env.NODE_ENV != PRODUCTION) {
      // new VConsole()
    }
    // this._debug()
  },
  methods: {
    _debug () {
      let urlStr = location.href.split('?')[1]
      let urlParams = querystring.parse(urlStr)
      urlParams.debug && new VConsole()
    }
  }
}
</script>

<style lang="scss">
@import "@style/mixin";

$px_12: 12px;
$pc_100: 100%;

#app {
  height: $pc_100;
  position: relative;

  .weui-loading_toast .weui-toast {
    width: 4.5rem;
    height: 4.5rem;
    min-height: 4.5rem;
    .weui-toast__content {
      font-size: $px_12;
    }
  }
  .weui-cells {
    font-size: $px_12;
  }

  .weui-btn {
    font-size: $px_12;
  }
}
</style>
