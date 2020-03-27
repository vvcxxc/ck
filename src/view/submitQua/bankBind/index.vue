<template>
  <div class="bind-page">
    <div class="main-box">
      <!-- 步骤条 -->
      <div class="step-box">
        <div class="step-item">
          <div class="step-num active-background">1</div>
          <div class="step-text active">注册开户</div>
          <img class="step-icon" src="../../../assets/right.png" />
        </div>
        <div class="step-item">
          <div class="step-num active-background">2</div>
          <div class="step-text active">绑卡激活</div>
          <img class="step-icon" src="../../../assets/right.png" />
        </div>
        <div class="step-item">
          <div class="step-num">3</div>
          <div class="step-text">提现确认</div>
        </div>
      </div>
      <!-- 银行卡号 -->
      <div class="bank-num-box">
        <div class="bank-num">银行卡号：{{bank_card_number}}</div>
        <div class="edit-bank" @click="gotoBank">修改银行卡</div>
      </div>
      <!-- 输入框 -->
      <div class="input-main">
        <div class="input-box">
          <div class="input-label">手机号码</div>
          <input type="phone" placeholder="请输入银行预留手机号" v-model="phone" />
        </div>
        <div class="input-box" style="border: none">
          <div class="input-label">验证码</div>
          <input type="number" placeholder="请输入验证码" v-model="code" />
          <div class="get-code" v-if="!isSend" @click="showTips">获取验证码</div>
          <div class="get-code" v-if="isSend">
            <van-count-down :time="60000" format="ss" @finish="finish" />
          </div>
        </div>
      </div>
      <!-- 提示 -->
      <div class="tips">温馨提示：输入手机号码是要本人开户银行预留的手机号码</div>
      <!-- 按钮 -->
      <div class="button" @click="submit">提交</div>

      <!-- 弹框 -->
      <tied-card-tips :show="showModule" @onClose="getCode" />
    </div>
  </div>
</template>
<script>
import TiedCardTips from "../components/TiedCardTips";
import {
  getBankCode,
  bindBankCard,
  getBankInfo,
  getIndexInfo
} from "../service";
import { Toast } from "vant";
export default {
  data() {
    return {
      isSend: false,
      phone: "",
      code: "",
      showModule: false,
      seqNo: "",
      bank_card_number: ''
    };
  },
  async created() {
    let res = await getIndexInfo();
    let phone = res.data.account_phone;
    let bank_info = await getBankInfo(phone);
    console.log(bank_info);
    if(bank_info){
      this.bank_card_number = bank_info.data.bank_card_number
    }
  },
  components: {
    TiedCardTips //绑卡提示
  },
  methods: {
    //  展示协议
    showTips() {
      this.showModule = true;
    },
    //  获取验证码
    getCode(type) {
      this.showModule = false;
      if (type) {
        this.isSend = true;
        getBankCode(this.phone).then(res => {
          console.log(res);
          if (res.status_code == 200) {
            Toast.success(res.message);
            this.seqNo = res.data.seqNo;
          } else {
            Toast.fail(res.message);
          }
        });
      }
    },
    finish() {
      this.isSend = false;
    },
    gotoBank() {
       this.$router.push({path: '/submitQua/editBank'})
    },
    submit() {
      if (!this.code) {
        Toast.fail("验证码不能为空");
        return;
      }
      if (!this.phone) {
        Toast.fail("手机号不能为空");
        return;
      }
      let data = {
        code: this.code,
        phone: this.phone,
        seqNo: this.seqNo
      };
      bindBankCard(data).then(res => {
        if (res.status_code == 200) {
          Toast.success(res.message);
          this.$router.push({path: '/submitQua/confirmWithdraw'})
        } else {
          Toast.fail(res.message);
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "./index.scss";
</style>
