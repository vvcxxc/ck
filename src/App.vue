<template>
  <div id="app">
    <keep-alive include="member, balance, profitShareHistory, withdrawHistory">
      <router-view/>
    </keep-alive>
    <keep-alive>
      <router-view name="tabbar"></router-view>
    </keep-alive>
    <loading :show="isLoading.status"></loading>
  </div>
</template>

<script>
import { Loading, querystring } from 'vux'
import { mapGetters } from 'vuex'

import VConsole from "vconsole/dist/vconsole.min.js"

export default {
  name: 'App',
  data () {
    return {
      show: true
    }
  },
  components: {
    Loading
  },
  computed: {
    ...mapGetters(['isLoading'])
  },
  created () {
    this._debug()
  },
  methods: {
    _debug () {
      let urlParams = location.href.split('?')[1]

      let isDebug = querystring.parse(urlParams).debug

      isDebug && new VConsole()
    }
  }
}
</script>

<style lang="scss">
@import "~style/mixin";
#app {
  height: 100%;

  .weui-loading_toast .weui-toast {
    width: 4.5rem;
    height: 4.5rem;
    min-height: 4.5rem;
    // left: 60%;
    // transform: translateX(-60%);
    .weui-toast__content {
      font-size: $minsize;
    }
  }
  .weui-cells {
    font-size: $mdsize;
  }

  .weui-btn {
    font-size: $mdsize;
  }

  // .vux-label {
  //   font-size: $size;
  // }
}
</style>
