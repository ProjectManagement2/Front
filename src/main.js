import router from './router/index.js'
import App from './App.vue'
import Vue from 'vue'
import { BootstrapVue } from 'bootstrap-vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
//import Vuelidate from 'vuelidate'

import './assets/main.css';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'



Vue.config.productionTip = false

Vue.use(BootstrapVue);
Vue.use(VueAxios, axios);
//Vue.use(Vuelidate);
 
new Vue({
  render: h => h(App),
  router,
  axios
}).$mount('#app')