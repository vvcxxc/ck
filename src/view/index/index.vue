<template>
  <div class="index">
    <x-header :left-options="{showBack: false}" title="首页"></x-header>

      <c-scroll class="index-wrapper ofh">
        <div class="container">
          <p-entrepreneur v-if="role_type == entrepreneur"></p-entrepreneur>
          <p-president v-if="role_type == president"></p-president>
        </div>
      </c-scroll>
  </div>

</template>
<script>
  import { XTable, Panel, LoadMore, XHeader } from 'vux'
  import { mapGetters } from "vuex"
  import { profits, ranking } from "@api/api"

  import PEntrepreneur from "./entrepreneur/entrepreneur"
  import PPresident from "./president/president"

  import CScroll from "@components/c-scroll/scroll"

  const REQUEST_OK = 200
  const ZERO = 0
  const ROLE_PRESIDENT = 'president'
  const ROLE_ENTREPRENEUR = 'entrepreneur'

  export default {
    data() {
      return {
        president: ROLE_PRESIDENT,
        entrepreneur: ROLE_ENTREPRENEUR
      }
    },
    computed: {
      ...mapGetters(['role_type'])
    },
    created () {
      console.log('----role_type----')
      console.log(this.role_type)
    },
    components: {
      XHeader,
      XTable,
      Panel,
      PPresident,
      PEntrepreneur,
      CScroll
    }
  }
</script>

<style lang="sass" scoped>
@import "./style"
</style>