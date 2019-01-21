import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import VueAxios from "vue-axios";

Vue.use(Vuex, VueAxios, axios, Vuex);

export default new Vuex.Store({
  state: {
    tableFields: {
      value: [],
      page: 1,
      rows: [],
      options: []
    },
    tables: [],
    isLoading: false,
    static_headers: [
      "ID",
      "firstName",
      "lastName",
      "email",
      "phone",
      "address.streetAddress",
      "address.city",
      "address.state",
      "address.zip",
      "description",
      "Actions"
    ]
  },
  mutations: {
    IS_LOADING(state, payload) {
      state.isLoading = payload;
    },
    addNewDefaultTable(state, payload) {
      let el = Object.assign({}, state.tableFields);

      el.rows = this.static_headers;
      el.value = payload;
      el.isLoading = false;

      state.tables.push(el);
      state.isLoading = false;
    },
    addEmptyTable(state, payload) {
      // удаление пробелов и преобразование в массив
      let headers = payload.headers
        .toString()
        .replace(/\s+/g, "")
        .split(",");
      headers.push("Actions");

      let arr = [];
      let arrIn = [];
      for (let i = 0; i < payload.rows; i++) {
        for (let i = 0; i < headers.length - 1; i++) {
          arrIn[i] = "";
        }
        arr.push(arrIn);
      }
      let el = Object.assign({}, state.tableFields);
      el.rows = headers;
      el.value = arr;
      el.options = payload.css
        ? payload.css.replace(/\s+/g, "").split(",", 3)
        : [];

      state.tables.push(el);
    }
  },

  actions: {
    addDefaultTable(state, payload) {
      state.commit("IS_LOADING", true);
      axios
        .get(
          "http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&adress={addressObject}&description={lorem|32}"
        )
        .then(response => {
          state.commit("addNewDefaultTable", response.data);
        });
    }
  },
  getters: {}
});
