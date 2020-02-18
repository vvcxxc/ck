<template>
  <div >
    <van-nav-bar  left-arrow :title="title" @click-left="goBack"/>
    <div class="details-page">
      <div class="details-header">
      <div></div>
      <div @click="showDatePicker" class="date">
        {{date}}
        <!-- {{
          console.log(props)
        }} -->
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
        <p class="load_more" @click="handleLoadMore" v-if="isMore">点击加载更多</p>
    <van-divider v-else :style="{borderColor: '#ccc', padding: '10px 16px',margin: 0, fontSize: '16px' }">暂无更多数据</van-divider>

      </div>
    </div>
    </div>


    <van-popup position="bottom" v-model="show" get-container="#app"
    :class="this.$route.query.time == 2?'annual_earnings':''">
      <!-- <van-datetime-picker
        v-model="currentDate"
        type="date"
        value='date'
        @confirm="chooseDate"
        @cancel="showDatePicker"
      /> -->
      <van-datetime-picker
      class="shoose-time-box"
      v-if="show"
      v-model="yearTime"
      :type="chooseType"
      :min-date="minDate"
      :max-date="maxDate"
      @confirm="chooseTimeData"
      @cancel="show=false"
      :visible-item-count="6"
      :formatter="formatter"
    />
    </van-popup>
  </div>
</template>
<script type="text/javascript">
import Vue from "vue";
import dayjs from "dayjs";
import { DatetimePicker, Popup, Icon, Divider  } from "vant";
import { getFinanceList } from "@api/api";
Vue.use(Divider);

export default {
  data() {
    return {
      currentDate: new Date(),

      date: '',
      all_money: "",
      list: [],
      type: 1,
      title: "费率返点",
      isMore: true,
      page: 1,

      show: false,
      yearTime: "",
      chooseType: "date",
      minDate: new Date(2015, 0, 1),
      maxDate: new Date(2025, 10, 1),
    };
  },
  created() {
    let type = this.$route.query.type;
    let date = this.$route.query.date;
    switch (this.$route.query.time) {//ql用于区别年月日显示日期
      case 0:
       this.date = dayjs(new Date()).format("YYYY-MM-DD")
        break;
        case 1:
       this.date = dayjs(new Date()).format("YYYY-MM")
        break;
      case 2:
        this.date = dayjs(new Date()).format("YYYY")
        break;
      default:
        this.date = dayjs(new Date()).format("YYYY-MM-DD")
    }

    if(date){
      this.date = date
    }
    console.log(4123)
    if(type == 1){
      this.title = "费率返点";
    }else if(type == 2){
       this.title = "券分润";
    }else if (type == 3){
      this.title = "广告分润";
    }
    // switch (type) {
    //   case 1:
    //     this.title = "费率返点";
    //     break;
    //   case 2:
    //     this.title = "券分润";
    //     break;
    //   case 3:
    //     this.title = "广告分润";
    //     break;
    //   default:
    //     this.title = "费率返点";
    // }
    this.getList();
  },
  methods: {
    goBack() {
      this.$router.back()
    },

    // 展示隐藏日期选择器
    showDatePicker() {
      // this.$route.query.time 3总收益 2年收益  1月收益 0日收益
      this.show = !this.show;
      this.chooseType = ["date", "year-month", "year-month", "date"][this.$route.query.time];
      let time = "";
        switch (this.$route.query.time) {
          case 0:
            time = dayjs(new Date()).format("YYYY-MM-DD");
            break;
          case 1:
            time = dayjs(new Date()).format("YYYY-MM");
            break;
          case 2:
            time = dayjs(new Date()).format("YYYY");
            break;
          case 3:
            time = "";
        }

        this.date = time;
    },
    // 选择时间
    chooseDate(date) {
      let time = dayjs(date).format("YYYY-MM-DD");
      this.show = false;
      this.date = time;
      this.page = 1
      this.getList();
    },
    // 获取列表数据
    getList() {
      let data = {
        profit_type: this.$route.query.type || 1,
        created_at: this.date,
        page: this.page
      };
      getFinanceList(data)
        .then(res => {
          this.all_money = res.all_money || 0;
          if(this.page == 1){
            this.list = res.data
            this.isMore = true
          }else{
            this.list = [...this.list,...res.data];
          }
          if(!res.pagination.total){
            this.isMore = false
          }
          if(res.pagination.current_page == res.pagination.total_pages || res.pagination.total_pages == null){
            this.isMore = false
          }
        })
        .catch(err => console.log(err));
    },

    // 加载更多
     handleLoadMore() {
      this.page += 1;
      this.getList();
    },

    // 跳转到详细页
    goToDetails(id) {
      this.$router.push({
        path: "/finance/details",
        query: {
          id,
          type: this.$route.query.type
        }
      });
    }
  }
};
</script>
<style lang="sass" scoped>
 @import './index'
 .annual_earnings
  /deep/  .van-picker-column:nth-child(2)
      display: none
</style>
