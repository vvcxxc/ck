<template>
  <div class="detailbox">

     <van-nav-bar
      title="账户信息"
      left-arrow
      @click-left="handleHide"
    />

    <div class="user-box">
      <van-cell-group>
        <van-cell @click.native="handleShowView('modifyPassword')" title="登录密码" value="修改" is-link />
      </van-cell-group>
    </div>

    <div class="button-box">
      <div @click="handleLogout">
        退出登录
      </div>
    </div>

    <div class="sub-view-wrapper">
      <v-modify-password v-if="flagModifyPassword" @on-hide="handleHideView('modifyPassword')"></v-modify-password>
    </div>
    <!-- <x-header title="账户信息" :left-options="{preventGoBack: true}" @on-click-back="handleHide"></x-header>
    <group>
      <cell is-link @click.native="handleShowView('modifyPassword')">
        <span slot="after-title">登录密码</span>
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
    </div> -->
  </div>
</template>
<script type="text/javascript">
import { NavBar, Cell, CellGroup } from 'vant';
// import { Flexbox, XHeader, Group, Cell, XButton } from 'vux'
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
    // Flexbox,
    // XHeader,
    // Group,
    // Cell,
    // XButton,
    VModifyPassword
  },
  methods: {
    handleShowView(view){
      console.log(222)
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
          window.localStorage.clear();
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
  background: #fff;
  .user-box {
    margin-top: 20px;
    padding: 20px
  }
}
.button-box {
  height: 44px;
  padding: 0 44px;
  margin-top: 23px;
  div {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid rgba(152,166,173,1);
    border-radius:44px;
    font-size: 14px;
  }
}
</style>
