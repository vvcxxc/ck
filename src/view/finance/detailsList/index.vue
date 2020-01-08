<template>
  <div class="details-page">
    <div class="details-header">
      <div></div>
      <div @click="showDatePicker" class="date">
        {{date}}
        <van-icon name="arrow-down" class="icon"/>
      </div>
    </div>

    <div class="total-money">
      <div class="money">
        ￥0.00
      </div>
      <div class="name">
        费率返点收益
      </div>
    </div>

    <div class="details-list">
      <div class="title">费率返点明细</div>
      <div>
        <div class="list-item">
          <div class="item-l">
            <div class="store-name">多美蛋糕店</div>
            <div class="date">2019/11/11</div>
          </div>
          <div class="item-r">
            <div class="money">0.56</div>
            <van-icon name="arrow" class="icon" />
          </div>
        </div>
      </div>
    </div>

    <!-- <van-popup  position="bottom" v-model="show" get-container="#app"> -->
      <van-datetime-picker
          v-model="currentDate"
          type="date"
          @confirm='chooseDate'
          @cancel='showDatePicker'
        />
    <!-- </van-popup> -->
  </div>
</template>
<script type="text/javascript">
import { DatetimePicker, Popup, Icon } from 'vant';
import dayjs from 'dayjs'
// Vue.use(Popup)
// Vue.use(DatetimePicker)
// Vue.use(Icon);
export default {
  data(){
    return {
      currentDate: new Date(),
      show: true,
      date: dayjs(new Date()).format('YYYY-MM-DD')
    }
  },
  methods: {
    // 展示隐藏日期选择器
    showDatePicker(){
      this.show = !this.show
      console.log(this.show)
    },
    // 选择时间
    chooseDate(date){
      let time = dayjs(date).format('YYYY-MM-DD')
      this.show = false
      this.date = time
    }
  }
}
</script>
<style lang="sass" scoped>
 @import './index'
</style>
