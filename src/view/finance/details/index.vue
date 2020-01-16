<template>
  <div class="page">
    <van-nav-bar left-arrow :title="title" @click-left="goBack" />
    <div class="main">
      <div class="money">+{{info.money}}</div>
      <div class="title">
        <div v-if="info.profit_type == 1">费率返点</div>
        <div v-else-if="info.profit_type == 2">券分润</div>
        <div v-else-if="info.profit_type == 3">广告分润</div>
      </div>

      <div class="layout-box">
        <div class="layout-item">
          <div>类型说明</div>
          <div v-if="info.profit_type == 1">费率返点</div>
          <div v-else-if="info.profit_type == 2">券分润</div>
          <div v-else-if="info.profit_type == 3">广告分润</div>
        </div>
        <div class="layout-item" v-if="info.profit_type != 3">
          <div>订单金额</div>
          <div>{{info.order_money}}</div>
        </div>
        <div class="layout-item" v-if="info.profit_type != 3">
          <div>订单来源</div>
          <div>{{info.location_name}}</div>
        </div>
        <div class="layout-item" v-if="info.profit_type == 3">
          <div>分润类型</div>
          <div>
            <div v-if="info.split_type == 1">点击</div>
            <div v-if="info.split_type == 2">展示</div>
          </div>
        </div>
        <div class="layout-item" v-if="info.profit_type != 3">
          <div>用户ID</div>
          <div>{{info.user_id}}</div>
        </div>
      </div>

      <div class="layout-item">
        <div>创建时间</div>
        <div>{{info.created_at}}</div>
      </div>

      <div class="layout-item" v-if="info.profit_type != 3">
        <div>订单号</div>
        <div>{{info.order_number}}</div>
      </div>
    </div>
  </div>
</template>
<script>
import { getFinanceDetails } from "@api/api";
export default {
  data() {
    return {
      info: {},
      title: '收益详情'
    };
  },
  created() {
    let id = this.$route.query.id;
    getFinanceDetails(id).then(res => {
      this.info = res.data;
      switch(res.data.profit_type) {
        case 1:
          this.title = '费率返点详情'
          break
        case 2:
          this.title = '券分润详情'
          break
        case 3:
          this.title = '广告分润详情'
          break
      }
    });
  },
  methods: {
    goBack() {
      this.$router.back();
    }
  }
};
</script>
<style lang="sass" scoped>
  @import './index'
</style>
