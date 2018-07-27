<template>
  <div class="memberdetailbox">
    <x-header :title="$t('memberDetails.header')"></x-header>
    <div class="zw-list-container-img">
      <div class="zw-list-item">
        <div class="zw-list-item-content">
          <div class="zw-image">
            <img src="static/img/face2.png">
          </div>
          <div class="zw-detail">
            <div class="zw-detail-item zw-detail-1">{{memberInfo.user_name || '无数据'}}</div>
            <div class="zw-detail-item zw-detail-2">{{memberInfo.area_name || '无数据'}}</div>
          </div>
        </div>
      </div>
    </div>
    <card>
      <div slot="content"
           class="card-demo-flex card-demo-content01">
        <div class="vux-1px-r">
          <span>1130</span>
          <br/> {{ $t('memberDetails.card.item1') }}
        </div>
        <div class="vux-1px-r">
          <span>0</span>
          <br/> {{ $t('memberDetails.card.item2') }}
        </div>
        <div>
          <span>88</span>
          <br/> {{ $t('memberDetails.card.item3') }}
        </div>
      </div>
    </card>
    <group>
      <cell :title="$t('memberDetails.item1')"
            is-link
            :value="false || '未填写'"></cell>
      <cell :title="$t('memberDetails.item2')"
            is-link
            :value="false || '未填写'"></cell>
      <cell :title="$t('memberDetails.item3')"
            is-link
            :value="false || '未填写'"></cell>
      <cell :title="$t('memberDetails.item4')"
            is-link
            :value="false || '未填写'"></cell>
    </group>
  </div>
</template>
<script>

import { mapGetters } from 'vuex'
import { memberDetails } from '~api/self'

export default {
  data () {
    return {
      memberInfo: {}
    }
  },
  components: {

  },
  computed: {
  },
  created () {
    this._initMemberDetails(this.$route.params)


  },
  methods: {
    _initMemberDetails (params) {
      memberDetails(params)
        .then(({ code, message, data }) => {
          !code && (this.memberInfo = data)
        })
    }
  }
}

</script>
<style lang="scss">
@import "@/style/mixin";

.memberdetailbox {
  @include xallcover(101);
}
</style>
