import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import Plus from "vue-material-design-icons/Plus.vue";
import addTable from "./components/addTable.vue";
import tab from "./components/Table.vue";
import popup from "./components/popup.vue";
import _ from "vue-lodash";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";



Vue.directive('focus', {
  inserted: function (el) {
    el.focus()
  }
})

Vue.component("popup", popup);
Vue.component("Loading", Loading);
Vue.component("down-icon", Plus);
Vue.use(_);

Vue.directive('click-outside', {
  bind(el, binding) {
      el.addEventListener('click', e => e.stopPropagation());
      document.body.addEventListener('click', binding.value);
  },
  unbind(el, binding) {
      document.body.removeEventListener('click', binding.value);
  }
});

Vue.component("addtable", addTable);
Vue.component("tab", tab);
Vue.config.productionTip = false;

new Vue({
  store,
  render: h => h(App)
}).$mount("#app");
