import Vue from 'vue'
import App from './App.vue'
// import VueRouter from 'vue-router'
import router from './router'
// import Vuex from 'vuex';
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './element-variables.scss'
import * as echarts from 'echarts';
Vue.prototype.$echarts = echarts;

Vue.use(ElementUI)
// Vue.use(Vuex)
Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
