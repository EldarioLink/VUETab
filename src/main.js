import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import Plus from "vue-material-design-icons/Plus.vue";
import addTable from "./components/AddTable.vue";
import tab from "./components/Table.vue";
import popup from "./components/PopSaveBuf.vue";
import _ from "vue-lodash";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";

Vue.component("saveBuffer", popup);
Vue.component("Loading", Loading);
Vue.component("addRow-icon", Plus);
Vue.use(_);

Vue.component("addTable", addTable);
Vue.component("tab", tab);
Vue.config.productionTip = false;

new Vue({
  store,
  render: h => h(App)
}).$mount("#app");
