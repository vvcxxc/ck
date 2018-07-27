<template>
  <div class="withdrawDetailsbox">
    <x-header title="提现详情"></x-header>
    <div class="x-data-preview">
      <div class="x-data-preview-header">
        <label>付款金额</label>
        <span>$2018</span>
      </div>
      <div class="x-data-preview-body">
        <div class="x-data-preview-bd-item">
          <label>商品</label>
          <span>扭蛋</span>
        </div>
        <div class="x-data-preview-bd-item">
          <label>单价</label>
          <span>$99</span>
        </div>
        <div class="x-data-preview-bd-item">
          <label>数量</label>
          <span>x8</span>
        </div>
      </div>
    </div>

    <div class="x-data-preview">
      <div class="x-data-preview-header">
        <label>付款金额</label>
        <span>$2018</span>
      </div>
      <div class="x-data-preview-body">
        <div class="x-data-preview-bd-item">
          <label>商搜索品</label>
          <span>扭蛋</span>
        </div>
        <div class="x-data-preview-bd-item">
          <label>单价</label>
          <span>$99</span>
        </div>
        <div class="x-data-preview-bd-item">
          <label>数量</label>
          <span>x8</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
import { XHeader } from 'vux'
export default {
  data () {
    return {
      msg: '详情',
      buttons2: [{
        style: 'primary',
        text: '点击事件',
        onButtonClick: (name) => {
          alert(`clicking ${name}`)
        }
      }]
    }
  },
  components: {
    XHeader
  }
}

</script>
<style lang="scss">
@import "~style/mixin";

.withdrawDetailsbox {
  @include xallcover(102);
}
</style>
