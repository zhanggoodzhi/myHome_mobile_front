<template>
  <div>
    <mt-popup v-model="popupVisible" position="left">
      <div>
        
      </div>
    </mt-popup>
    <mt-header title="首页">
      <mt-button slot="left" @click="popupVisible=!popupVisible">
        <i class="icon iconfont icon-other menu-btn"></i>
      </mt-button>
      <div slot="right">
        <i class="icon iconfont icon-wode account-icon vm"></i>
        <span class="vm account">{{this.alias}}</span>
      </div>
    </mt-header>
  </div>
  <!-- <transition name="slide" enter-active-class="animated bounceInLeft" leave-active-class="animated bounceOutRight" mode="out-in">
          <router-view/>
        </transition> -->
</template>
<script>
import { getAuthData } from "components/utils";

export default {
  data() {
    return {
      alias: "",
      popupVisible: false
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
  methods: {
    onLogout() {
      localStorage.setItem("authData", "");
      this.$router.replace("/login");
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
.vm {
  vertical-align: middle;
}
.account {
  font-size: 12px;
}
</style>
