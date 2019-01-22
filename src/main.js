import Vue from 'vue'
import App from './App.vue'
import store from './store';
import chevronDown from "vue-material-design-icons/ChevronDown.vue"
import Close from "vue-material-design-icons/Close.vue"
import chevronUp from "vue-material-design-icons/ChevronUp.vue"
import addTable from "./components/addTable.vue";
import tab from './components/Table.vue'
import _ from 'vue-lodash'
  import Loading from 'vue-loading-overlay';
  import 'vue-loading-overlay/dist/vue-loading.css';

Vue.component("Loading", Loading)
Vue.component("up-icon", chevronUp)
Vue.component("close-icon", Close)
Vue.component("down-icon", chevronDown )
Vue.use(_)

Vue.component("addtable", addTable)
Vue.component("tab", tab)
Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
