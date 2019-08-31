<template>
  <div class="">
    <x-header title="礼品额度使用记录"></x-header>

    <x-table :cell-bordered="false" :content-bordered="false" style="font-size: 12px">
      <tbody>
      <tr v-for="(item, index) in data" :key="index">
        <td>{{ item.created_at | formatDate }}</td>
        <td>{{ item.receiver ? item.receiver.account_name : item.supplier }}</td>
        <td>- {{ item.integral }}</td>
      </tr>
      </tbody>
    </x-table>
  </div>
</template>

<script>
  import {XHeader, XTable} from 'vux'
  import {integralRecords} from "../../api/api";

  export default {
    components: {
      XHeader,
      XTable,
    },
    created() {
      this.initData()
    },
    data() {
      return {
        data: []
      }
    },
    filters: {
      formatDate(time) {
        return time.split(' ')[0]
      }
    },
    methods: {
      async initData() {
        const { status, data } = await integralRecords();
        if (status === 'ok') {
          this.data = data
        }
      }
    }
  }
</script>

<style scoped>

</style>
