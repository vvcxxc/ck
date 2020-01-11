<template>
  <div class="splitFeeSet">
    <div class="splitFeeSet_Box">
      <div class="splitFeeSet_content">
        <div class="splitFeeSet_title">费率返点设置</div>
        <div class="splitFeeSet_item">
          <div class="splitFeeSet_infoBox">
            <div class="item_title">剩余分润总额</div>
            <div class="splitFeeSet_inputBox">
              <input class="splitFeeSet_input" v-model="data.pay_president_split" disabled />%
            </div>
          </div>
          <div class="splitFeeSet_infoBox" v-if="is_show_entrepreneur_set">
            <div class="item_title">创客</div>
            <div class="splitFeeSet_inputBox">
              <input
                class="splitFeeSet_input"
                v-on:blur="change_pay_value"
                v-model="data.pay_entrepreneur_split"
              />%
            </div>
          </div>
          <div class="splitFeeSet_infoBox">
            <div class="item_title">店铺</div>
            <div class="splitFeeSet_inputBox">
              <input
                class="splitFeeSet_input"
                v-on:blur="change_pay_value"
                v-model="data.pay_store_split"
              />%
            </div>
          </div>
        </div>
      </div>
      <div class="splitFeeSet_content">
        <div class="splitFeeSet_title">券分润设置</div>
        <div class="splitFeeSet_item">
          <div class="splitFeeSet_infoBox">
            <div class="item_title">剩余分润总额</div>
            <div class="splitFeeSet_inputBox">
              <input class="splitFeeSet_input" v-model="data.coupon_president_split" disabled />%
            </div>
          </div>
          <div class="splitFeeSet_infoBox" v-if="is_show_entrepreneur_set">
            <div class="item_title">创客</div>
            <div class="splitFeeSet_inputBox">
              <input
                class="splitFeeSet_input"
                v-on:blur="change_coupon_value"
                v-model="data.coupon_entrepreneur_split"
              />%
            </div>
          </div>
          <div class="splitFeeSet_infoBox">
            <div class="item_title">店铺</div>
            <div class="splitFeeSet_inputBox">
              <input
                class="splitFeeSet_input"
                v-on:blur="change_coupon_value"
                v-model="data.coupon_store_split"
              />%
            </div>
          </div>
        </div>
      </div>
      <div class="splitFeeSet_content">
        <div class="splitFeeSet_title">广告分润设置</div>
        <div class="splitFeeSet_item">
          <div class="splitFeeSet_infoBox">
            <div class="item_title">剩余分润总额</div>
            <div class="splitFeeSet_inputBox">
              <input class="splitFeeSet_input" v-model="data.ad_president_split" disabled />%
            </div>
          </div>
          <div class="splitFeeSet_infoBox" v-if="is_show_entrepreneur_set">
            <div class="item_title">创客</div>
            <div class="splitFeeSet_inputBox">
              <input
                class="splitFeeSet_input"
                v-on:blur="change_ad_value"
                v-model="data.ad_entrepreneur_split"
              />%
            </div>
          </div>
          <div class="splitFeeSet_infoBox">
            <div class="item_title">店铺</div>
            <div class="splitFeeSet_inputBox">
              <input
                class="splitFeeSet_input"
                v-on:blur="change_ad_value"
                v-model="data.ad_store_split"
              />%
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="feeSet_save" @click="putSplitRule">保存</div>
  </div>
</template>

<script>
import { getSplitRuleCk, putSplitRuleCk, isExistEntrepreneur } from "@api/api";
import { Validator, timeout } from "@utils/common";

const REQUEST_OK = 200;

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
        entrepreneur_id: 0
      },
      is_show_entrepreneur_set: true
    };
  },
  created() {
    this.data.entrepreneur_id = this.$route.query.entrepreneur_id;

    getSplitRuleCk({ entrepreneur_id: this.data.entrepreneur_id }).then(
      ({ code, message, data }) => {
        this.data = data;

        this.data.pay_president_split =
          this.data.pay_platform_service_charge -
          this.data.pay_entrepreneur_split -
          this.data.pay_store_split;
        this.data.coupon_president_split =
          this.data.coupon_allot_split_Profit -
          this.data.coupon_entrepreneur_split -
          this.data.coupon_store_split;
        this.data.ad_president_split =
          this.data.ad_allot_split_Profit -
          this.data.ad_entrepreneur_split -
          this.data.ad_store_split;
      }
    );
  },
  methods: {
    handleHide() {
      this.$emit("on-hide");
    },
    putSplitRule() {
      // let errmsg = this._validator()

      // if (errmsg) return this.$vux.toast.text(errmsg)

      putSplitRuleCk(this.data).then(({ code, data }) => {
        this.$vux.toast.text(data);
        timeout(2500).then(() => {
          //window.location.href = `/entrepreneur`
          this.$router.push({ path: "/entrepreneur" });
        });
      });
    },
    change_pay_value(value) {
      let set_value =
        Number(this.data.pay_entrepreneur_split) +
        Number(this.data.pay_store_split);
      if (set_value > this.data.pay_platform_service_charge) {
        return this.$vux.toast.text(
          `不能超过${this.data.pay_platform_service_charge}`
        );
      }
      this.data.pay_president_split =
        this.data.pay_platform_service_charge - set_value || 0;
    },
    change_coupon_value(value) {
      let set_value =
        Number(this.data.coupon_entrepreneur_split) +
        Number(this.data.coupon_store_split);
      if (set_value > this.data.coupon_allot_split_Profit) {
        return this.$vux.toast.text(
          `不能超过${this.data.coupon_allot_split_Profit}`
        );
      }
      this.data.coupon_president_split =
        this.data.coupon_allot_split_Profit - set_value || 0;
    },
    change_ad_value(value) {
      let set_value =
        Number(this.data.ad_entrepreneur_split) +
        Number(this.data.ad_store_split);
      if (set_value > this.data.ad_allot_split_Profit) {
        return this.$vux.toast.text(
          `不能超过${this.data.ad_allot_split_Profit}`
        );
      }
      this.data.ad_president_split =
        this.data.ad_allot_split_Profit - set_value || 0;
    }
    //   _validator() {
    //     let validator = new Validator()

    //     let errmsg = validator.start()

    //     if (errmsg) return errmsg
    //   }
  }
};
</script>
<style lang="sass" scoped>
 @import './splitFeeSet'
</style>
