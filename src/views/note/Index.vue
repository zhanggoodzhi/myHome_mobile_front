<template>
  <div class="router-content">
    <ul>
      <li class="item" v-for="(item,index) in tableData" :key="index" @click="handleEdit(item)">
        <mt-cell :title="item.title" :value="item.content" :label="item.date"></mt-cell>
      </li>
    </ul>
    <mt-button class="add-btn" type="primary" @click="handleAdd">+</mt-button>
    <mt-popup v-model="dialogVisible" position="bottom">
      <div class="pop-content">
        <mt-header :title="dialogTitle">
          <mt-button slot="right" @click="save">
            完成
          </mt-button>
        </mt-header>
        <div class="form">
          <mt-field label="标题" placeholder="请输入标题" type="text" v-model="data.title"></mt-field>
          <mt-field label="内容" placeholder="请输入内容" type="textarea" rows="4" v-model="data.content"></mt-field>
        </div>
      </div>
    </mt-popup>
  </div>
</template>
<script>
import moment from "moment";
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      keyword: "",
      dialogTitle: "新增留言",
      dialogVisible: false,
      data: {
        title: "",
        content: ""
      },
      currentId: "",
      tableData: []
    };
  },
  created() {
    this.reload();
  },
  methods: {
    handleSearch() {
      this.reload();
    },
    handleAdd() {
      this.dialogVisible = true;
      this.dialogTitle = "新增留言";
    },
    handleEdit(row) {
      this.dialogTitle = "编辑留言";
      this.dialogVisible = true;
      setTimeout(() => {
        this.data.title = row.title;
        this.data.content = row.content;
      }, 0);
      this.currentId = row._id;
    },
    handleDelete(row) {
      this.$confirm("确定要删除该留言吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$http
          .post("api/deleteNote", {
            id: row._id
          })
          .then(
            response => {
              // get body data
              this.$message({
                type: "success",
                message: response.body.message
              });
              this.reload();
              this.reduce();
            },
            response => {
              // error callback
              this.$message.error({
                message: "出现错误"
              });
            }
          );
      });
    },
    reload() {
      this.$http.get(`api/getNotes?keyword=${this.keyword}`).then(response => {
        this.tableData = response.body;
      });
    },
    save() {
      if (this.data.title.trim() === "") {
        Toast({
          message: "请输入标题"
        });
        return;
      }
      if (this.data.content.trim() === "") {
        Toast({
          message: "请输入内容"
        });
        return;
      }
      // 验证通过,调用module里的setUserInfo方法
      const currentDate = moment().format("YYYY-MM-DD HH:mm:ss");
      const sendData = {
        ...this.data,
        date: currentDate
      };
      if (this.dialogTitle == "新增留言") {
        this.$http.post("api/addNote", sendData).then(
          response => {
            // get body data
            this.dialogVisible = false;
            this.keyword = "";
            Toast({
              message: response.body.message
            });
            this.reload();
          },
          response => {
            // error callback
            Toast({
              message: "出现错误"
            });
          }
        );
      } else {
        this.$http
          .post("api/updateNote", {
            ...sendData,
            id: this.currentId
          })
          .then(
            response => {
              // get body data
              this.dialogVisible = false;
              this.keyword = "";
              Toast({
                message: response.body.message
              });
              this.reload();
            },
            response => {
              // error callback
              Toast({
                message: "出现错误"
              });
            }
          );
      }
    },
    clearModal() {
      this.$refs.form.resetFields();
    }
  }
};
</script>
<style lang="less" scoped>
.item {
  border-bottom: 1px solid #eee;
  &:last-child {
    border: 0;
  }
}

.add-btn {
  border-radius: 50%;
  width: 1.3rem;
  height: 1.3rem;
  font-size: 25px;
  position: absolute;
  bottom: 0.2rem;
  left: 50%;
  transform: translateX(-50%);
}

.router-content {
  height: 100%;
}

.pop-content {
  width: 100vw;
  height: 100vh;
}
</style>
