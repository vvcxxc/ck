<template>
  <div :class="type_ == 2?'annual_earnings':''">
    <van-row type="flex" justify="center">
      <van-col span="6" class="daily-earnings">
        <img src="../../../../assets/earnings.png" alt />
      </van-col>
    </van-row>
    <van-row type="flex" justify="center">
      <van-col span="6" class="my_row">
        <span class="my_row_money">88.00</span>
        <span class="money_des">{{['当日','当月','年份','我的总'][type_]}}收益</span>
        <span class="my_row_time" v-if="type_>2?false:true" @click="chooseTime=true">
          <span>2019-11-22</span>
          <van-icon name="arrow-down" color="#A4C4E9" size="18px" />
        </span>
      </van-col>
    </van-row>
    <van-row type="flex" justify="center">
      <van-col span="24" class="rate-box">
        <div>
          <span>费率返点</span>
          <span>
            126.00
            <van-icon name="arrow" />
          </span>
        </div>
        <div>
          <span>费率返点</span>
          <span>
            126.00
            <van-icon name="arrow" />
          </span>
        </div>
        <div>
          <span>费率返点</span>
          <span>
            126.00
            <van-icon name="arrow" />
          </span>
        </div>
      </van-col>
    </van-row>
    <van-datetime-picker
      class="shoose-time-box"
      v-if="chooseTime"
      v-model="yearTime"
      :type="chooseType"
      :min-date="minDate"
      :max-date="maxDate"
      @confirm="chooseTimeData"
      @cancel="chooseTime=false"
      :visible-item-count="6"
      :formatter="formatter"
    />
  </div>
</template>
<script type="text/javascript">
// {{type_}}"date"
import {
  NavBar,
  Tab,
  Tabs,
  DatetimePicker,
  Row,
  Col,
  Tag,
  Icon,
  List
} from "vant";

export default {
  name: "ReturnsFilte",
  data() {
    return {
      minDate: new Date(2020, 0, 1),
      maxDate: new Date(2025, 10, 1),
      currentDate: new Date(),
      chooseTime: true,
      list: [1, 3],
      chooseType: "date",
      yearTime: ""
    };
  },
  components: {},
  props: {
    type_: Number,
    default: 0
  },
  watch: {
    type_: {
      handler(newVal, oldVal) {
        this.chooseType = ["date", "year-month", "year-month", "date"][newVal];
        this.chooseTime = false;
      },
      deep: true
    }
  },
  created() {},
  mounted() {},
  methods: {
    chooseTimeData(data) {
      console.log(this.yearTime, "kkkk");
    },
    returnsFilter(data, dd) {},
    formatter(type, value) {
      if (type === "year") {
        return `${value}年`;
      } else if (type === "month") {
        return `${value}月`;
      }
      return value;
    }
  }
};
</script>
<style lang="sass" scoped>
.daily-earnings
  margin-top: 36px
  width: 232px
  height: 110px
  img
    height: 100%
.my_row
  display: flex
  flex-direction: column
  align-items: center
  margin-top: -52px
  margin-bottom: 28px
  .my_row_money
    font-size: 36px
    color: #fff
    font-family: Arial
    font-weight: normal
  .money_des
    font-size: 14px
    font-family: Adobe Heiti Std
    font-weight: normal
    color: rgba(233,238,242,1)
  .my_row_time
    display: flex
    justify-content: center
    align-items: center
    margin-top: 15px
    width: 131px
    height: 28px
    font-size: 14px
    background: rgba(67,131,206,1)
    border-radius: 5px
    font-family:Adobe Heiti Std
    font-weight:normal
    color:#A4C4E9
    span
      margin-right: 5px
.rate-box
  margin: 0 20px
  height: 100vw
  border-radius: 10px 10px 0px 0px
  overflow: hidden
  background-color: #fff
  div
    display: flex
    justify-content: space-between
    padding: 0 24px
    height: 45px
    line-height: 45px
    font-size: 15px
    font-family: Adobe Heiti Std
    font-weight: normal
    color: rgba(44,62,80,1)
  div:nth-child(1)
    margin-top: 10px
.shoose-time-box
  position: absolute
  bottom: 0
  left: 0
  width: 100vw
  z-index: 10
.annual_earnings
  /deep/  .van-picker-column:nth-child(2)
      display: none
</style>
