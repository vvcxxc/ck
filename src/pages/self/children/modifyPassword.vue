<template>
  <div class="modifyPasswordbox">
    <!-- {{msg}} -->
    <x-header title="重置密码"></x-header>
    <form>
      <group title="请输入以下信息">
        <x-input placeholder="旧密码"
                 v-model="modifyInfo.old_account_passwd"></x-input>
        <x-input placeholder="请输入新密码"
                 v-model="modifyInfo.new_account_passwd"></x-input>
        <x-input placeholder="确认密码"
                 v-model="confirmPassword"></x-input>
      </group>
    </form>
    <x-button type="primary"
              text="确认修改"
              @click.native="confirm"
              style="margin-top: 1rem;"></x-button>
  </div>
</template>
<script type="text/javascript">
import { modifyPassword } from '~api/self'
import { Validator_a } from '~utils/common'
export default {
  data () {
    return {
      msg: 'modifyPassword',
      modifyInfo: {
        old_account_passwd: '',
        new_account_passwd: ''
      },
      confirmPassword: ''
    }
  },
  components: {
  },
  methods: {
    confirm () {

      let errmsg = this._valadator()

      if (errmsg) return this.$vux.toast.text(errmsg)

      modifyPassword(this.modifyInfo).then(({ code, message }) => {

        if (code == 200) {

          this.$vux.toast.text(message)

          this.modifyInfo.old_account_passwd = ''
          this.modifyInfo.new_account_passwd = ''
          this.confirmPassword = ''
        }

      })
    },
    _valadator () {

      let validator = new Validator_a

      validator.add(this.modifyInfo.old_account_passwd, [{
        validateRule: 'isEmpty',
        errmsg: '请输入旧密码'
      }])

      validator.add(this.modifyInfo.new_account_passwd, [{
        validateRule: 'isEmpty',
        errmsg: '新密码不能为空'
      }, {
        validateRule: 'isRepeat',
        errmsg: '输入密码不一致',
        params: this.confirmPassword
      }])

      validator.add(this.confirmPassword, [{
        validateRule: 'isEmpty',
        errmsg: '确认密码不能为空'
      }])

      let errmsg = validator.start()

      if (errmsg) return errmsg

      return false
    }
  }
}

</script>
<style lang="scss">
@import '@/style/mixin.scss';

.modifyPasswordbox {
  @include xallcover(100);
}
</style>
