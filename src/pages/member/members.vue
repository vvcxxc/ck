<template>
  <div class="memberbox xparent">
    <x-header :title="$t('member.header')"
              :left-options="{showBack: false}"
              @on-click-back="routeTo"></x-header>
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
          <p>{{'会员总数: '+ (memberMetaInfo.total || 0) }}</p>
        </div>
        <div class="zw-list-item"
             v-for="(item, index) in memberData"
             :key="index">
          <div class="zw-list-item-content">
            <div class="zw-image">
              <img src="static/img/face2.png">
            </div>
            <div class="zw-detail">
              <div class="zw-detail-item zw-detail-1">{{item.user_name}}</div>
              <div class="zw-detail-item zw-detail-2">{{item.area_name}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <load-more v-if="!memberData.toString()"
               :show-loading="false"
               :tip="'暂无数据'"
               background-color="#fff"></load-more>
    <router-view></router-view>
  </div>
</template>
<script type="text/javascript">
import { memberList } from '~api/self'
import { getAreasInfo, timeout } from '~utils/common'
import { mapState } from 'vuex'

export default {
  name: 'member',
  data () {
    return {
      value: [],
      areas_name: [],
      areas_id: [],
      memberData: [],
      page: 2,
      loading: false,
      current_area_id: ''
    }
  },
  components: {
  },
  methods: {
    onChange (val) {

      let areas_name = this.areas_name[0].slice()
      let index = areas_name.indexOf(val.toString())

      this.current_area_id = this.areas_id[index]

      memberList({ area_id: this.current_area_id })
        .then(({ code, data, message, meta }) => {
          if (!code) {

            let { pagination } = meta

            this.$store.commit('MEMBER_META_INFO', pagination)

            this.memberData = data
          }
        })
    },
    routeTo () {
      this.$router.push('/self')
    },
    loadMoreData () {

      this.loading = true
      if (this.page > this.memberMetaInfo.total_pages) {

        this.$vux.toast.text('已没有更多记录', 'middle')

        return false
      }

      memberList({ area_id: this.current_area_id, page: this.page })
        .then(({ code, data, meta }) => {
          if (!code) {
            this.memberData = [...this.memberData, ...data]
            this.page++
            this.loading = false
          }
        })
    },
    _memberList () {
      memberList()
        .then(({ code, data, message, meta }) => {
          if (!code) {
            let { area_lists, pagination } = meta

            let areas_info = getAreasInfo(area_lists)
            this.areas_name = [areas_info.areasName]
            this.areas_id = areas_info.areasId

            // 触发商圈列表在重新获取
            areas_info.areasName[0] ? this.value.push(areas_info.areasName[0]) : this.value.push('未绑定商圈')

            this.$store.commit('MEMBER_META_INFO', pagination)
          }
        })
        .catch(err => {
          this.$store.commit('LOADING', { status: false })
        })
    }
  },
  created () {
    this._memberList()
  },
  computed: {
    ...mapState(['memberMetaInfo'])
  }
}

</script>
<style lang="scss" scoped>
@import "~style/mixin";

.memberbox {
  @include xallcover(100);
  font-size: $mdsize;
  .weui-label {
    font-size: $mdsize;
  }
}
</style>
