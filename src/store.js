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
      options: []
    },
    gapJson: [],
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

     //
    GAP_JSON(state, payload) {
      state.gapJson = payload;
    },

    // Создание пользовательской таблицы
    addDefaultTable(state, payload) {
      let el = Object.assign({}, state.tableFields);
      el.rows = state.static_headers;
      el.value = payload.response;
      el.isLoading = false;
      el.options = payload.css
        ? payload.css.replace(/\s+/g, "").split(",", 3)
        : [];
      state.tables.push(el);
      state.isLoading = false;
    },
    // Создание пользовательской таблицы
    addEmptyTable(state, payload) {
      let headers = payload.headers
        .toString()
        .replace(/\s+/g, "")
        .split(",");
      headers.push("Actions");
      let arr = [];
      let arrIn = [];
      for (let index = 0; index < payload.rows; index++) {
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
    },
    // Очистка таблицы
    CLEAN_TABLE(state, payload) {
      state.tables[payload].value = [];
    },
    // Восстановление таблицы
    RECOVERY_TABLE(state, payload) {
      state.tables[payload].value = JSON.parse(state.gapJson);
    }
  },

  actions: {
    // Создание таблицы по умолчанию
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
          };
          state.commit("addDefaultTable", data);
        });
    }
  },
  getters: {
    getTables: state => state.tables,
    getStaticHeaders: state => state.static_headers,
    getisLoading: state => state.isLoading,
    getgapJson: state => state.gapJson
  }
});
