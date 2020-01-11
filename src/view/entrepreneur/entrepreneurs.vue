<template>
  <div class="store_wrap">
    <van-nav-bar title="创客" style="height: 54px;line-height: 54px"></van-nav-bar>

    <div class="entrepreneur">
      <div class="store_item" v-for="(item) in dataList" :key="item.party_id">
        <div class="store_item_info">
          <div class="store_item_ava">
            <img src="static/img/supplier.png" alt width="45px" height="45px" />
          </div>
          <div class="store_item_data">
            <div class="store_item_desc">
              <div class="store_item_name">{{item.account_name}}</div>
              <div class="store_item_tel">{{item.account_phone}}</div>
              <div class="store_item_time">{{item.account_regist_time}}</div>
            </div>
          </div>
          <div class="store_item_gift">
            <p>{{item.integral.hasOwnProperty("integral")? item.integral.integral: 0}}</p>
            <p>礼品额度</p>
          </div>
        </div>
        <div class="store_item_opeartion">
          <div class="share_benefit_setting" @click="handleShareBenefitSet(item)">分润设置</div>
          <div class="limit_setting" @click="handleLimitSet(item)">额度设置</div>
        </div>
      </div>
    </div>
    <p class="load_more" @click="handleLoadMore" v-if="isMore">点击加载更多</p>
    <van-divider v-else :style="{borderColor: '#ccc', padding: '10px 16px',margin: 0 }">暂无更多数据</van-divider>

    <van-dialog v-model="showModal" title="分配礼品额度" show-cancel-button @confirm="handleConfirmGift">
      <van-field v-model="giftValue" placeholder="请输入分配礼品额度" />
    </van-dialog>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { entrepreneurs } from "@api/api";
import { giveIntegral } from "../../api/api";
import Vue from "vue";
import { Divider, Dialog, Toast } from "vant";
Vue.use(Divider);
Vue.use(Dialog);
Vue.use(Toast);

export default {
  data() {
    return {
      dataList: [],
      isMore: true,
      page: 1,
      showModal: false,
      giftValue: "",
      itemObj: {}
    };
  },
  computed: {
    ...mapGetters(["role_type"])
  },
  methods: {
    getData() {
      let params = {
        type: this.role_type,
        page: this.page
      };
      entrepreneurs(params).then(({ code, data, message, total }) => {
        // console.log(code, data, message, total);
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
      this.$router.push(
        `entrepreneur/split_fee_set?entrepreneur_id=${item.party_id}`
      );
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
          party_id: this.itemObj.party_id,
          integral: this.giftValue,
          role_type: "env"
        });
        if (code == 200) {
          Toast.success(message);
        } else {
          Toast.fail(message);
        }
        window.scroll(0, 0);
      }
    },
    handleLimitSet(item) {
      this.giftValue = "";
      this.showModal = true;
      this.itemObj = item;
    }
  },
  created() {
    this.getData();
  }
};
</script>

<style lang="sass" scoped>
.store_wrap 
  margin-bottom: 50px
  background: #E9EEF2
  .entrepreneur
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
        .store_item_ava
          width: 45px
          height: 45px
          border-radius: 50%
          overflow: hidden
        .store_item_data
          width: calc(100% - 115px) 
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
            .store_item_time
              font-size: 13px
              color: #ADB5BD
              margin-top: 10px
        .store_item_gift
          width: 60px
          p:first-child
            color: #2C3E50
            font-size: 15px
            font-weight: bold
            text-align: center
          p:last-child
            color: #98A6AD
            font-size: 12px
            text-align: center
            margin-top: 4px
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
          background: #4486F7
  .load_more
    font-size: 14px
    text-align: center
    padding-bottom: 10px  
</style>
