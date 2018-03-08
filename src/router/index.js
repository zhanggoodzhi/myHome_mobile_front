import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [{
    path: '/',
    redirect: '/home',
    component: resolve => require.ensure([], () => resolve(require('../views/layout')), 'layout'),
    children: [{
      path: '/home',
      meta: {
        name: '首页'
      },
      component: resolve => require.ensure([], () => resolve(require('../views/home')), 'home')
    }, {
      path: '/note',
      meta: {
        name: '留言'
      },
      component: resolve => require.ensure([], () => resolve(require('../views/note')), 'note')
    }, {
      path: '/user',
      component: resolve => require.ensure([], () => resolve(require('../views/user')), 'user')
    }]
  }, {
    path: '/login',
    component: resolve => require.ensure([], () => resolve(require('../views/login')), 'login')
  }, {
    path: '/register',
    component: resolve => require.ensure([], () => resolve(require('../views/register')), 'register')
  }]
})
