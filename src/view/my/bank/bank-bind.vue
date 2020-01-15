<template>
  <div class="bankBind">
    <van-nav-bar title="更改银行卡" left-arrow @click-left="handleHide" />
    <div class="bank-bind">
      <div class="userName_box">
        <div class="box_title">持卡人姓名</div>
        <input class="box_input" placeholder="请输入持卡人姓名" v-model="bankInfo.bank_account_user_name" />
      </div>
      <div class="userName_box">
        <div class="box_title">银行卡名称</div>
        <input class="box_input" placeholder="请输入银行卡名称" v-model="bankInfo.bank_name" />
      </div>
      <div class="userName_box">
        <div class="box_title">银行账户</div>
        <input class="box_input" placeholder="请输入银行账户" v-model="bankInfo.bank_card_number" />
      </div>

      <div class="userName_box">
        <div class="box_title">验证码</div>
        <input class="box_input" placeholder="请输入验证码" maxlength="6" v-model="bankInfo.verify" />
        <button class="get_code" @click="requestBankBindVerify" v-if="!isSend">获取验证码</button>
        <div class="get_code" v-if="isSend">
          <van-count-down :time="60000" format="ss" @finish="finish" />
        </div>
      </div>
    </div>

    <div class="button-box">
      <div @click="applyBankBind">确认更新</div>
    </div>

    <!-- <x-header title="更改银行卡" :left-options="{preventGoBack: true}" @on-click-back="handleHide"></x-header>

    <group title="请输入以下信息" class="bankBindInfo">
      <form>
        <x-input placeholder="持卡人姓名" v-model="bankInfo.bank_account_user_name">
          <i slot="label" class="iconfont icon-ren"></i>
        </x-input>
        <x-input placeholder="银行卡名称" v-model="bankInfo.bank_name">
          <i slot="label" class="iconfont icon-icon-test"></i>
        </x-input>
        <x-input placeholder="银行账账户" v-model="bankInfo.bank_card_number">
          <i slot="label" class="iconfont icon-zhanghu1"></i>
        </x-input>
        <x-input placeholder="请输入验证码" v-model="bankInfo.verify" :show-clear="false">
          <i slot="label" class="iconfont icon-ziyuan"></i>
          <x-button slot="right" type="primary" action-type="button" @click.native="requestBankBindVerify">发送验证码</x-button>
        </x-input>
      </form>
    </group>
    <x-button style="margin-top: 1rem" type="primary" @click.native="applyBankBind">确认更新</x-button>-->
  </div>
</template>

<script>
import { XHeader, Group, XButton, XInput } from "vux";
import { bankBind, bankBindVerify } from "@api/api";
import { Validator } from "@utils/common";

const REQUEST_OK = 200;

export default {
  data() {
    return {
      bankInfo: {
        bank_account_user_name: "",
        bank_name: "",
        bank_card_number: "",
        verify: ""
      },
      isSend: false
    };
  },
  components: {
    XHeader,
    Group,
    XInput,
    XButton
  },
  methods: {
    finish() {
      this.isSend = false;
    },
    handleHide() {
      this.$emit("on-hide");
    },
    requestBankBindVerify() {
      this.isSend = true;
      bankBindVerify().then(({ code, message }) => {
        if (code == REQUEST_OK) {
          this.$vux.toast.text("验证码发送成功！");
        }
      });
    },
    applyBankBind() {
      let errmsg = this._validator();

      if (errmsg) return this.$vux.toast.text(errmsg);

      bankBind(this.bankInfo).then(({ code, message }) => {


        if (code == REQUEST_OK) {
          this.$vux.toast.text('修改成功');
          this.$emit("on-hide");
          this.bankInfo.bank_account_user_name = "";
          this.bankInfo.bank_name = "";
          this.bankInfo.bank_card_number = "";
          this.bankInfo.verify = "";
        }else{
          this.$vux.toast.text(message);
        }
      });
    },
    _validator() {
      let validator = new Validator();

      validator.add(this.bankInfo.bank_account_user_name, [
        {
          validateRule: "isEmpty",
          errmsg: "持卡人姓名不能为空"
        }
      ]);

      validator.add(this.bankInfo.bank_name, [
        {
          validateRule: "isEmpty",
          errmsg: "银行卡名称不能为空"
        }
      ]);

      validator.add(this.bankInfo.bank_card_number, [
        {
          validateRule: "isEmpty",
          errmsg: "银行卡号不能为空"
        }
      ]);

      validator.add(this.bankInfo.verify, [
        {
          validateRule: "isEmpty",
          errmsg: "验证码不能为空"
        }
      ]);

      let errmsg = validator.start();

      if (errmsg) return errmsg;
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@style/mixin";

$px_5: 5px;
$px_12: 12px;
$px_20: 20px;

.bankBind {
  @include xallcover(101);
  font-size: $px_12;
  background: #fff;
  .iconfont {
    font-size: $px_20;
    padding-right: $px_5;
    color: #000;
  }
}

.bank-bind {
  padding: 30px 28px;
}
.userName_box {
  height: 45px;
  width: 100%;
  font-size: 13px;
  margin-bottom: 20px;
  border-bottom: 1px solid #f0f2f5;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  position: relative;

  .box_title {
    width: 75px;
    text-align: center;
    font-family: Adobe Heiti Std;
    font-weight: normal;
    color: #2c3e50;
  }

  .box_input {
    width: calc(100% - 75px);
    padding-left: 20px;
  }
  .get_code {
    height: 27px;
    width: 100px;
    position: absolute;
    right: 0;
    top: 50%;
    transform: translate(0, -50%);
    border-left: 1px solid #f0f2f5;
    background: #fff;
    color: #4486f7;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
  }

}
.button-box {
    height: 44px;
    padding: 0 44px;
    margin-top: 23px;
    div {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px solid rgba(152, 166, 173, 1);
      border-radius: 44px;
      font-size: 14px;
    }
  }
</style>
