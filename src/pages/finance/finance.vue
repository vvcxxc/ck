<template>
  <div class="balancebox xparent">
    <x-header :title="$t('balanceTxt.header')"
              :left-options="{showBack: false}"
              @on-click-back="routeTo"></x-header>
    <p-withdraw-record></p-withdraw-record>
    <!-- <tab :line-width="1"
         v-model="index"
         prevent-default
         custom-bar-width="4rem"
         @on-before-index-change="switchItem">
      <tab-item v-for="(item, index) in tabOptions"
                :key="index">{{item}}</tab-item>
    </tab> -->

    <!-- <div class="xchild">
      <router-view></router-view>
    </div> -->
  </div>

</template>
<script type="text/javascript">

import PWithdrawRecord from "./withdrawRecord/withdrawRecord"

export default {
  name: 'balance',
  data () {
    return {
      tabOptions: ["提现记录"/*"分润记录"*/],
      index: 0,
      xrouter: ['withdrawHistory', 'profitShareHistory']
    }
  },
  components: {
    PWithdrawRecord
  },
  methods: {
    switchItem (index) {

      if (this.index == index) {
        return false
      }

      this.index = index
      this.$router.push({ name: this.xrouter[index] })
    },
    routeTo () {
      this.$router.push('/self')
    },
    created () {
    }
  }
}

</script>
<style lang="scss" scoped>
@import "@/style/mixin.scss";
.balancebox {
  @include xallcover(101);
  font-size: $mdsize;
  .zw-detail {
    padding-left: 0;
  }
}
</style>
