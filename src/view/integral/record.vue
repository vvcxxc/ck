<template>
  <div class="record">
    <div class="record_sum">礼品额度使用有{{data.length}}条</div>
    <div class="record_table">
      <div class="record_table_item" v-for="(item, index) in data" :key="index">
        <div class="table_item_left">
          <div class="left_store">{{ item.receiver ? item.receiver.account_name : item.supplier }}</div>
          <div class="left_time">{{ item.created_at | formatDate }}</div>
        </div>
        <div class="table_item_right">{{item.integral}}</div>
      </div>
      <van-divider
        v-if="data.length==0"
        :style="{borderColor: '#ccc', padding: '10px 16px',margin: 0, fontSize: '16px' }"
      >暂无更多数据</van-divider>
    </div>
  </div>
</template>

<script>
import { XTable } from "vux";
import { integralRecords } from "../../api/api";

export default {
  created() {
    this.initData();
  },
  data() {
    return {
      data: []
    };
  },
  filters: {
    formatDate(time) {
      return time.split(" ")[0];
    }
  },
  methods: {
    async initData() {
      const { status, data } = await integralRecords();
      if (status === "ok") {
        this.data = data;
      }
    }
  }
};
</script>

<style lang="sass" scoped>
  @import './style'
</style>
