<template>
  <div class="withdraw-page">
    <div class="header">
      <div class="header-l">
        <!-- <img src="/static/img/1_05.png"> -->
        <div class="bank-info">
          <p class="bank-name">{{info.blank_name}}</p>
          <p class="bank-num">尾号{{info.last_number}}储蓄卡</p>
        </div>
      </div>
      <!-- <div class="header-r">
        <img src="/static/img/right.png" />
      </div>-->
    </div>
    <div class="main">
      <div class="main-title">提现金额</div>
      <div class="input-box">
        <span>￥</span>
        <!-- <input type="number" v-model="money"/> -->
        <van-cell-group style="width:100%;">
          <van-field
            type="number"
            v-model="money"
            placeholder="请输入要提现的金额"
            clearable
            style="font-size:24px"
          />
        </van-cell-group>
      </div>
      <div class="money_info">
        <div class="withdraw_money">
          可提现金额
          <span style="color: #000">￥{{info.money}}</span>
        </div>
        <!-- <div class="all_withdraw">全部提现</div> -->
      </div>
    </div>
    <div class="button-box">
      <!-- <div class="button" @click="withdraw">申请提现</div> -->
      <van-button round type="info" @click="withdraw" class="button">提现</van-button>
    </div>
    <div class="tips">
      <div class="tips-title">温馨提示：</div>
      <div class="tips-text">1、金额限制: 最低提现金额为100元。</div>
      <div class="tips-text">2、银行卡到账时间: T+1（第二个工作日）。</div>
      <div class="tips-text">3、提现进度查询位置: “首页-提现明细”</div>
      <div class="tips-text">4、因网银转账的规则限制，提现金额小数仅能精确到小数点后2位。</div>
    </div>
  </div>
</template>
<script>
import { Field, Button } from "vant";

import { withdrawInfo, withdrawApply } from "@api/api";
export default {
  data() {
    return {
      info: {},
      money: ""
    };
  },
  created() {
    withdrawInfo().then(res => {
      console.log(res);
      if (res.code == 200) {
        this.info = res.data;
      }
    });
  },
  methods: {
    withdraw() {
      if (this.money) {
        if (this.money * 1 <= this.info.money * 1) {
          const params = {
            money: +this.money
          };
          withdrawApply(params)
            .then(({ message, code }) => {
              this.$vux.toast.text(message);
              this.$router.push("/index/withdrawList");
            })
            .catch(err => console.log(err));
        } else {
          this.$vux.toast.text("提现金额不能大于可用额度");
        }
      } else {
        this.$vux.toast.text("请输入提现金额");
      }
    }
  }
};
</script>
<style lang="sass" scoped>
   @import './style'
</style>
