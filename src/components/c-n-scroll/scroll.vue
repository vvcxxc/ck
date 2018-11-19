<template>
  <div class="scroll-wrapper"
       ref="scroll">
    <div class="content-wrapper">
      <div class="list-wrapper">
        <slot></slot>
      </div>
      <div class="pullup-wrapper" v-if="pullUpLoad">
        <span class="text" v-if="!flagPullUpLoad">上拉加载</span>
        <span class="text icon" v-if="flagPullUpLoad">{{pullingUpDesc}}</span>
      </div>
      <div class="pulldown-wrapper" v-if="pullDownRefresh">
        <span class="text" v-if="pullDownRefresh">下拉刷新</span>
      </div>
    </div>
  </div>
</template>
<script>
import BScroll from 'better-scroll'
const DIRECTION_H = 'horizontal'
const DIRECTION_V = 'vertical'

const MAX_50 = 50

export default {
  props: {
    data: {
      type: Array
    },
    click: {
      type: Boolean,
      default: true
    },
    refreshDelay: {
      type: [Number, String],
      default: 20
    },
    pullUpLoad: {
      type: Boolean,
      default: false
    },
    pullDownRefresh: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      flagPullUpLoad: true,
      flagDataJudge: true
    }
  },
  watch: {
    // 监听data, 有变化说明还有数据
    data () {
      setTimeout(() => {
        this.scroll && this.handleUpdate(true)
      }, this.refreshDelay)
    }
  },
  computed: {
    pullingUpDesc () {
      const TYPE_LOADING = '正在加载...'
      const TYPE_NO_DATA = '已无更多数据'
      return this.flagDataJudge ? TYPE_LOADING : TYPE_NO_DATA
    }
  },
  created () {
    this.$nextTick(() => this._initScroll())
  },
  methods: {
    _initScroll () {
      if (!this.$refs.scroll) return
      let options = {
        pullUpLoad: this.pullUpLoad,
        click: this.click
      }
      this.scroll = new BScroll(this.$refs.scroll, options)
      if (this.pullUpLoad) {
        this._initPullUpLoad()
      }

      if (this.pullDownRefresh) {
        this._initPullDownRefresh()
      }
    },
    handleUpdate (flagDataJudge) {
      // 用watch监听data的变化, 当data发生变化后, 把加载状态变更false
      if (this.pullUpLoad && this.flagPullUpLoad) {
        this.flagPullUpLoad = false
        this.flagDataJudge = flagDataJudge
        this.scroll.finishPullUp()
        this.refresh()
      } else {
        this.refresh()
      }
    },
    refresh () {
      this.scroll && this.scroll.refresh()
    },
    _initPullUpLoad () {
      // 自己触发, 自己监听 ? => update, 应该是监听pullingUp事件, 触发 pullingUp 后就派发父组件的自定义事件(pullingUp)
      this.scroll.on('pullingUp', () => {
        this.flagPullUpLoad = true
        this.$emit('pullingUp')
      })
    },
    _initPullDownRefresh () {
      this.scroll.on('touchEnd', pos => {
        // if (pos.y >= )
      })
    }
  }
}
</script>

<style lang="sass" scoped>
@import './style.sass'
</style>
