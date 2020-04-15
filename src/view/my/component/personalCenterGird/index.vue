<template>
  <div class="list_gird" @click="onClick">
    <div class="icon_box">
      <span
        :class="['small_bank_card','small_gift','small_id_card','small_set_up','actual_combat'][_props.type]"
      />
      {{_props.leftName}}
    </div>
    <div>
      <span class="my_margin_right">{{_props.rightName}}</span>
      <van-icon name="arrow" size="0.3rem" color="#999999" />
    </div>
  </div>
</template>
<script>
import { Icon } from "vant";
export default {
  name: "PersonalCenterGird",
  data() {
    return {
      list: "",
      // type: [
      //   "small_bank_card",
      //   "small_gift",
      //   "small_id_card",
      //   "small_set_up",
      //   "actual_combat"
      // ]
    };
  },
  props: {
    leftName: String,
    rightName: String,
    type: String
  },
  components: {},
  mounted() {},
  created() {},
  methods: {
    //跳转我的银行卡页面
    onClick() {
      this.$emit("onClick");
      console.log("3333");
      // props.onClick()
      // this.$router.push({ path: "/my/card_new" })
    }
  }
};
</script>
<style lang="scss" scoped>
@import "./index.scss";
</style>