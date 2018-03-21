import _Promise from 'babel-runtime/core-js/promise';
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';

axios.defaults.withCredentials = true; // 跨域保存session有用
axios.defaults.timeout = 5000;
axios.defaults.baseURL = "http://localhost:3000"; // 打包的时候直接删掉，默认基础路径在这里配置
// 将 axios 赋值给 Vue，方便在子组件里面使用
Vue.prototype.$reqs = axios;
Vue.config.productionTip = false;

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  //if(store.state.token){
  //config.headers.Authorization = `token ${store.state.token}`;
  //}
  if (localStorage.getItem('token')) {
    config.headers.Authorization = 'Bearer ' + localStorage.getItem('token');
  }
  return config;
}, function (err) {
  return _Promise.reject(err);
});
// 添加响应拦截器
axios.interceptors.response.use(function (res) {
  return res;
}, function (error) {
  if (error.response) {
    switch (error.response.status) {
      case 401:
        // 返回 401 清除token信息并跳转到登录页面
        router.replace({
          path: 'login',
          query: { redirect: router.currentRoute.fullPath }
        });
    }
  }
  return _Promise.reject(error.response.data); // 返回接口返回的错误信息
});
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router: router,
  //store,
  render: function render(h) {
    return h(App);
  }
});

//# sourceMappingURL=main-compiled.js.map