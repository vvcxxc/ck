<template>
  <div class="scroll-box">
    <div class="scroll-out">
      <slot></slot>

      <div class="scroll-inn"
           v-infinite-scroll="loadMore"
           :infinite-scroll-disabled="loading"
           infinite-scroll-distance="0"
           infinite-scroll-immediate-check="false">

        <slot name="inn"></slot>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loading: true,
      currentPage: this.page
    }
  },
  props: {
    isLoadMore: {
      type: Boolean,
      default: false
    },
    http: {
      type: Function
    },
    page: {
      type: [Number, String],
      default: 1
    },
    lastPage: {
      type: [Number, String],
      default: 1
    },
    isPadding: {
      type: Boolean,
      default: false
    },
    options: {
      type: Object,
      default () {
        return {
          tips: '没有更多记录',
          position: 'middle'
        }
      }
    },
    // http 参数 默认没有
    params: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  methods: {
    loadMore () {

      if (!this.http || typeof this.http != 'function') return

      this.loading = true

      new Promise((resolve, reject) => {

        switch (true) {
          case this.currentPage >= this._lastPage:
            return reject()
          default:
            console.log('run')
            this.currentPage++
            return resolve()
        }
      }).then(() =>
        this.http({ page: this.currentPage, ...this.params })
          .then(({ code, data, message }) => {

            this.loading = false
            if (code !== 200) return this.$vux.toast.text('error', 'middle')

            this.$emit('listenEvent', data)
          })
      ).catch(() => this.$vux.toast.text(this.options.tips, this.options.position))
    }
  },
  computed: {
    _lastPage () {
      return this.lastPage
    },
    _isLoadMore () {
      return this.isLoadMore
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~style/mixin";
@import "~style/variable";

.scroll-box {
  overflow-x: hidden;
  height: 100%;
  -webkit-overflow-scrolling: touch;
  .scroll-out {
    // height: 100%;
    // display: flex;
    // flex-direction: column;

    // .scroll-inn {
    //   flex: 1;
    //   overflow-x: hidden;
    // }
  }
}
</style>

