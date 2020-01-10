<template>
  <div class="register-wrapper">
    <div class="register-content">
      <div class="userName_box">
        <div class="box_title">账号</div>
        <input class="box_input" placeholder="请输入账号" v-model="account_name" />
      </div>
      <div class="userName_box">
        <div class="box_title">手机号</div>
        <input
          class="box_input"
          placeholder="请输入手机号"
          type="number"
          v-model="phone"
          :show-clear="false"
        />
      </div>
      <div class="userName_box">
        <div class="box_title">验证码</div>
        <input
          class="box_input"
          placeholder="请输入验证码"
          v-model="mobile_verification_code"
          maxlength="6"
        />

        <button class="get_code" @click="fetchVerify" v-bind:disabled="isSend" v-if="!isSend">获取验证码</button>
        <div class="get_code" v-if="isSend">
          <van-count-down :time="60000" format="ss" @finish="finish" />
        </div>
      </div>
      <div class="userName_box">
        <div class="box_title">密码</div>
        <input class="box_input" placeholder="请输入密码" type="password" v-model="account_passwd" />
      </div>
      <div class="userName_box">
        <div class="box_title">确认密码</div>
        <input class="box_input" placeholder="请输入密码" type="password" v-model="confirm_password" />
      </div>
    </div>
    <!-- <div class="have_read_rule_box">已阅读并注册</div> -->
    <div class="resign_box" @click="handleRegister">注册</div>
  </div>
</template>
<script>
import { Validator, timeout } from "@utils/common";
import { register, sendVerifyCode } from "@api/api";
import Vue from "vue";
import { CountDown } from "vant";
Vue.use(CountDown);
import "./style";

export default {
  data() {
    return {
      account_name: "",
      account_passwd: "",
      confirm_password: "",
      phone: "",
      mobile_verification_code: "",
      isSend: false
    };
  },
  methods: {
    finish() {
      this.isSend = false;
    },
    handleRegister() {
      let errmsg = this.hanleValidator();
      if (errmsg) return this.$vux.toast.text(errmsg);
      const params = {
        account_name: this.account_name,
        account_passwd: this.account_passwd,
        invite_id: this.$route.query.invite_id || 0,
        phone: this.phone,
        mobile_verification_code: this.mobile_verification_code
      };
      register(params)
        .then(({ code, message }) => {
          if (code != 200) {
            return this.$vux.toast.text(message);
          }
          this.$vux.toast.text("注册成功");
          timeout(1500).then(() => {
            window.location.href = `http://${window.location.host}`;
          });
        })
        .catch(err => console.log(err));
    },
    hanleValidator() {
      let {
        account_name,
        account_passwd,
        confirm_password,
        phone,
        mobile_verification_code
      } = this;

      let validator = new Validator();

      validator.add(account_name, [
        {
          validateRule: "isEmpty",
          errmsg: "账户名不能为空"
        }
      ]);

      validator.add(account_name, [
        {
          validateRule: "isLengthError",
          errmsg: "账户名长度不能小于6",
          params: 6
        }
      ]);

      validator.add(account_passwd, [
        {
          validateRule: "isEmpty",
          errmsg: "密码不能为空"
        },
        {
          validateRule: "isLengthError",
          errmsg: "密码长度小于6位数",
          params: 6
        },
        {
          validateRule: "isUnLike",
          errmsg: "两次输入的密码不正确",
          params: confirm_password
        }
      ]);

      validator.add(phone, [
        {
          validateRule: "isEmpty",
          errmsg: "手机号不能为空"
        }
      ]);

      validator.add(mobile_verification_code, [
        {
          validateRule: "isEmpty",
          errmsg: "验证码不能为空"
        }
      ]);

      let errmsg = validator.start();

      if (errmsg) return errmsg;
    },

    fetchVerify() {
      if (!this.phone) {
        this.$vux.toast.text(`手机号不能为空`);
        return;
      }
      this.isSend = true;
      const { code, message } = sendVerifyCode({ phone: this.phone }).then(
        ({ code, data }) => {
          this.$vux.toast.text("验证码已发送");
        }
      );
    }
  }
};
</script>
