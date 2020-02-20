<template>
  <div class="register-wrapper">
    <van-nav-bar title="注册完成" left-arrow @click-left="goBack" />
    <div class="register-success-content">
      <img
        class="register-img"
        src="http://oss.tdianyi.com/front/5TtTCFiQT7TM83mfz327Y8dwG2Wn4iMw.png"
      />

      <div class="register-success-words">恭喜你，注册成功</div>
      <div class="register-success-compete" @click="handleCompete">完善资料</div>
      <div class="register-success-jump" @click="handleJump">跳过</div>
    </div>
  </div>
</template>
<script>
import { Validator, timeout } from "@utils/common";
import { register, sendVerifyCode } from "@api/api";
import Vue from "vue";
import {} from "vant";

import "./style";

export default {
  data() {
    return {};
  },
  methods: {
    handleJump() {
      this.$router.push("/index");
    },
    handleCompete(){
      let party_id = this.$route.query.party_id;
        this.$router.push({path: "/completeInformation/IdCard",query:{type: 'add', party_id}});
    },
    goBack() {
      this.$router.push({
        path: "/login"
      });
    },
  }
};
</script>
