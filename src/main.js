import router from './router/index.js'
import App from './App.vue'
import Vue from 'vue'
import { BootstrapVue } from 'bootstrap-vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Toast from 'vue-toastification';
import "vue-toastification/dist/index.css";

import './assets/main.css';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'



Vue.config.productionTip = false

Vue.use(BootstrapVue);
Vue.use(Toast, {
  transition: "Vue-Toastification__bounce",
  maxToasts: 20,
  newestOnTop: true
});
 
new Vue({
  render: h => h(App),
  router,
  axios
}).$mount('#app')