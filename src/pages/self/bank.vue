<template>
  <div class="bank">
    <x-header title="绑定银行卡"></x-header>

    <div class="bankList">
      <x-datapreview :datalist="datalist">
      </x-datapreview>
    </div>

    <div class="bankBind">
      <group>
        <cell title="更改银行卡"
              is-link
              link="/bank/bankBind"></cell>
      </group>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import XDatapreview from '~components/x-datapreview'
import { bankList } from '~api/self'
export default {
  data () {
    return {
      datalist: {}
    }
  },
  components: {
    XDatapreview
  },
  methods: {
    _bankList () {
      bankList().then(({ code, message, data }) => {
        code == 200 && (this.datalist = data)
        code != 200 && (this.$vux.toast.text(message))
      })
    }
  },
  created () {
    this._bankList()
  },
  deactivated () {
    this.$destroy()
  },
  watch: {
    '$route' (route) {
      route.path == '/bank' && this._bankList()
    }
  }
}
</script>
<style lang="scss" scoped>
@import "~style/mixin";
.bindCard {
  @include xallcover(101);
}
</style>