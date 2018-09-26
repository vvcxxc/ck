<template>
  <div class="shopDetailsbox">
    <x-header :title="$t('shopDetails.header')"></x-header>
    <div class="zw-list-container-img">
      <div class="zw-list-item" style="line-height: 100%;">
        <div class="zw-list-item-content">
          <div class="zw-image">
            <img src="static/img/shop.png">
          </div>
          <div class="zw-detail">
            <div class="zw-detail-item zw-detail-1">{{shopInfo.name ||'无数据'}}</div>
            <div class="zw-detail-item zw-detail-1">{{shopInfo.region ||'无数据'}}</div>
            <div class="zw-detail-item zw-detail-2">{{shopInfo.content ||'无数据'}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
  
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      
    }
  },
  computed: {
  	...mapGetters(['shopInfo'])
  },
  components: {
    
  },
  mounted(){
  	// console.log(this.shopInfo)
  }
}

</script>
<style lang="scss">
@import '@/style/mixin.scss';

.shopDetailsbox {
  @include xallcover(102);
}

</style>
