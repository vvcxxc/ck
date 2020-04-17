<template>
  <div class="confirm-page">
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
          <div class="step-num active-background">3</div>
          <div class="step-text active">提现确认</div>
        </div>
      </div>
      <!-- 输入框 -->
      <div class="input-main">
        <div class="input-box">
          <div class="input-label">手机号码</div>
          <!-- <input type="phone" placeholder="请输入手机号" v-model="phone" disabled /> -->
          <div>{{phone}}</div>
        </div>
        <div class="input-box" style="border: none">
          <div class="input-label">验证码</div>
          <input type="number" placeholder="请输入验证码" v-model="code" />
          <div class="get-code" v-if="!isSend" @click="getCode">获取验证码</div>
          <div class="get-code" v-if="isSend">
            <van-count-down :time="60000" format="ss" @finish="finish" />
          </div>
        </div>
      </div>
      <!-- 按钮 -->
      <div class="button" @click="submit">提交</div>
    </div>
  </div>
</template>
<script>
import { getAutoCode, openAuto, getBankInfo, getIndexInfo } from "../service";
import { Toast } from 'vant';
export default {
  data() {
    return {
      isSend: false,
      phone: "",
      code: "",
      bank_card_number: '',
      seqNoForAuto: '',

    };
  },
  async created (){
    let res = await getIndexInfo();
    let phone = res.data.account_phone;
    console.log(phone)
    this.phone = phone
    let bank_info = await getBankInfo(phone);
    if(bank_info){
      this.bank_card_number = bank_info.data.bank_card_number
    }
  },
  methods: {
    //  获取验证码
    getCode() {
      this.isSend = true;
      let data = {
        phone: this.phone,
        bank_card_number: this.bank_card_number
      }
      getAutoCode(data).then(res => {
        console.log(res);
        if(res.status_code == 200){
          Toast.success(res.message)
          this.seqNoForAuto = res.data.seqNoForAuto
        }else {
           Toast.fail(res.message)
        }
      });
    },
    finish() {
      this.isSend = false;
    },
    submit() {
      let data = {
        seqNoForAuto: this.seqNoForAuto,
        bank_card_number: this.bank_card_number,
        phone: this.phone,
        code: this.code
      }
      openAuto(data).then(res => {
        if(res.status_code == 200){
          Toast.success(res.message)
          this.$router.push("/index/withdraw");
        }else {
           Toast.fail(res.message)
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "./index.scss";
</style>
