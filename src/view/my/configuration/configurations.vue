<template>
  <div class="detailbox">
    <x-header title="账户信息" :left-options="{preventGoBack: true}" @on-click-back="handleHide"></x-header>
    <group>
      <cell is-link @click.native="handleShowView('modifyPassword')">
        <span slot="after-title">登陆密码</span>
        <x-icon slot="icon"
                style="box-sizing: border-box; padding: 0.2rem 0.2rem 0 0;"
                type="ios-ionic-outline"
                size="30"></x-icon>
        <span>修改</span>
      </cell>
    </group>
    <flexbox style="padding: 0 0.5rem;">
      <x-button type="warn"
                style="margin-top: 1rem;"
                @click.native="handleLogout">退出登录</x-button>
    </flexbox>
    <div class="sub-view-wrapper">
      <v-modify-password v-if="flagModifyPassword" @on-hide="handleHideView('modifyPassword')"></v-modify-password>
    </div>
  </div>
</template>
<script type="text/javascript">

import { Flexbox } from 'vux'
import { logout } from '@api/api'
import { timeout } from '@utils/common'

import VModifyPassword from "./modify-password"

const REQUEST_OK = 200
const V_MODIFY_PASSWORD = 'modifyPassword'
export default {
  data(){
    return {
      flagModifyPassword: false
    }
  },
  components: {
    Flexbox,
    VModifyPassword
  },
  methods: {
    handleShowView(view){
      switch(view){
        case V_MODIFY_PASSWORD: return this.flagModifyPassword = true
      }
    },
    handleHideView(view){
      switch(view){
        case V_MODIFY_PASSWORD: return this.flagModifyPassword = false
      }
    },
    handleHide(){
      this.$emit('on-hide', 'configuration')
    },
    handleLogout () {
      logout().then(({ code, message, data }) => {
        this.$vux.toast.text(message)
        if (code == REQUEST_OK) {
          this.$store.state.token = ""

          timeout(1000).then(() => {
            this.$router.push({
              path: '/login'
            })
          })
        }
      })
    }
  }
}

</script>
<style lang="scss">
@import "@/style/mixin.scss";
@import "@/style/common.scss";

.detailbox {
  @include xallcover(99);
  font-size: $mdsize;
}
</style>
