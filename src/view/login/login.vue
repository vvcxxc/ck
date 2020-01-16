<template>
  <div class="login-wrapper">
    <div class="login-wrapper_content">
      <div class="login_content">
        <div class="select_character_box">
          <div class="select_item">
            <div class="select_item_border" v-if="role_type=='president'"></div>
            <div class="select_item_info" @click="hanleToggleRole('president')">会长</div>
          </div>
          <div class="select_item" @click="hanleToggleRole('entrepreneur')">
            <div class="select_item_border" v-if="role_type=='entrepreneur'"></div>
            <div class="select_item_info">创客</div>
          </div>
        </div>
        <div class="userName_box">
          <div class="box_title">账号</div>
          <input class="box_input" placeholder="请输入账号" v-model="account_name" />
        </div>
        <div class="passWord_box">
          <div class="box_title">密码</div>
          <input class="box_input" placeholder="请输入密码" type="password" v-model="account_passwd" />
        </div>

        <div class="login_box" @click="handleLogin">登录</div>
        <!-- <div class="resign_box" v-if="role_type=='entrepreneur'" @click="goToRegister">注册</div> -->
      </div>
    </div>
  </div>
</template>
<script>
import { Validator, timeout } from "@utils/common";
import { login } from "@api/api";
const ROLE_PRESIDENT = "president";
const ROLE_ENTREPRENEUR = "entrepreneur";

export default {
  data() {
    return {
      account_name: "",
      account_passwd: "",
      role_type: ROLE_PRESIDENT
    };
  },
  methods: {
    goToRegister() {
      this.$router.push("/ck/register");
    },
    handleLogin() {
      let errmsg = this.hanleValidator();
      if (errmsg) return this.$vux.toast.text(errmsg);
      const params = {
        account_name: this.account_name,
        account_passwd: this.account_passwd,
        role_type: this.role_type
      };
      login(params)
        .then(({ data: { role_type, token } }) => {
          if (token) {
            localStorage.setItem("token", token);
            localStorage.setItem("role_type", role_type);
            switch (role_type) {
              case "president":
                document.title = "团卖物联-会长";
                break;
              case "entrepreneur":
                document.title = "团卖物联-创客";
                break;
              default:
                break;
            }
            this.$store.commit("TOAST", { text: "登录成功" });
            this.$store.commit("ROLE_TYPE", { type: role_type });
            timeout(500).then(() => {
              window.location.href = `http://${window.location.host}`;
            });
          }
        })
        .catch(err => console.log(err));
    },
    hanleValidator() {
      let { account_name, account_passwd } = this;

      let validator = new Validator();

      validator.add(account_name, [
        {
          validateRule: "isEmpty",
          errmsg: "账户名不能为空"
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
        }
      ]);

      let errmsg = validator.start();

      if (errmsg) return errmsg;
    },
    hanleToggleRole(type) {
      if (this.role_type == type) return false;
      this.role_type = type;
    }
  }
};
</script>
<style lang="sass" scoped>
 @import './index'
</style>
