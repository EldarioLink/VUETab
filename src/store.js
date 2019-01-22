import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import VueAxios from "vue-axios";

Vue.use(Vuex, VueAxios, axios);

export default new Vuex.Store({
  state: {
    tableFields: {
      value: [],
      page: 1,
      rows: [],
      options: [],
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
    ],
  },
  mutations: {
    IS_LOADING(state, payload) {
      state.isLoading = payload;
    },

    addDefaultTable(state, payload) {
      //избавляемся от вложенных объектов
      var storage_local = [];
      var subarr = [];

      var getProp = o => {
        for (var prop in o) {
          if (typeof o[prop] === "object") {
            getProp(o[prop]);
          } else {
            subarr.push(o[prop]);
          }
        }
      };
      for (let i = 0; i < payload.response.length; i++) {
        getProp(payload.response[i]);
        storage_local.push(subarr);
        subarr = [];

      }

      let el = Object.assign({}, state.tableFields);
      el.rows = state.static_headers;
      el.value = storage_local;
      el.isLoading = false;
      el.options = payload.css ? payload.css.replace(/\s+/g, "").split(",", 3)
      : [];
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
console.log(el.options)
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
          console.log(response.data);
          let data = {
            css: payload.css,
            response: response.data
          }
          state.commit("addDefaultTable", data);
        });
    }
  },
  getters: {
    getTables: state => state.tables,
    getStaticHeaders: state => state.static_headers,
    getisLoading: state => state.isLoading

  }
});
