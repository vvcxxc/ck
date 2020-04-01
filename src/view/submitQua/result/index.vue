<template>
  <div class="result-page">
    <div class="result-icon">
      <img src="../../../assets/checked.png" v-if="is_sq == 1" />
      <img src="../../../assets/error.png" v-if="is_sq == 2 || 3 || 4 ||0" />
    </div>
    <div class="result-text" v-if="is_sq == 0">资料审核失败,请重新修改</div>
    <div class="result-text" v-if="is_sq == 2 || is_sq == 3 || is_sq == 4">资料提交审核,请等候</div>
    <div class="result-text" v-if="is_sq == 1">资料审核通过</div>

    <!-- 按钮 -->
    <div class="button" @click='submit' v-if="is_sq == 0">重新提交</div>
    <div class="button" @click='submit' v-if="is_sq == 2 || is_sq == 3 || is_sq == 4">知道了</div>
    <div class="button" @click='submit' v-if="is_sq == 1">下一步</div>
  </div>
</template>
<script>
import { getStatus } from "../service";
export default {
  data() {
    return {
      is_sq: 2
    };
  },
  created() {
    getStatus().then(res => {
      console.log(res);
      let is_sq = res.data.is_sq;
      this.is_sq = is_sq;
    });
  },
  methods: {
    submit() {
      let is_sq = this.is_sq;
      if (is_sq == 0) {
        // 审核失败
        this.$router.push({path: '/submitQua'})
      } else if (is_sq == 2 || 4 || 3) {
        // 审核中
        this.$router.push({path: '/index'})
      } else if (is_sq == 1) {
        // 审核通过
        this.$router.push({path: '/submitQua/bindBank'})
      }
    }
  }
};
</script>
<style lang="scss" scoped>
@import "./index.scss";
</style>
