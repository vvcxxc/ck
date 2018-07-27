<template>
  <div class="storebox xparent">
    <x-header :title="$t('storeTxt.header')"
              :left-options="{showBack: false}"></x-header>
    <div class="xchild">
      <popup-picker v-model="value"
                    :data="areas_name"
                    @on-change="onChange"
                    :title="$t('member.popup.title')">
      </popup-picker>
      <div class="zw-list-container-img"
           v-infinite-scroll="loadMoreData"
           :infinite-scroll-disabled="loading"
           infinite-scroll-distance="0"
           infinite-scroll-immediate-check="false">
        <div class="zw-list-title">
          <p>{{'门店数量: ' + (areasMetaInfo.total || 0)}}</p>
        </div>
        <div class="zw-list-item"
             style="line-height: 100%"
             v-for="(item, index) in areasData"
             :key="index">
          <div class="zw-list-item-content">
            <div class="zw-image">
              <img src="static/img/supplier.png">
            </div>
            <div class="zw-detail">
              <div class="zw-detail-item zw-detail-1">{{item.name || '无数据'}}</div>
              <div class="zw-detail-item zw-detail-2">{{item.tel || '无数据'}}</div>
              <div class="zw-detail-item zw-detail-3">
                <div>
                  <span>{{item.address || '无数据'}}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <load-more v-if="!areasData.toString()"
                 :show-loading="false"
                 :tip="'暂无数据'"
                 background-color="#fff"></load-more>
    </div>
    <router-view></router-view>
  </div>
</template>
<script type="text/javascript">

import { supplierList, memberList } from '~api/self'
import { getAreasInfo } from '~utils/common'
import { mapState } from 'vuex'

export default {
  data () {
    return {
      areas_name: [],
      areas_id: [],
      areasData: [],
      value: [],
      loading: false,
      current_area_id: '',
      page: 2
    }
  },
  components: {

  },
  created () {
    supplierList()
      .then(({ code, data, meta }) => {
        let { area_lists } = meta
        let areas_info = getAreasInfo(area_lists)
        this.areas_name = [areas_info.areasName]
        this.areas_id = areas_info.areasId
        this.value.push(areas_info.areasName[0])
      })
  },
  methods: {
    onChange (val) {
      let areas_name = this.areas_name[0].slice()

      let index = areas_name.indexOf(val.toString())

      this.current_area_id = this.areas_id[index]

      supplierList({ area_id: this.current_area_id })
        .then(({ code, data, meta }) => {
          if (code !== 400) {
            this.areasData = data

            let { pagination } = meta

            this.$store.commit('AREAS_META_INFO', pagination)
          }
        })
    },
    loadMoreData () {
      this.loading = true
      if (this.page > this.areasMetaInfo.total_pages) {

        this.$vux.toast.text('已没有更多记录', 'middle')

        return false
      }

      supplierList({ area_id: this.current_area_id, page: this.page })
        .then(({ code, data, meta, message }) => {
          if (!code) {
            this.areasData = [...this.areasData, ...data]
            this.page++
            this.loading = false
          } else {
            this.$store.commit('TIPS', { text: message, status: true })
          }
        })
    }
  },
  computed: {
    ...mapState(['areasMetaInfo'])
  }
}

</script>
<style lang="scss">
@import "~style/mixin";

// 创客 => 门店
// 会长 => 店铺
.storebox {
  // @include xallcover(102);
  font-size: $mdsize;
}
</style>
