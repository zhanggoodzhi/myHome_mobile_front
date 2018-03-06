<template>
   <ul>
        <li class="item" v-for="(item,index) in logs" :key="index">
            <mt-cell :title="item.text" :label="item.date"></mt-cell>
        </li>
    </ul>
</template>
<script>
export default {
  data() {
    return {
      logs: ""
    };
  },
  created() {
    this.$http.get(`api/getLogs`).then(response => {
      this.logs = response.body.reverse();
    });
  }
};
</script>
<style lang="less">
.item {
  .mint-cell-text {
    font-size: 14px;
    color: #606266;
  }
}
</style>