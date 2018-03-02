<template>
  <div class="page-wrap">
    <mt-field label="用户名" placeholder="请输入用户名" v-model="account"></mt-field>
    <mt-field label="昵称" placeholder="请输入昵称" v-model="alias"></mt-field>
    <mt-field label="密码" placeholder="请输入密码" type="password" v-model="psd"></mt-field>
    <mt-field label="确认密码" placeholder="请再次输入密码" type="password" v-model="rePsd" @keyup.enter.native="onCreate"></mt-field>
    <mt-button class="button" type="primary">注册并登录</mt-button>
  </div>
</template>
<script>
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      account: "",
      alias: "",
      psd: "",
      rePsd: ""
    };
  },
  methods: {
    onCreate() {
      if (this.account === "") {
        Toast({
          message: "请输入用户名"
        });
        return;
      }
      if (this.alias === "") {
        Toast({
          message: "请输入昵称"
        });
        return;
      }
      if (this.psd === "") {
        Toast({
          message: "请输入密码"
        });
        return;
      }
      if (this.rePsd === "") {
        Toast({
          message: "请再次输入密码"
        });
        return;
      }
      if (this.rePsd !== this.psd) {
        Toast({
          message: "两次输入密码不一致"
        });
        return;
      }
      const sendData = {
        account: this.account,
        alias: this.alias,
        psd: this.psd
      };
      this.$http.post("account/register", sendData).then(
        response => {
          if (response.body.success) {
            Toast({
              message: response.body.message
            });
            const authData = {};
            Object.keys(response.body).forEach(v => {
              if (v === "message" || v === "success") {
                return;
              }
              authData[v] = response.body[v];
            });
            window.localStorage.setItem("authData", JSON.stringify(authData));
            this.$router.push("/home");
          } else {
            Toast({
              message: response.body.message
            });
          }
        },
        response => {
          // error callback
          Toast({
            message: "出现错误"
          });
        }
      );
    }
  }
};
</script>

<style lang="less" scoped>
.page-wrap {
  padding: 3rem 0.4rem 0;
  .button {
    width: 100%;
  }
  .login {
    margin-top: 1rem;
  }
}
</style>
