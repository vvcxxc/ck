<template>
  <div class="supplierDetailsbox">
    <x-header title="门店详情"></x-header>
    <div class="zw-list-container-img">
      <div class="zw-list-item" style="line-height: 100%">
        <div class="zw-list-item-content">
          <div class="zw-image">
            <img src="static/img/supplier.png">
          </div>
          <div class="zw-detail">
            <div class="zw-detail-item zw-detail-1">{{supplierInfo.area_name || '无数据'}}</div>
            <div class="zw-detail-item zw-detail-2">{{supplierInfo.tel || '无数据'}}</div>
            <div class="zw-detail-item zw-detail-3">
              <div>
                <span>{{supplierInfo.address || '无数据'}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">

import { mapState } from 'vuex'
export default {
  data() {
    return {}
  },
  components: {
    
  },
  computed: {
    ...mapState(['supplierInfo'])
  }
}

</script>
<style lang="scss">
@import "~style/mixin";

.supplierDetailsbox {
  @include xallcover(102);
}

</style>
