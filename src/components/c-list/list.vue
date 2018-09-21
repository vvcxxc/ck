<template>
  <div class="list-wrapper">
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
    </div>
  </div>
</template>

<script>
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
    data() {
      return {}
    },
    computed: {
      _showOptions() {
        return Object.assign({}, this.showOptions)
      }
    },
    created() {
      console.log
    }
  }
</script>

<style lang="sass" scoped>
  @import "./style"
</style>