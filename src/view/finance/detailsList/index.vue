<template>
  <div class="details-page">
    <div class="details-header">
      <div></div>
      <div @click="showDatePicker" class="date">
        {{date}}
        <van-icon name="arrow-down" class="icon" />
      </div>
    </div>

    <div class="total-money">
      <div class="money">￥{{all_money}}</div>
      <div class="name">{{title}}收益</div>
    </div>

    <div class="details-list">
      <div class="title">{{title}}明细</div>
      <div>
        <div
          class="list-item"
          v-for="(item,index) in list"
          :key="index"
          @click="goToDetails(item.id)"
        >
          <div class="item-l">
            <div class="store-name">{{item.location_name}}</div>
            <div class="date">{{item.created_at}}</div>
          </div>
          <div class="item-r">
            <div class="money">{{item.money}}</div>
            <van-icon name="arrow" class="icon" />
          </div>
        </div>
      </div>
    </div>

    <van-popup position="bottom" v-model="show" get-container="#app">
      <van-datetime-picker
        v-model="currentDate"
        type="date"
        value='date'
        @confirm="chooseDate"
        @cancel="showDatePicker"
      />
    </van-popup>
  </div>
</template>
<script type="text/javascript">
import { DatetimePicker, Popup, Icon } from "vant";
import { getFinanceList } from "@api/api";
import dayjs from "dayjs";
export default {
  data() {
    return {
      currentDate: new Date(),
      show: false,
      date: dayjs(new Date()).format("YYYY-MM-DD"),
      all_money: "",
      list: [],
      type: 1,
      title: "费率返点"
    };
  },
  created() {
    let type = this.$route.query.type;
    let date = this.$route.query.date;
    if(date){
      this.date = date
    }
    switch (type) {
      case 1:
        this.title = "费率返点";
        break;
      case 2:
        this.title = "券分润";
        break;
      case 3:
        this.title = "广告分润";
        break;
      default:
        this.title = "费率返点";
    }
    this.getList();
  },
  methods: {
    // 展示隐藏日期选择器
    showDatePicker() {
      this.show = !this.show;
    },
    // 选择时间
    chooseDate(date) {
      let time = dayjs(date).format("YYYY-MM-DD");
      this.show = false;
      this.date = time;
      this.getList();
    },
    // 获取列表数据
    getList() {
      let data = {
        profit_type: this.$route.query.type || 1,
        date: this.date
      };
      getFinanceList(data)
        .then(res => {
          console.log(res);
          this.all_money = res.all_money || 0;
          this.list = res.data;
        })
        .catch(err => console.log(err));
    },

    // 跳转到详细页
    goToDetails(id) {
      this.$router.push({
        path: "/finance/details",
        query: {
          id
        }
      });
    }
  }
};
</script>
<style lang="sass" scoped>
 @import './index'
</style>
