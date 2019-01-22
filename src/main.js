import Vue from 'vue'
import App from './App.vue'
import store from './store';
import addTable from "./components/addTable.vue";
import tab from './components/Table.vue'
import _ from 'vue-lodash'


Vue.use(_)

Vue.component("addtable", addTable)
Vue.component("tab", tab)
Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
