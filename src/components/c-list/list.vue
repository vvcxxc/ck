<template>
  <div class="list-wrapper" v-if="data.is_show || president">
    <div class="list-container">
      <div class="image" v-show="_showOptions.image">
        <img :src="data.src" alt="" width="56" height="56">
      </div>
      <div class="desc-wrapper">
        <div class="item" v-for="(value, key) in data.desc" :key="key">
          <p class="key">{{key}}</p>
          <p class="value">{{value}}</p>
        </div>
      </div>
      <div class="integral">积分: {{ data.integral }}</div>
      <div class="integral-2" v-if="data.useIntegral !== undefined">已消耗: {{ typeof data.useIntegral === 'object' ? data.useIntegral.integral : data.useIntegral }}</div>
      <div class="action">
        <x-button action-type="button" @click.native="distributionIntegral(data.id)">分配积分</x-button>
      </div>
    </div>
  </div>
</template>

<script>
  import { XButton } from 'vux'
  export default {
    props: {
      data: {
        type: Object,
        default () {
          return {}
        }
      },
      showOptions: {
        type: Object,
        default () {
          return {
            image: false
          }
        }
      }
    },
    components: {
      XButton,
    },
    data() {
      return {
      }
    },
    computed: {
      _showOptions() {
        return Object.assign({}, this.showOptions)
      },
      president() {
        return localStorage.getItem('role_type') === 'president'
      }
    },
    created() {
      console.log
    },
    methods: {
      distributionIntegral(id) {
        this.$emit('on-click-button', id)
      }
    }
  }
</script>

<style lang="sass" scoped>
  @import "./style"
  .integral
    position: absolute
    right: 6px
    top: 0
    font-size: 12px
  .integral-2
    position: absolute
    right: 6px
    top: 16px
    font-size: 12px
  .action
    position: absolute
    right: 6px
    bottom: 6px
    font-size: 12px
    
</style>
