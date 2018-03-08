<template>
  <div class="router-content user">
    <mt-cell class="list-header" title="用户名" value="昵称"></mt-cell>
    <ul class="scroll-wrap">
      <li class="item" v-for="(item,index) in tableData" :key="index" v-finger:long-tap="press.bind(this,item)">
        <mt-cell :title="item.account" :value="item.alias">
        </mt-cell>
      </li>
    </ul>
    <mt-actionsheet class="" :actions="actions" v-model="sheetVisible">
    </mt-actionsheet>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tableData: [],
      sheetVisible: false,
      currentRow: null,
      actions: [
        {
          name: "删除",
          method: () => {
            this.handleDelete(this.currentRow._id);
          }
        }
      ]
    };
  },
  created() {
    this.reload();
  },
  methods: {
    press(row) {
      this.sheetVisible = true;
      this.currentRow = row;
    },
    handleDelete(id) {
      MessageBox.confirm("确定要删除该留言吗?").then(() => {
        this.$http
          .post("api/deleteUser", {
            id
          })
          .then(
            response => {
              // get body data
              console.log("删除成功", id);
              this.reload();
              Toast({
                message: response.body.message
              });
            },
            response => {
              // error callback
              Toast({
                message: "出现错误"
              });
            }
          );
      });
    },
    reload() {
      this.$http.get(`api/getUsers`).then(response => {
        this.tableData = response.body;
      });
    }
  }
};
</script>
<style lang="less">
.router-content {
  height: 100%;
}
.scroll-wrap{
  height: calc(~"100vh - 88px");
  overflow: auto;
}
.user {
  .list-header {
    background: #ebeef5;
    span {
      font-size: 18px !important;
    }
  }
  .mint-actionsheet-listitem:first-child {
    color: #ef4f4f;
  }
}
</style>
