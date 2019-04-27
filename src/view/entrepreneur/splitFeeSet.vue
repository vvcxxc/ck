<template>
  <div class="splitFeeSet">

   <x-header title="分润比例设置"></x-header>
    <form>
        <group title="费率返点设置" class="splitFeeSetInfo">
            <x-input title="剩余分润总额：" v-model="data.pay_president_split"  disabled>
                <i slot="right">‰</i>
            </x-input>
            <x-input v-if="is_show_entrepreneur_set" @on-blur="change_pay_value" title="创客：" v-model="data.pay_entrepreneur_split">
                <i slot="right">‰</i>
            </x-input>
            <x-input @on-blur="change_pay_value" title="店铺：" v-model="data.pay_store_split" >
                <i slot="right">‰</i>
            </x-input>
        </group>

        <group title="券分润设置" class="splitFeeSetInfo">
            <x-input title="剩余分润总额：" v-model="data.coupon_president_split"  disabled>
                <i slot="right">%</i>
            </x-input>
            <x-input v-if="is_show_entrepreneur_set" @on-blur="change_coupon_value" title="创客：" v-model="data.coupon_entrepreneur_split" >
                <i slot="right">%</i>
            </x-input>
            <x-input @on-blur="change_coupon_value" title="店铺：" v-model="data.coupon_store_split" >
                <i slot="right">%</i>
            </x-input>
        </group>

        <group title="广告分润设置" class="splitFeeSetInfo">
            <x-input title="剩余分润总额：" v-model="data.ad_president_split"  disabled>
                <i slot="right">%</i>
            </x-input>
            <x-input v-if="is_show_entrepreneur_set" @on-blur="change_ad_value" title="创客：" v-model="data.ad_entrepreneur_split" >
                <i slot="right">%</i>
            </x-input>
            <x-input @on-blur="change_ad_value" title="店铺：" v-model="data.ad_store_split" >
                <i slot="right">%</i>
            </x-input>
        </group>
    </form>
    <x-button style="margin-top: 1rem" type="primary" @click.native="putSplitRule">确定</x-button>
    
  </div>
</template>

<script>

  import { XHeader, Group, XButton, XInput } from 'vux'
  import { getSplitRuleCk, putSplitRuleCk, isExistEntrepreneur } from '@api/api'
  import { Validator, timeout} from '@utils/common'

  const REQUEST_OK = 200

  export default {
    data() {
      return {
        data: {
          pay_president_split: 0,
          pay_entrepreneur_split: 0,
          pay_store_split: 0,
          pay_platform_service_charge: 0,
          coupon_president_split: 0,
          coupon_entrepreneur_split: 0,
          coupon_store_split: 0,
          coupon_allot_split_Profit: 0,
          ad_president_split: 0,
          ad_entrepreneur_split: 0,
          ad_store_split: 0,
          ad_allot_split_Profit: 0,
          entrepreneur_id: 0,
        },
        is_show_entrepreneur_set: true,
      }
    },
    created(){
        this.data.entrepreneur_id = this.$route.query.entrepreneur_id

        getSplitRuleCk({entrepreneur_id: this.data.entrepreneur_id}).then(({ code, message, data }) => {
          this.data = data

          this.data.pay_president_split =  this.data.pay_platform_service_charge - this.data.pay_entrepreneur_split - this.data.pay_store_split
          this.data.coupon_president_split =  this.data.coupon_allot_split_Profit - this.data.coupon_entrepreneur_split - this.data.coupon_store_split
          this.data.ad_president_split =  this.data.ad_allot_split_Profit - this.data.ad_entrepreneur_split - this.data.ad_store_split

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

        putSplitRuleCk(this.data).then(({ code, data }) => {
          this.$vux.toast.text(data)
					timeout(2500).then(() => {
					    //window.location.href = `/entrepreneur`
							this.$router.push({path:'/entrepreneur'})
					})
        })
      },
      change_pay_value(value) {
        let set_value = (Number(this.data.pay_entrepreneur_split) + Number(this.data.pay_store_split))
        if (set_value > this.data.pay_platform_service_charge) {
            return this.$vux.toast.text(`不能超过${this.data.pay_platform_service_charge}`)   
            
        }
        this.data.pay_president_split = this.data.pay_platform_service_charge - set_value || 0

      },
    change_coupon_value(value) {
        let set_value = (Number(this.data.coupon_entrepreneur_split) + Number(this.data.coupon_store_split))
        if (set_value > this.data.coupon_allot_split_Profit) {
            return this.$vux.toast.text(`不能超过${this.data.coupon_allot_split_Profit}`)   
            
        }
        this.data.coupon_president_split = this.data.coupon_allot_split_Profit - set_value || 0

      },
    change_ad_value(value) {
        let set_value = (Number(this.data.ad_entrepreneur_split) + Number(this.data.ad_store_split))
        if (set_value > this.data.ad_allot_split_Profit) {
            return this.$vux.toast.text(`不能超过${this.data.ad_allot_split_Profit}`)   
            
        }
        this.data.ad_president_split = this.data.ad_allot_split_Profit - set_value || 0

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