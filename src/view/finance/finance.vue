<template>
  <div class="balancebox xparent">
    <x-header :title="$t('balanceTxt.header')"
              :left-options="{showBack: false}"></x-header>
    <p-withdraw-record></p-withdraw-record>
  </div>
</template>
<script type="text/javascript">

import PWithdrawRecord from "./withdrawRecord/withdrawRecord"

export default {
  name: 'balance',
  data () {
    return {
      
    }
  },
  components: {
    PWithdrawRecord
  },
  methods: {

  }
}
</script>
<style lang="scss" scoped>
@import "@/style/mixin.scss";
$px_12: 12px;
.balancebox {
  @include xallcover(101);
  font-size: $px_12;
  .zw-detail {
    padding-left: 0;
  }
}
</style>
