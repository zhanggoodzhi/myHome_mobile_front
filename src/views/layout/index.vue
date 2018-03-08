<template>
  <div class="page">
    <mt-popup v-model="popupVisible" position="left">
      <div class="menu-wrap">
        <div class="head">
          <img class="gicon" src="/static/logo.jpg">
          <span class="account">{{this.alias}}</span>
        </div>
        <div class="menu" @click="closePopup">
          <div class="menu-item">
            <mt-cell title="首页" is-link to="home"></mt-cell>
          </div>
          <div class="menu-item">
            <mt-cell title="留言" is-link to="note"></mt-cell>
          </div>
          <div class="menu-item" v-show="isAdmin">
            <mt-cell title="用户管理" is-link to="user"></mt-cell>
          </div>
        </div>
        <div class="exit">
          <mt-button type="danger" plain size="small" @click="onLogout">退出</mt-button>
        </div>
      </div>
    </mt-popup>
    <mt-header :title="headerTitle">
      <mt-button slot="left" @click="popupVisible=!popupVisible">
        <i class="iconfont aicon-other menu-btn"></i>
      </mt-button>
    </mt-header>
    <div class="main">
      <transition name="slide" enter-active-class="animated bounceInLeft" leave-active-class="animated bounceOutRight" mode="out-in">
        <router-view/>
      </transition>
    </div>
  </div>
</template>
<script>
import { getAuthData } from "components/utils";
import { Toast, MessageBox } from "mint-ui";
export default {
  data() {
    return {
      alias: "",
      popupVisible: false,
      headerTitle: ""
    };
  },
  created() {
    const authDataString = localStorage.getItem("authData");
    if (!authDataString) {
      this.$router.replace("/login");
    } else {
      this.alias = JSON.parse(authDataString).alias;
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.headerTitle = to.meta.name;
    });
  },
  beforeRouteUpdate(to, from, next) {
    this.headerTitle = to.meta.name;
    next();
  },
  methods: {
    onLogout() {
      localStorage.setItem("authData", "");
      this.$router.replace("/login");
    },
    closePopup() {
      this.popupVisible = false;
    }
  },
  computed: {
    isAdmin() {
      return getAuthData() && getAuthData().ifAdmin;
    }
  }
};
</script>
<style lang="less" scoped>
.menu-btn {
  font-size: 28px;
}

.account-icon {
  font-size: 14px;
}
.main {
  height: calc(~"100vh - 40px");
  overflow: auto;
  position: relative;
}
.vm {
  vertical-align: middle;
}

.account {
  font-size: 12px;
}

.menu-wrap {
  height: 100vh;
  box-sizing: border-box;
  .menu-item {
  }
}

.head {
  font-size: 19px;
  padding: 0 10px;
  background: #409eff;
  line-height: 40px;
  color: white;
  display: flex;
  align-items: center;
  height: 40px;
}
.account {
  margin-left: 0.2rem;
}
.exit {
  text-align: center;
  position: absolute;
  width: 100%;
  bottom: 20px;
}
.gicon {
  width: 30px;
  height: auto;
}
</style>
