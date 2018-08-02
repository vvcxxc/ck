<template>
  <div class="detailbox">
    <x-header :title="$t('selfDetail.header')"></x-header>
    <group>
      <cell is-link
            link="/selfDetails/modifyPassword">
        <span slot="after-title">{{$t('selfDetail.item5')}}</span>
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
                @click.native="_logout">退出登录</x-button>
    </flexbox>
    <router-view></router-view>
  </div>
</template>
<script type="text/javascript">

import { Flexbox } from 'vux'

import { mapState } from 'vuex'
import { logout } from '~api/self'
import { timeout } from '~utils/common'
export default {
  components: {
    Flexbox
  },
  computed: {
    ...mapState(['userInfo'])
  },
  methods: {
    _logout () {
      logout().then(({ code, message, data }) => {
        this.$vux.toast.text(message)
        if (code == 200) {
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
