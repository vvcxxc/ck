<template>
  <div class="loginbox">
    <x-header :left-options="{showBack: false}">{{$t('loginTxt.header')}}</x-header>
    <tab :line-width="1"
         v-model="type"
         prevent-default
         custom-bar-width="4rem"
         @on-before-index-change="switchItem">
      <tab-item v-for="(item, index) in $t('loginTxt.switch')"
                :key="index">{{item}}</tab-item>
    </tab>
    <form class="loginfrom">
      <group v-if="type == 0"
             :title="$t('loginTxt.form.titleM')">
        <x-input :title="$t('loginTxt.form.item1')"
                 v-model="account_info.account_name"></x-input>
        <x-input type="password"
                 :title="$t('loginTxt.form.item2')"
                 v-model="account_info.account_passwd"></x-input>
      </group>
      <group v-else-if="type == 1"
             :title="$t('loginTxt.form.titleC')">
        <x-input :title="$t('loginTxt.form.item1')"
                 v-model="account_info.account_name"></x-input>
        <x-input type="password"
                 :title="$t('loginTxt.form.item2')"
                 v-model="account_info.account_passwd"></x-input>
      </group>
    </form>
    <x-button type="primary"
              style="margin-top: 20px;"
              @click.native="login">登录</x-button>
    <toast v-model="showPositionValue"
           type="text"
           :time="800"
           is-show-mask
           :text="msg"></toast>
  </div>
</template>
<script>
import { Toast } from 'vux'

import { valitation } from '~utils/common'

import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      account_info: {
        account_name: '',
        account_passwd: ''
      },
      showPositionValue: false,
      msg: '',
      type: 0,
      role_type: ['entrepreneur', 'president']
    }
  },
  computed: {
  },
  components: {
    Toast,
  },
  methods: {
    Formvalidate () {
      let { account_name, account_passwd } = this.account_info
    },
    handleLogin () {

    },
    valitator () { },
    login () {
      let { account_name, account_passwd } = this.account_info;

      this.msg = valitation([{
        rule: 'isEmpty',
        val: account_name,
        err: '用户名不能为空'
      }, {
        rule: 'isLessLength:6',
        val: account_passwd,
        err: '密码长度必须大于6位'
      }])

      if (this.msg) {
        return this.showPositionValue = true;
      }

      this.$store.dispatch('login', { ...this.account_info, role_type: this.role_type[this.type] });
    },
    showPosition (position) {
      this.position = position
      this.showPositionValue = true
    },
    change (value, label) {

    },
    switchItem (type) {

      if (this.type == type) return false

      this.type = type;
    },
  }
}

</script>
<style lang="scss" scoped>
.loginbox {
  button {
    transform: translate3d(0, 0, 0);
    -webkit-transform: translate3d(0, 0, 0);
  }
}
.login-brand {
  margin-top: 1rem;
  text-align: center;
  img {
    width: 3rem;
    height: 3rem;
  }
}

.loginfrom {
  height: 100%;
  input {
    transform: translate3d(0, 0, 0);
    -webkit-transform: translate3d(0, 0, 0);
  }
}

.center {
  text-align: center;
  padding-top: 20px;
  color: #fff;
  font-size: 18px;
}

.center img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 4px solid #ececec;
}
</style>
