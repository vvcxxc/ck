<template>
  <div class="scroll"
       ref="scroll">
    <slot></slot>
  </div>
</template>
<script>
import BScroll from 'better-scroll'
const DIRECTION_H = 'horizontal'
const DIRECTION_V = 'vertical'

export default {
  props: {
    data: {
      type: Array
    },
    click: {
      type: Boolean,
      default: false
    },
    direction: {
      type: String,
      default: DIRECTION_V
    },
    refreshDelay: {
      type: [Number, String],
      default: 20
    }
  },
  watch: {
    data () {
      setTimeout(() => {
        this.scroll && this.scroll.refresh()
      }, this.refreshDelay)
    }
  },
  created () {
    // 1、2018.8.27 由于数据没渲染出来 => 节点没有渲染 => 导致 BSscroll 高度计算错误
    this.$nextTick(() => this._initScroll())
  },
  methods: {
    _initScroll () {
      if (!this.$refs.scroll) return

      this.scroll = new BScroll(this.$refs.scroll, {
        click: true
      })
    },
    refresh () {
      this.scroll && this.scroll.refresh()
    },
    handleLoadMore () {

    },
    handleRefresh () {}
  }
}
</script>

<style lang="sass" scoped>
</style>
