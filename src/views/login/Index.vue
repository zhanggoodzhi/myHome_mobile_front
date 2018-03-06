<template>
  <div class="page">
    <div class="page-body">
      <mt-field label="用户名" placeholder="请输入用户名" v-model="account"></mt-field>
      <mt-field label="密码" placeholder="请输入密码" type="password" v-model="password" @keyup.enter.native="onLogin"></mt-field>
      <div class="btn-group">
        <mt-button class="button login" type="primary" @click="onLogin">登录</mt-button>
        <mt-button class="button" type="default" @click="jump">注册</mt-button>
      </div>
    </div>
  </div>
</template>
<script>
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      account: "",
      password: ""
    };
  },
  methods: {
    jump() {
      this.$router.push("/register");
    },
    onLogin() {
      if (this.account === "") {
        Toast({
          message: "请输入用户名"
        });
        return;
      }
      if (this.password === "") {
        Toast({
          message: "请输入密码"
        });
        return;
      }
      const sendData = {
        account: this.account,
        psd: this.password
      };
      this.$http.post("account/login", sendData).then(
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
.page {
  height: 100vh;
  position: relative;
  .page-body {
    padding: 2rem 0.3rem;
    .button {
      width: 100%;
    }
    .login {
      margin-top: 1rem;
    }
    .btn-group {
      padding: 0.3rem;
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
    }
  }
}
</style>
