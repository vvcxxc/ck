<template>
  <div class="x-data-preview">
    <div class="x-data-preview-item">
      <div class="x-data-preview-header">
        <label>类型</label>
        <span>{{datalist.bank_name || '未绑定'}}</span>
      </div>
      <div class="x-data-preview-body">
        <div class="x-data-preview-bd-item">
          <label>账户</label>
          <span>{{datalist.bank_card_number || '未绑定' }}</span>
        </div>
        <div class="x-data-preview-bd-item">
          <label>持卡人</label>
          <span>{{datalist.bank_account_user_name || '未绑定'}}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    datalist: {
      type: Object,
      default: {}
    }
  }
}
</script>

<style lang="scss" scoped>
.x-data-preview {
  margin-top: 0.42735rem; // 10px
  .x-data-preview-item {
    margin-top: 0.42735rem;
    background-color: #fff;
  }

  .x-data-preview-header {
    position: relative;
    font-size: 0.683761rem; // 16px
    padding: 0.641026rem; // 15px
    line-height: 100%;
    label {
      float: left;
      color: #999;
    }
    span {
      font-size: 16px; // 20px
      display: block; // overflow: hidden;
      text-align: right;
    }
  }
  .x-data-preview-header:after {
    content: ' ';
    position: absolute; // height: 1px;
    bottom: 0;
    right: 0;
    left: 0.641026rem; // 15px
    border-bottom: 1px solid #f5f5f5;
  }
  .x-data-preview-body {
    position: relative;
    text-align: right; //
    padding: 0.641026rem; // 15px
    font-size: 14px;
    .x-data-preview-bd-item {
      padding: 0.1rem 0;
      label {
        float: left;
        margin-right: 0.641026rem; // 15px
        min-width: 1.709402rem; // 40px
        text-align: justify;
        text-align-last: justify;
        color: #999;
      }
      span {
        display: block;
        overflow: hidden;
        word-break: normal;
        word-wrap: break-word;
        // color: #000;
      }
    }
  }
}
</style>


