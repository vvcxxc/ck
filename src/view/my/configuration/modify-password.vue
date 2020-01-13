<template>
  <div class="modifyPasswordbox">
    <van-nav-bar title="重置密码" left-arrow @click-left="handleHide" />
    <div class="modifyPasswordmain">
      <div class="userName_box">
        <div class="box_title">旧密码</div>
        <input class="box_input" placeholder="请输入旧密码" v-model="modifyInfo.old_account_passwd" />
      </div>
      <div class="userName_box">
        <div class="box_title">请输入新密码</div>
        <input class="box_input" placeholder="请输入新密码" v-model="modifyInfo.new_account_passwd" />
      </div>
      <div class="userName_box">
        <div class="box_title">确认密码</div>
        <input class="box_input" placeholder="请输入确认密码" v-model="confirmPassword" />
      </div>
    </div>
    <div class="button-box">
      <div @click="confirm" class="confirm" v-if="isfanish">确认修改</div>
      <div class="no-confirm" v-else >确认修改</div>
    </div>
    <!-- <x-header title="重置密码" :left-options="{preventGoBack: true}" @on-click-back="handleHide"></x-header>
    <form>
      <group title="请输入以下信息">
        <x-input placeholder="旧密码" v-model="modifyInfo.old_account_passwd"></x-input>
        <x-input placeholder="请输入新密码" v-model="modifyInfo.new_account_passwd"></x-input>
        <x-input placeholder="确认密码" v-model="confirmPassword"></x-input>
      </group>
    </form>
    <x-button type="primary" text="确认修改" @click.native="confirm" style="margin-top: 1rem;"></x-button>-->
  </div>
</template>
<script type="text/javascript">
// import { XHeader, Group, XButton, XInput } from 'vux'
import { modifyPassword } from "@api/api";
import { Validator } from "@utils/common";
import { NavBar } from "vant";
const REQUEST_OK = 200;

export default {
  data() {
    return {
      modifyInfo: {
        old_account_passwd: "",
        new_account_passwd: ""
      },
      confirmPassword: ""
    };
  },
  // components: {
  //   XHeader,
  //   Group,
  //   XInput,
  //   XButton
  // },
  computed: {
    isfanish: function(){
      if(this.modifyInfo.old_account_passwd && this.modifyInfo.new_account_passwd && this.confirmPassword){
        return true
      }else{
        return false
      }
    }
  },
  methods: {
    handleHide() {
      this.$emit("on-hide");
    },
    confirm() {
      let errmsg = this._valadator();

      if (errmsg) return this.$vux.toast.text(errmsg);

      modifyPassword(this.modifyInfo).then(({ code, message }) => {
        if (code == REQUEST_OK) {
          this.$vux.toast.text(message);
          this.modifyInfo.old_account_passwd = "";
          this.modifyInfo.new_account_passwd = "";
          this.confirmPassword = "";
        }
      });
    },
    _valadator() {
      let validator = new Validator();

      validator.add(this.modifyInfo.old_account_passwd, [
        {
          validateRule: "isEmpty",
          errmsg: "请输入旧密码"
        }
      ]);

      validator.add(this.modifyInfo.new_account_passwd, [
        {
          validateRule: "isEmpty",
          errmsg: "新密码不能为空"
        },
        {
          validateRule: "isRepeat",
          errmsg: "输入密码不一致",
          params: this.confirmPassword
        }
      ]);

      validator.add(this.confirmPassword, [
        {
          validateRule: "isEmpty",
          errmsg: "确认密码不能为空"
        }
      ]);

      let errmsg = validator.start();

      if (errmsg) return errmsg;
    }
  }
};
</script>
<style lang="scss">
@import "@/style/mixin.scss";

.modifyPasswordbox {
  @include xallcover(100);
  background: #fff;
}
.modifyPasswordmain {
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
    width: 85px;
    // text-align: center;
    font-family: Adobe Heiti Std;
    font-weight: normal;
    color: #2c3e50;
  }

  .box_input {
    width: calc(100% - 75px);
    padding-left: 20px;
  }
}
.button-box {
    height: 44px;
    padding: 0 44px;
    margin-top: 23px;
    .confirm {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      background: #4486F7;
      color: #fff;
      justify-content: center;
      border: 1px solid rgba(152, 166, 173, 1);
      border-radius: 44px;
      font-size: 14px;
    }
    .no-confirm {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      background: #DDE2E5;
      color: #fff;
      justify-content: center;
      // border: 1px solid rgba(152, 166, 173, 1);
      border-radius: 44px;
      font-size: 14px;
    }
  }
</style>
