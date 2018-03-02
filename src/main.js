// The Vue build version to load with the `import` command (runtime-only or
// standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
// import ElementUI from 'element-ui'
import Mint from 'mint-ui';
import 'animate.css/animate.css';
// import 'element-ui/lib/theme-chalk/index.css';
import 'mint-ui/lib/style.css'
import router from './router'
import VueResource from 'vue-resource';
import store from './store'
import 'babel-polyfill';
import {
  getAuthData
} from 'components/utils';

Vue.use(Mint)
Vue.use(VueResource);

Vue.config.productionTip = false;
Vue
  .http
  .interceptors
  .push(function (request, next) {
    request
      .headers
      .set('Authorization', getAuthData() && getAuthData().token);
    // continue to next interceptor
    next(function (response) {
      if (response.status === 403) {
        console.log(response.body.message);
        this
          .$router
          .replace('/login');
      }
    });
  });
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {
    App
  }
})
// 移动端rem自适应
var documentElement = document.documentElement;

function callback() {
  var clientWidth = documentElement.clientWidth;
  // 屏幕宽度大于780，不在放大
  clientWidth = clientWidth < 780 ? clientWidth : 780;
  documentElement.style.fontSize = clientWidth / 10 + 'px';
}

document.addEventListener('DOMContentLoaded', callback);
window.addEventListener('orientationchange' in window ? 'orientationchange' : 'resize', callback);

