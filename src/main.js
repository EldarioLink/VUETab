import Vue from 'vue'
import App from './App.vue'
import store from './store';
import addTable from "./components/addTable.vue";



Vue.component("addtable", addTable)
Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
