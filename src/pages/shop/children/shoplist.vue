<template>
  <div class="shoplistbox">
    <!-- style="margin-top: 0.4rem" -->
    <!-- <popup-picker :title="$t('shop.popup.title')" :data="options" @on-change="onChange" v-model="value"></popup-picker> -->
    <search @result-click="resultClick"
            @on-change="getResult"
            :results="results"
            @on-blur="onBlur"
            v-model="supplier_name"
            position="absolute"
            top="46px"
            ref="search"
            @on-cancel="onCancel"></search>
    <div class="zw-list-container-img"
         v-infinite-scroll="loadMoreData"
         :infinite-scroll-disabled="loading"
         infinite-scroll-distance="0"
         infinite-scroll-immediate-check="false">
      <div class="zw-list-title">
        <p>{{'店铺总数: '+ (shopMetaInfo.total || 0)}}</p>
      </div>
      <div class="zw-list-item"
           v-for="(item, index) in shopData"
           :key="index">
        <div class="zw-list-item-content"
             style="line-height: 100%;">
          <div class="zw-image">
            <img src="static/img/shop.png">
          </div>
          <div class="zw-detail">
            <div class="zw-detail-item zw-detail-1">{{item.name}}</div>
            <div class="zw-detail-item zw-detail-2">{{item.region}}</div>
            <div class="zw-detail-item zw-detail-3">
              <div>
                <span>{{item.content}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <loading :show="this.shopData.length == 0"></loading>
    <load-more v-if="!shopData.toString()"
               :show-loading="false"
               :tip="'暂无数据'"
               background-color="#fff"></load-more>
  </div>
</template>
<script type="text/javascript">
import { Search } from 'vux'
import { shopList } from '~api/self'
import { mapState } from 'vuex'

export default {
  data () {
    return {
      // options: [
      //   ['全部','麻阳', '碍眼', '北京', '随便', '南宁', '其他', '不告诉你']
      // ],
      shopData: [],
      page: 2,
      supplier_name: '',
      loading: false,
      results: []
    }
  },
  components: {
    Search
  },
  methods: {
    switchShopItem (item) {
      // if(this.currentswitch == item) return false;

      // this.$store.commit('LOADING', {text: '加载中...', status: true})

      // setTimeout(() => {
      //   this.$store.commit('LOADING', {status: false})
      //   this.currentswitch = item;
      // }, 1000)
    },
    onChange ([region]) {
      shopList({ region })
        .then((res) => {
          this.shopData = res
        })
    },
    // async getDetails (params) {
    //   await this.$store.dispatch('getShopDetails', params)
    // },
    loadMoreData () {
      this.loading = true

      if (this.page > this.shopMetaInfo.total_pages) {

        this.$vux.toast.text('已没有更多记录', 'middle')
        return false
      }

      shopList({ page: this.page })
        .then(({ code, data, meta }) => {
          // 请求失败时才返回 状态码
          if (!code) {
            this.shopData = [...this.shopData, ...data]

            this.page++
            this.loading = false
          } else {
            this.$store.commit('TIPS', { text: message, status: true })
          }
        })
    },
    resultClick ({ title }) {
      this._getShopList(title)
    },
    getResult (val) {
      this.results = val ? [{ title: val }, { title: '' }] : []
    },
    onCancel () {
      // this.getShopList()
      console.log('cancel')
    },
    onBlur () {
      // console.log(this.supplier_name)
      !this.supplier_name && this._getShopList()
    },
    _getShopList (supplier_name = '') {
      shopList({ supplier_name })
        .then(({ code, data, message, meta }) => {
          if (!code) {
            let { pagination } = meta
            this.shopData = data
            // console.log(data)
            this.$store.commit('SHOP_META_INFO', pagination)
          }
        })
    }
  },
  created () {
    this._getShopList()
  },
  computed: {
    ...mapState(['shopMetaInfo'])
  }
}

</script>
<style lang="scss">
@import '~style/mixin';

.shoplistbox {
  font-size: $mdsize;
}
</style>
