<template>
  <div class="index">
    <!-- <p-entrepreneur v-if="getterRoleType == 'entrepreneur'"></p-entrepreneur> -->
    <!-- 因为创客会长首页区别太小，所以都写在这个组件里了，判断放在组件了 -->
    <p-president></p-president>
  </div>
</template>
<script>
import { Vue, Component } from "vue-property-decorator";
import { Getter } from "vuex-class";
import { XTable, Panel, LoadMore, XHeader } from "vux";

import PEntrepreneur from "./entrepreneur/entrepreneur";
import PPresident from "./president/president";

import CScroll from "@components/c-scroll/scroll";

import checkLogin from "@/decorator/check_login";

const REQUEST_OK = 200;
const ZERO = 0;

@Component({
  components: {
    XHeader,
    XTable,
    Panel,
    PPresident,
    PEntrepreneur,
    CScroll
  }
})
export default class Index extends Vue {
  @Getter("role_type") getterRoleType;
  @checkLogin
  created() {
    const token = window.localStorage.getItem("token");
    if (!token) {
      this.$router.push("/login");
    }
  }
}
</script>
