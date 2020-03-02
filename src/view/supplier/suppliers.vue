<template>
  <div class="store_wrap">
    <van-nav-bar title="店铺" v-if="flag" style="height: 54px;line-height: 54px">
      <van-icon name="search" slot="right" size="20px" @click="handleFlag" />
    </van-nav-bar>
    <form action="/" v-else>
      <van-search
        v-model="keyWord"
        placeholder="请输入搜索关键词"
        show-action
        @search="onSearch"
        @cancel="onCancel"
      />
    </form>
    <div class="supplier">
      <div class="store_item" v-for="(item) in dataList" :key="item.id">
        <div class="store_item_info">
          <div class="store_item_ava">
            <img :src="item.preview" alt width="45px" height="45px" />
          </div>
          <div class="store_item_data">
            <div class="store_item_desc">
              <div class="store_item_name">{{item.name}}</div>
              <div class="store_item_tel">{{item.mobile}}</div>
            </div>
            <div class="store_item_msg">
              <div class="all_income">
                <p>{{Number(item.supplierMoney) + Number(item.wd_money)}}</p>
                <p>总营业额</p>
              </div>
              <!-- <div class="today_income">
                <p>{{item.sale_money}}</p>
                <p>今日营业额</p>
              </div> -->
              <div class="gift_limit">
                <p>{{item.integral.length > 0 ? item.integral[0]['integral'] : 0}}</p>
                <p>礼品额度</p>
              </div>
              <div class="consume">
                <p>{{item.open_zero_rate}}</p>
                <p>已消耗</p>
              </div>
            </div>
          </div>
        </div>
        <div class="store_item_opeartion">
          <div
            class="fall_rate_return"
            v-if="item.can_zero_rate&&type"
            @click="handleFallRateReturn(item)"
          >费率全返</div>
          <div
            class="all_return_rules"
            v-if="item.can_zero_rate&&type"
            @click="handleAllReturnRules(item)"
          >全返规则</div>
          <div class="share_benefit_setting" v-if='type' @click="handleShareBenefitSet(item)">分润设置</div>
          <div class="limit_setting" @click="handleLimitSet(item)">额度设置</div>
        </div>
      </div>
    </div>
    <p class="load_more" @click="handleLoadMore" v-if="isMore">点击加载更多</p>
    <van-divider v-else :style="{borderColor: '#ccc', padding: '10px 16px',margin: 0 }">暂无更多数据</van-divider>

    <van-dialog v-model="showModal" title="分配礼品额度" show-cancel-button @confirm="handleConfirmGift">
      <van-field v-model="giftValue" placeholder="请输入分配礼品额度" />
    </van-dialog>

    <van-dialog
      v-model="showRateModal"
      title="费率全返"
      :confirmButtonText="btnText"
      @confirm="handleOpenOrClose"
    >
      <p
        style="text-align:center;padding:15px 18px;color:#999;font-size: 15px"
      >设置费率全返后，线下支付满足全选条件后创客与会长将不分润，同时将不能设置该店费率返点比例，是否确认{{openOrClose}}？</p>
    </van-dialog>

    <van-dialog v-model="showRulesModal">
      <p style="color:#999;font-size: 15px;margin:15px 0 0 25px;">{{dataInfo.money}}</p>
      <p style="color:#999;font-size: 15px;margin:15px 0 15px 25px;">{{dataInfo.desc}}</p>
    </van-dialog>
  </div>
</template>

<script>
import { suppliers, returnMoneyRule, openReturnMoney } from "@api/api";
import { giveIntegral } from "../../api/api";
import { mapGetters } from "vuex";
import Vue from "vue";
import { NavBar, Search, Divider, Dialog, Field, Toast } from "vant";
Vue.use(NavBar);
Vue.use(Search);
Vue.use(Divider);
Vue.use(Dialog);
Vue.use(Field);
Vue.use(Toast);

export default {
  data() {
    return {
      dataList: [],
      keyWord: "",
      flag: true,
      page: 1,
      limit: 10,
      isMore: true,
      showModal: false,
      giftValue: "",
      itemObj: {},
      showRateModal: false,
      openOrClose: "",
      btnText: "",
      showRulesModal: false,
      dataInfo: {},
      type: true //判断创客还是会长，创客为false会长为true
    };
  },
  methods: {
    handleFlag() {
      this.flag = false;
    },
    onSearch(val) {
      this.keyWord = val;
      this.page = 1;
      this.isMore = true;
      this.dataList = [];
      this.getData();
    },
    onCancel() {
      this.flag = true;
    },
    getData() {
      let params = {
        type: this.role_type,
        page: this.page,
        limit: this.limit,
        keyword: this.keyWord
      };
      suppliers(params).then(({ code, data, message, total }) => {
        if (data.length != 0) {
          this.dataList = this.dataList.concat(data);
        } else {
          this.isMore = false;
        }
      });
    },
    handleLoadMore() {
      this.page += 1;
      this.getData();
    },
    /**
     * 分润设置
     */
    handleShareBenefitSet(item) {
      this.$router.push(`supplier/split_fee_set?supplier_id=${item.id}`);
    },
    /**
     * 额度设置
     */
    async handleConfirmGift() {
      if (!(Number(this.giftValue) > 0)) {
        Toast("请输入正确的数字");
        window.scroll(0, 0);
        return;
      } else {
        const { code, message = "" } = await giveIntegral({
          party_id: this.itemObj.id,
          integral: this.giftValue,
          role_type: "supplier"
        });
        if (code == 200) {
          Toast.success(message);
        } else {
          Toast.fail(message);
        }
        window.scroll(0, 0);
      }
    },
    /**
     * 全返规则
     */
    handleAllReturnRules(item) {
      returnMoneyRule(item.id).then(res => {
        const { code, data } = res;
        if (code == 200) {
          this.dataInfo = data;
          this.showRulesModal = true;
        } else {
          Toast(data);
        }
      });
    },
    /**
     * 费率全返
     */
    handleFallRateReturn(item) {
      if (item.open_zero_rate == 1) {
        this.openOrClose = "关闭";
        this.btnText = "关闭";
      } else if (item.open_zero_rate == 0) {
        this.openOrClose = "开启";
        this.btnText = "开启";
      }
      this.showRateModal = true;
      this.itemObj = item;
    },
    handleOpenOrClose() {
      let is_open;
      if (this.openOrClose == "关闭") {
        is_open = 0;
      } else if ((this.openOrClose = "开启")) {
        is_open = 1;
      }
      let data = {
        is_open
      };
      openReturnMoney(data, this.itemObj.id).then(res => {
        const { code, data } = res;
        if (code == 200) {
          Toast(data);
        } else {
          Toast(data);
        }
      });
    },
    handleLimitSet(item) {
      this.giftValue = "";
      this.showModal = true;
      this.itemObj = item;
    }
  },
  computed: {
    ...mapGetters(["role_type"])
  },
  created() {
    let type = localStorage.getItem("role_type");
    if (type == "president") {
      this.type = true;
    } else {
      this.type = false;
    }
    this.getData();
  }
};
</script>

<style lang="sass">
.store_wrap
  margin-bottom: 50px
  background: #E9EEF2
  min-height: 100vh
  padding-bottom: 50px
  .supplier
    width: 100%
    height: 100%
    padding: 15px
    oveflow: auto
    .store_item
      height: 180px
      background: #fff
      border-radius: 10px
      padding: 15px
      box-sizing: border-box
      margin-bottom: 10px
      .store_item_info
        height: 110px
        border-bottom: 1px solid #E9EEF2
        display: flex
        font-size: 0
        .store_item_ava
          width: 45px
          height: 45px
          border-radius: 50%
          overflow: hidden
        .store_item_data
          width: calc(100% - 55px)
          margin-left: 15px
          display: flex
          flex-direction: column
          justify-content: space-between
          margin-bottom: 10px
          .store_item_desc
            .store_item_name
              color: #2C3E50
              font-size: 17px
              font-weight: bold
            .store_item_tel
              font-size: 14px
              color: #2C3E50
              margin-top: 4px
          .store_item_msg
            display: flex
            justify-content: space-between
            p:first-child
              color: #2C3E50
              font-size: 15px
              font-weight: bold
              text-align: center
            p:last-child
              color: #98A6AD
              font-size: 12px
              text-align: center
      .store_item_opeartion
        display: flex
        margin-top: 12px
        justify-content: flex-end
        div
          width: 70px
          height: 28px
          font-size: 13px
          color: #fff
          border-radius: 5px
          text-align: center
          line-height: 28px
          margin-left: 10px
        div.fall_rate_return
          background: #4486F7
        div.all_return_rules
          background: #4486F7
        div.share_benefit_setting
          background: #4486F7
        div.limit_setting
          background: #4486F7

  .load_more
    font-size: 14px
    text-align: center
    padding-bottom: 10px

</style>
