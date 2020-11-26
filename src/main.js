// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false


// 引入 reset.css
import "../src/assets/css/reset.css"
// 引入 rem.js
import "../src/assets/js/rem"
// 引入 components中的index.js统一注册
import "./components/index"
// 引入全局filter
import "./filter/index"
// 引入vuex对象store
import store from "./store/index"
// 引入element-ui
import elementUi from "../node_modules/element-ui"
import "../node_modules/element-ui/lib/theme-chalk/index.css"
Vue.use(elementUi)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
