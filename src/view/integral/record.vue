<template>
  <div class="">
    <x-header title="积分使用记录"></x-header>

    <x-table :cell-bordered="false" :content-bordered="false" style="font-size: 12px">
      <tbody>
      <tr>
        <td>2018-12-12</td>
        <td>多美蛋糕店</td>
        <td>- 999</td>
      </tr>
      <tr>
        <td>2018-12-12</td>
        <td>多美蛋糕店</td>
        <td>- 999</td>
      </tr>
      </tbody>
    </x-table>
  </div>
</template>

<script>
  import {XHeader, XTable} from 'vux'

  export default {
    components: {
      XHeader,
      XTable,
    },

  }
</script>

<style scoped>

</style>
