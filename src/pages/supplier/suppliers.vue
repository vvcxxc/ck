<template>
  <div class="storebox xparent">
    <x-header title="店铺" :left-options="{showBack: false}"></x-header>
    <c-scroll class="supplier-wrapper">
      <div class="container">
        <div class="zw-list-container-img">
          <div class="zw-list-title">
            <p>{{'店铺数量: ' + suppliers.length}}</p>
          </div>
          <div class="zw-list-item" style="line-height: 100%" v-for="(item, index) in suppliers" :key="index">
            <div class="zw-list-item-content">
              <div class="zw-image">
                <img src="static/img/supplier.png">
              </div>
              <div class="zw-detail">
                <div class="zw-detail-item zw-detail-1">{{item.name || '无数据'}}</div>
                <div class="zw-detail-item zw-detail-2">{{item.mobile || '无数据'}}</div>
                <!-- <div class="zw-detail-item zw-detail-3">
                  <div>
                    <span>{{item.address || '无数据'}}</span>
                  </div>
                </div> -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </c-scroll>
    <!-- <div class="xchild"> -->
    <!-- <popup-picker v-model="value"
                    :data="areas_name"
                    @on-change="onChange"
                    :title="$t('member.popup.title')">
      </popup-picker> -->
    <!-- <div class="zw-list-container-img"
           v-infinite-scroll="loadMoreData"
           :infinite-scroll-disabled="loading"
           infinite-scroll-distance="0"
           infinite-scroll-immediate-check="false">
        <div class="zw-list-title">
          <p>{{'店铺数量: ' + (areasMetaInfo.total || 0)}}</p>
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
      </div> -->
    <!-- <load-more v-if="!areasData.toString()"
                 :show-loading="false"
                 :tip="'暂无数据'"
                 background-color="#fff"></load-more> -->
    <!-- </div> -->
    <!-- <router-view></router-view> -->
  </div>
</template>
<script type="text/javascript">
  import { suppliers } from "@api/api"
  import { mapGetters } from 'vuex'
  import CScroll from "@components/c-scroll/scroll"

  const REQUEST_OK = 200
  const REQUEST_CODE_ONE = 1

  export default {
    data() {
      return {
        // areas_name: [],
        // areas_id: [],
        // areasData: [],
        // value: [],
        // loading: false,
        // current_area_id: '',
        // page: 2
        suppliers: []
      }
    },
    computed: {
      ...mapGetters(['role_type'])
    },
    components: {
      CScroll
    },
    created() {
      this.fetchSuppliers()
    },
    methods: {
      fetchSuppliers() {
        const params = {
          type: this.role_type
        }
        suppliers(params).then(({ code, data, message, total }) => {
          // console.log(res)
          if (code == REQUEST_CODE_ONE) {
            this.suppliers = data
          }
        }).catch(err => console.log(err))
      }
    }
  }
</script>
<style lang="scss">
  // @import "~style/mixin";

  // 创客 => 门店
  // 会长 => 店铺
  // .storebox {
  //   font-size: $mdsize;
  // }
</style>