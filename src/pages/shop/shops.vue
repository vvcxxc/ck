<template>
  <div class="shopbox xparent">
    <x-header :title="$t('shop.header')"
              :left-options="{showBack: false}"></x-header>
    <div class="xchild">
      <router-view></router-view>
    </div>
  </div>
</template>
<script type="text/javascript">

import Tabbar from '~components/Tabbar'

export default {
  data () {
    return {
      xrouter: ['shoplist', 'shopadd'],
      index: 0,
      timer: null
    }
  },
  components: {
    Tabbar
  },
  methods: {
    switchItem (index) {
      if (this.index == index) return false;

      this.index = index
      this.$router.push({ name: this.xrouter[index] })
    }
  }
}

</script>
<style lang="scss">
@import "~style/mixin";

.shopbox {
  @include xallcover(100);
  font-size: $mdsize;
}
</style>
