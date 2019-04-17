<template>
  <div class="splitFeeSet">

   <x-header title="积分使用记录"></x-header>
    <form>
        <group title="费率返点设置" class="splitFeeSetInfo">
            <x-input title="会长：" v-model="data.pay_president_split"  >
                <i slot="right">%</i>
            </x-input>
            <x-input @on-change="change_pay_value" title="创客：" v-model="data.pay_entrepreneur_split" type="number">
                <i slot="right">%</i>
            </x-input>
            <x-input @on-change="change_pay_value" title="店铺：" v-model="data.pay_store_split" >
                <i slot="right">%</i>
            </x-input>
        </group>

        <group title="券分润设置" class="splitFeeSetInfo">
            <x-input title="会长：" v-model="data.coupon_president_split"  >
                <i slot="right">%</i>
            </x-input>
            <x-input @on-change="change_coupon_value" title="创客：" v-model="data.coupon_entrepreneur_split" >
                <i slot="right">%</i>
            </x-input>
            <x-input @on-change="change_coupon_value" title="店铺：" v-model="data.coupon_store_split" >
                <i slot="right">%</i>
            </x-input>
        </group>

        <group title="广告分润设置" class="splitFeeSetInfo">
            <x-input title="会长：" v-model="data.ad_president_split"  >
                <i slot="right">%</i>
            </x-input>
            <x-input @on-change="change_ad_value" title="创客：" v-model="data.ad_entrepreneur_split" >
                <i slot="right">%</i>
            </x-input>
            <x-input @on-change="change_ad_value" title="店铺：" v-model="data.ad_store_split" >
                <i slot="right">%</i>
            </x-input>
        </group>
    </form>
    <x-button style="margin-top: 1rem" type="primary" @click.native="putSplitRule">确定</x-button>
    
  </div>
</template>

<script>

  import { XHeader, Group, XButton, XInput } from 'vux'
  import { getSplitRule, putSplitRule } from '@api/api'
  import { Validator } from '@utils/common'

  const REQUEST_OK = 200

  export default {
    data() {
      return {
        data: {
          pay_president_split: 0,
          pay_entrepreneur_split: 0,
          pay_store_split: 0,
          coupon_president_split: 0,
          coupon_entrepreneur_split: 0,
          coupon_store_split: 0,
          ad_president_split: 0,
          ad_entrepreneur_split: 0,
          ad_store_split: 0,
          supplier_id: 0,
        }
      }
    },
    created(){
        this.data.supplier_id = this.$route.query.supplier_id
        getSplitRule({supplier_id: this.data.supplier_id}).then(({ code, message, data }) => {
          this.data = data

          this.data.pay_president_split =  100 - this.data.pay_entrepreneur_split - this.data.pay_store_split
          this.data.coupon_president_split =  100 - this.data.coupon_entrepreneur_split - this.data.coupon_store_split
          this.data.ad_president_split =  100 - this.data.ad_entrepreneur_split - this.data.ad_store_split

        })
        

    },
    components: {
      XHeader,
      Group,
      XInput,
      XButton,
    },
    methods: {
      handleHide(){
        this.$emit('on-hide')
      },
      putSplitRule() {
        // let errmsg = this._validator()

        // if (errmsg) return this.$vux.toast.text(errmsg)

        putSplitRule(this.data).then(({ code, data }) => {
          this.$vux.toast.text(data)
        })
      },
      change_pay_value(value) {
        let set_value = (parseInt(this.data.pay_entrepreneur_split) + parseInt(this.data.pay_store_split))
        if (set_value > 100) {
            return this.$vux.toast.text("不能超过100%")   
            
        }
        this.data.pay_president_split = 100 - set_value || 0

      },
    change_coupon_value(value) {
        let set_value = (parseInt(this.data.coupon_entrepreneur_split) + parseInt(this.data.coupon_store_split))
        if (set_value > 100) {
            return this.$vux.toast.text("不能超过100%")   
            
        }
        this.data.coupon_president_split = 100 - set_value || 0

      },
    change_ad_value(value) {
        let set_value = (parseInt(this.data.ad_entrepreneur_split) + parseInt(this.data.ad_store_split))
        if (set_value > 100) {
            return this.$vux.toast.text("不能超过100%")   
            
        }
        this.data.ad_president_split = 100 - set_value || 0

      },
    //   _validator() {
    //     let validator = new Validator()

    //     let errmsg = validator.start()

    //     if (errmsg) return errmsg
    //   }
    }
  }
</script>
<style lang="scss" scoped>
  @import '@style/mixin';

  $px_5: 5px;
  $px_12: 12px;
  $px_20: 20px;

  .splitFeeSet {
    @include xallcover(101);
    font-size: $px_12;

    .iconfont {
      font-size: $px_20;
      padding-right: $px_5;
      color: #000;
    }
  }

  .splitFeeSetInfo {
    .weui-btn {
      font-size: $px_12;
    }
  }
</style>