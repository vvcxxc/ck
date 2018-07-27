<template>
  <div class="dataview-box">
    <div class="container">
      <div class="dataview-title">
        <div class="l">
          <slot name="titleL"></slot>
          <slot name="image"></slot>
        </div>
        <div class="r">
          <slot name="titleR"></slot>
        </div>
      </div>
      <div class="dataview-detail">

        <div class="item"
             v-for="(item, index) in datalist"
             :key="index">
          <div class="l">{{item.key}}</div>
          <div class="r">{{item.value}}</div>
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
    datalist: {
      type: Array,
      default () {
        return [{
          key: '现金',
          value: 99
        }, {
          key: '苹果',
          value: 100
        }, {
          key: '苹果',
          value: 100
        }]
      }
    }
  },
  created () {
    console.log(this.datalist)
  }
}
</script>

<style lang="scss" scoped>
@import "~style/mixin";
@import "~style/variable";

.dataview-box {
  padding: $px_10;
  font-size: $s_14;
  background-color: $c_white;
  .container {
    display: flex;
    flex-direction: column;

    padding: $px_10;

    .dataview-title {
      display: flex;
      justify-content: space-between;

      font-size: $s_16;
      .l,
      .r {
        color: $c_font;
        display: flex;

        align-items: center;
      }

      img {
        padding-left: $px_5;
        border-radius: $pc_50;
      }
    }

    .dataview-detail {
      margin-top: $px_5;
      padding-bottom: $px_5;
      position: relative;
      display: flex;
      flex-direction: column;

      .item {
        display: flex;
        justify-content: space-between;
        padding-top: $px_5;

        .l {
          color: $c_font;
        }
      }
    }

    .dataview-detail:before {
      content: " ";
      width: 100%;
      border-top: 1px solid $c_border;
      position: absolute;
      top: 0;
      left: 0;
    }

    // .dataview-detail:after {
    //   content: " ";
    //   width: 100%;
    //   border-top: 1px solid $c_border;
    //   position: absolute;
    //   bottom: 0;
    //   left: 0;
    // }
  }
}
</style>


