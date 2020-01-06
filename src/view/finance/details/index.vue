<template>
  <div class="details-page">
    <div class="details-header">
      <div>多美蛋糕店</div>
      <div>

      </div>
    </div>
    <van-popup  position="bottom" v-model="show">
      <van-datetime-picker
          v-model="currentDate"
          type="date"
          :min-date="minDate"
          :max-date="maxDate"
        />
    </van-popup>
  </div>
</template>
<script type="text/javascript">
import { DatetimePicker,Popup  } from 'vant';
import Vue from "vue";
Vue.use(Popup)
Vue.use(DatetimePicker);
export default {
  data(){
    return {
      minDate: new Date(2020, 0, 1),
      maxDate: new Date(2025, 10, 1),
      currentDate: new Date(),
      show: true
    }
  },
  components: {
    DatetimePicker
  }
}
</script>
<style lang="sass" scoped>
 @import './index'
</style>
