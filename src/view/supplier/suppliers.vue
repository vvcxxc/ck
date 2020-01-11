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
                <p>88.00</p>
                <p>总收益</p>
              </div>
              <div class="today_income">
                <p>8.00</p>
                <p>今日收益</p>
              </div>
              <div class="gift_limit">
                <p>8812</p>
                <p>礼品额度</p>
              </div>
              <div class="consume">
                <p>88</p>
                <p>已消耗</p>
              </div>
            </div>
          </div>
        </div>
        <div class="store_item_opeartion">
          <div class="share_benefit_setting">分润设置</div>
          <div class="limit_setting">额度设置</div>
        </div>
      </div>
    </div>
    <p class="load_more" @click="handleLoadMore" v-if="isMore">点击加载更多</p>
    <van-divider v-else :style="{borderColor: '#ccc', padding: '10px 16px',margin: 0 }">暂无更多数据</van-divider>
  </div>
</template>

<script>
import { suppliers } from "@api/api";
import { mapGetters } from "vuex";
import Vue from "vue";
import { NavBar, Search, Divider } from "vant";
Vue.use(NavBar);
Vue.use(Search);
Vue.use(Divider);

export default {
  data() {
    return {
      dataList: [],
      keyWord: "",
      flag: true,
      page: 1,
      limit: 10,
      isMore: true,
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
        }else {
          this.isMore = false
        }
      });
    },
    handleLoadMore() {
      this.page += 1;
      this.getData();
    }
  },
  computed: {
    ...mapGetters(["role_type"])
  },
  created() {
    this.getData();
  }
};
</script>

<style lang="sass">
.store_wrap
  margin-bottom: 50px
  background: #E9EEF2
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
        div.share_benefit_setting
          background: #4486F7
        div.limit_setting
          background: #ADB5BD

  .load_more
    font-size: 14px
    text-align: center
    padding-bottom: 10px

</style>
