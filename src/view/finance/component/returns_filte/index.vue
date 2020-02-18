<template>
  <div :class="type_ == 2?'annual_earnings':''">
    <van-row type="flex" justify="center">
      <van-col span="6" class="daily-earnings">
        <img src="../../../../assets/earnings.png" alt />
      </van-col>
    </van-row>
    <van-row type="flex" justify="center">
      <van-col span="6" class="my_row">
        <span class="my_row_money">{{info.count_all}}</span>
        <span class="money_des">{{['当日','当月','年份','我的总'][type_]}}收益</span>
        <span class="my_row_time" v-if="type_>2?false:true" @click="chooseTime=true">
          <span>{{date}}</span>
          <van-icon name="arrow-down" color="#A4C4E9" size="18px" />
        </span>
      </van-col>
    </van-row>
    <van-row type="flex" justify="center">
      <van-col span="24" class="rate-box">
        <div @click="goTo(1)" v-if="this.type_ <3">
          <span>费率返点</span>
          <span>
            {{info.rate_all}}
            <van-icon name="arrow" />
          </span>
        </div>
        <div  v-else>
          <span>费率返点</span>
          <span>
            {{info.rate_all}}
          </span>
        </div>

        <div @click="goTo(2)" v-if="this.type_ <3">
          <span>券分润</span>
          <span>
            {{info.coupon_all}}
            <van-icon name="arrow" />
          </span>
        </div>
        <div  v-else>
          <span>券分润</span>
          <span>
            {{info.coupon_all}}
          </span>
        </div>
        <div @click="goTo(3)" v-if="this.type_ <3">
          <span>广告分润</span>
          <span>
            {{info.ad_all}}
            <van-icon name="arrow" />
          </span>
        </div>
        <div v-else>
          <span>广告分润</span>
          <span>
            {{info.ad_all}}
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
import { getFinance } from "@api/api";
import dayjs from "dayjs";
import store from "@/store/index"

export default {
  name: "ReturnsFilte",
  data() {
    return {
      minDate: new Date(2015, 0, 1),
      maxDate: new Date(2025, 10, 1),
      currentDate: new Date(),
      chooseTime: false,
      list: [1, 3],
      chooseType: "date",
      yearTime: "",
      date: dayjs(new Date()).format("YYYY-MM-DD"),
      info: {},
      type:3
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
        this.type = newVal
        this.chooseTime = false;
        let time = "";
        switch (newVal) {
          case 0:
            time= store.state.ql.day?store.state.ql.day:dayjs(new Date()).format("YYYY-MM-DD");
            break;
          case 1:
            time= store.state.ql.month?store.state.ql.month:dayjs(new Date()).format("YYYY-MM");
            break;
          case 2:
            time= store.state.ql.years?store.state.ql.years:dayjs(new Date()).format("YYYY");
            break;
          case 3:
            time = "";
        }
        this.date = time;
      },
      deep: true
    },
    date: function() {
      this.getInfo();
    }
  },
  created() {
    let time = "";
    switch (this.type_) {
      case 0:
        time = dayjs(date).format("YYYY-MM-DD");
        break;
      case 1:
        time = dayjs(date).format("YYYY-MM");
        break;
      case 2:
        time = dayjs(date).format("YYYY");
        break;
      case 3:
        time = "";
        break;
    }
    this.date = time;
    this.getInfo();
  },
  mounted() {},
  methods: {
    chooseTimeData(date) {
      this.chooseTime = false;
      let time = "";
      let props_type = ""
      switch (this.type_) {
        case 0:
          time = dayjs(date).format("YYYY-MM-DD");
          props_type = "day"
          break;
        case 1:
          time = dayjs(date).format("YYYY-MM");
          props_type="month"
          break;
        case 2:
          time = dayjs(date).format("YYYY");
          props_type = "year"
          break;
        case 3:
          time = "";
          break;
      }
      this.date = time;
      store.dispatch("ql/fetchOrderDetail", { time:this.date, type:props_type })
    },
    getInfo() {
      let meta = ''
     switch (this.type) {
        case 0:
          meta = store.state.ql.day
          break;
        case 1:
           meta = store.state.ql.month
          break;
        case 2:
          meta = store.state.ql.years
          break;
        case 3:
          break;
      }
      if (this.date) {
        getFinance(meta?meta:this.date).then(res => {
          this.info = res.data;
        });
      } else {
        getFinance().then(res => {
          this.info = res.data;
        });
      }
    },
    returnsFilter(data, dd) {},
    formatter(type, value) {
      if (type === "year") {
        return `${value}年`;
      } else if (type === "month") {
        return `${value}月`;
      }
      return value;
    },
    goTo(type) {
      if (this.type_ == 0) {
        this.$router.push({
          path: "/finance/detailsList",
          query: {
            type,
            date: this.date,
            time:this.type_,//用以区别年 月 日
            my_date:this.date
          }
        });
      } else {
        this.$router.push({
          path: "/finance/detailsList",
          query: {
            type,
            time:this.type_,//用以区别年 月 日
            my_date:this.date
          }
        });
      }
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
