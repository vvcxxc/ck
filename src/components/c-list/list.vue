<template>
  <div class="list-wrapper" v-if="data.is_show || president">
    <div class="list-container">
      <div class="image" v-show="_showOptions.image">
        <img :src="data.src" alt width="56" height="56" />
      </div>
      <div class="desc-wrapper">
        <div class="item" v-for="(value, key) in data.desc" :key="key">
          <p class="key">{{key}}</p>
          <p class="value">{{value}}</p>
        </div>
      </div>
      <div class="integral">礼品额度: {{ data.integral }}</div>
      <div
        class="integral-2"
        v-if="data.useIntegral !== undefined"
      >已消耗: {{ typeof data.useIntegral === 'object' ? data.useIntegral.integral : data.useIntegral }}</div>
    </div>
    <div class="buttonss">
      <div class="button-left">
        <div class="action3" v-if="data.can_zero_rate">
        <x-button action-type="button" @click.native="quanfan(data.id,data.open_zero_rate,data.isShowAction)">费率全返</x-button>
      </div>

      <div class="action4" v-if="data.can_zero_rate">
        <x-button action-type="button" @click.native="showRule(data.id)">全返规则</x-button>
      </div>
      </div>

      <div class="button-right">
        <div class="action1" v-if="isShowAction && president">
          <x-button action-type="button" @click.native="goSplitFee(data.id)">分润设置</x-button>
        </div>

        <div class="action2">
          <x-button action-type="button" @click.native="distributionIntegral(data.id)">额度设置</x-button>
        </div>
      </div>
    </div>
    <confirm
      v-model="show"
      title="费率全返"
      @on-cancel="onCancel(data.id)"
      @on-confirm="onConfirm(data.id)"
      :confirm-text='text'
      :show-cancel-button='false'
      :hide-on-blur='true'
    >
      <p style="text-align:center;">设置费率全返后，线下支付满足全选条件后创客与会长将不分润，同时将不能设置该店费率返点比例，是否确认{{text}}？</p>
    </confirm>
    <toast v-model="showToast" type="text" :time="800" is-show-mask text="开启成功" position="middle" width='100px'></toast>
    <toast v-model="showToast2" type="text" :time="800" is-show-mask text="关闭成功" position="middle" width='100px'></toast>
    <div class="mask" v-if="show2" @click.stop="showGuize()">
      <div class="guize">
        <div class="text">
          <p>{{info.time}}</p>
          <p>{{info.money}}</p>
          <p>{{info.desc}}</p>
        </div>
        <div class="confirm" @click.stop="showGuize()">确定</div>
      </div>
    </div>
  </div>
</template>

<script>
import { XButton, Confirm, Toast } from "vux";
import { openReturnMoney, returnMoneyRule } from "@api/api"
export default {
  props: {
    data: {
      type: Object,
      default() {
        return {};
      },
      isShowAction: true,
      splitRoleType: ""
    },
    showOptions: {
      type: Object,
      default() {
        return {
          image: false
        };
      }
    }
  },
  components: {
    XButton,
    Confirm,
    Toast
  },
  data() {
    return {
      show: false,
      show2: false,
      is_show: false,
      isShowAction: true,
      info: {},
      text: '开启',
      showToast: false,
      showToast2: false
    };
  },
  computed: {
    _showOptions() {
      return Object.assign({}, this.showOptions);
    },
    president() {
      return localStorage.getItem("role_type") === "president";
    }
  },
  created() {
    if (this.$route.path == "/supplier") {
      this.is_show = true;
    }
    this.data.isShowAction = true;
    this.data.splitRoleType = "entrepreneur";
    if (this.$route.path == "/supplier") this.data.splitRoleType = "supplier";
  },
  methods: {
    distributionIntegral(id) {
      this.$emit("on-click-button", id);
    },
    goSplitFee(id) {
      if (this.data.splitRoleType == "supplier") {
        this.$router.push(`supplier/split_fee_set?supplier_id=${id}`);
      }
      if (this.data.splitRoleType == "entrepreneur") {
        this.$router.push(`entrepreneur/split_fee_set?entrepreneur_id=${id}`);
      }
    },
    showGuize() {
      this.show2 = !this.show2;
    },
    showRule(id) {
      this.show2 = true
      returnMoneyRule(id).then(res => {
        this.info = res.data
      })
    },
    onConfirm(id) {
      // 打开全返
      if(this.text == '开启'){
        this.returnMoney(1,id)
        this.showToast = true
      }else{
        this.returnMoney(0,id)
        this.showToast2 = true
      }
      this.$emit('changeReturn',1)
    },
    showPosition (position) {
      this.position = position
      this.showPositionValue = true
    },
    quanfan(id,open_zero_rate){
      this.show = true
      console.log(open_zero_rate)
      if(open_zero_rate === 1){
        this.text = '关闭'
      }else if(open_zero_rate === 0){
        this.text = '开启'
      }
    },
    returnMoney(is_open,id) {
      let data = {
        is_open
      }
      openReturnMoney(data,id).then(res => {
        let {code, data} = res
        if(code == 200){
          console.log(data)
        }else{
          console.log(data)
        }
      })
    }
  }
};
</script>

<style lang="sass" scoped>
  @import "./style"
  .weui-btn
    padding: 0 10px
  .integral
    position: absolute
    right: 6px
    top: 0
    font-size: 12px
  .integral-2
    position: absolute
    right: 6px
    top: 16px
    font-size: 12px
  .action1
    font-size: 12px
    width: 45%
  .action2
    width: 45%
    font-size: 12px
  .buttonss
    // position: absolute
    bottom: 6px
    overflow: hidden
    height: 32px
    width: 100%
    padding-right: 5px
    display: flex
    justify-content: space-between
  .button-left
    display: flex
    // flex: .8
    width: 48%
    justify-content: space-between
  .button-right
    display: flex
    // flex: .8
    width: 48%
    justify-content: space-between
  .item_hieght
    height: 120px
  .action3
    width: 45%
  .action4
    width: 45%

  .guize
    position: fixed
    top: 50%
    left: 50%
    transform: translate(-50%, -50%)
    width: 300px
    height: auto
    z-index: 9999
    background: #fff
    font-size: 14px
    padding-top: 10px
  .confirm
    width: 100%
    height: auto
    font-size: 18px
    text-align: center
    color: #0BB20C
    line-height: 38px
    border-top: 1px solid #D5D5D6
    padding-bottom: 10px
  .confirm:active
    background: #eee
  .mask
    position: fixed;
    z-index: 1000;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.6);
  .text
    padding: 10px 20px 10px
</style>
