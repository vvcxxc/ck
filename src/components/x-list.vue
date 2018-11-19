<template>

  <div class="list-item"
       @click="handleClick">
    <!-- item 就循环这个 -->
    <div class="container">
      <div class="list-item-content">
        <div class="image">
          <!-- <img src="../assets/logo.png"
               alt=""> -->
          <slot name="image">

          </slot>
        </div>
        <div class="show">
          <div class="main-title">
            <!-- 主标题电风扇的联发科事件队拉开距离看见了 -->
            <slot name="main"></slot>
          </div>
          <div class="assist-title">
            <!-- 副标题 -->
            <slot name="assist"></slot>
          </div>
          <div class="extra-content">
            <!-- 额外 -->
            <slot name="extra1"></slot>
          </div>
          <div class="extra-content">
            <!-- 额外 -->
            <slot name="extra2"></slot>
          </div>
          <div class="extra-content">
            <!-- 额外 -->
            <slot name="extra3"></slot>
          </div>
          <div class="extra-content">
            <!-- 额外 -->
            <slot name="extra4"></slot>
          </div>
        </div>
      </div>

      <div class="list-item-tips">
        <div class="">
          <slot name="tips1"></slot>
        </div>
        <div class="">
          <slot name="tips2"></slot>
        </div>

        <div class="">
          <!-- <i>icon</i> -->
          <slot name="icon"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  props: {
    imgUrl: {
      type: String,
      default: ''
    }
  },
  methods: {
    handleClick (params) {
      this.$emit('handle-click', params)
    }
  }
}
</script>

<style lang="scss" scoped>

$px_5: 5px;
$px_10: 10px;
$px_12: 12px;
$px_40: 40px;
$c_white: #fff;
$c_border: #E1E1E1;
$c_font: #757575;

.list-item {
  font-size: $px_12;
  border-bottom: 1px solid $c_border;
  background-color: $c_white;
  .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: $px_10;

    .list-item-content {
      display: flex;
      flex: 3;
      justify-content: flex-start;
      align-items: center;

      .show {
        padding-left: $px_10;

        .assist-title,
        .extra-content {
          color: $c_font;
        }
      }
    }

    .image {
      display: flex;
      img {
        width: $px_40;
        height: $px_40;
      }
    }

    .list-item-tips {
      display: flex;
      flex: 2;

      justify-content: flex-end;
      align-items: center;
      div {
        color: $c_font;
        margin-left: $px_5;
      }
    }
  }
}

.list-item:last-child {
  border: 0 none;
}
</style>




