<template>
  <div class="index">
    <x-header :left-options="{showBack: false}" title="首页"></x-header>

      <c-scroll class="index-wrapper ofh">
        <div class="container">
          <p-entrepreneur v-if="getterRoleType == 'entrepreneur'"></p-entrepreneur>
          <p-president v-if="getterRoleType == 'president'"></p-president>
        </div>
      </c-scroll>
  </div>

</template>
<script>
  import { Vue, Component } from 'vue-property-decorator'
  import { Getter } from 'vuex-class'
  import { XTable, Panel, LoadMore, XHeader } from 'vux'

  import PEntrepreneur from "./entrepreneur/entrepreneur"
  import PPresident from "./president/president"

  import CScroll from "@components/c-scroll/scroll"

  import checkLogin from '@/decorator/check_login'

  const REQUEST_OK = 200
  const ZERO = 0

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
    @Getter('role_type') getterRoleType
    @checkLogin
    created () {
      const token = window.localStorage.getItem('token')
      if (!token) {
        this.$router.push('/login')
      }
    }
  }
</script>

<style lang="sass" scoped>
@import "./style"
</style>
