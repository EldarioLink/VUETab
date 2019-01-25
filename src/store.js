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
      "id",
      "firstName",
      "lastName",
      "email",
      "phone",
      "adress.streetAddress",
      "adress.city",
      "adress.state",
      "adress.zip",
      "description",
      "Actions"
    ],
    isEditTable: false,
    isSorting: false
  },
  mutations: {
    IS_LOADING(state, payload) {
      state.isLoading = payload;
    },
    IS_EDIT_TABLE(state, payload) {
      state.isEditTable = payload;
    },
    GAP_JSON(state, payload) {
      state.gapJson = payload;
    },
    IS_SORTING(state, payload) {
      state.isSorting = payload;
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
    },
    // Удаление таблицы
    REMOVE_TABLE(state, payload) {
      state.tables.splice(payload, 1);
    },
    ADD_ROW(state, payload) {
      // Как сократить код и методы (){ } a ne function: {} let arrIn viden, несколько v-on на элементе и сорктатить inputsavetext
      let indexID = payload.indexRow + 1 + (payload.page - 1) * 10;

      let arrIn = [];
      for (
        let i = 0;
        i < state.tables[payload.indexTable].rows.length - 1;
        i++
      ) {
        arrIn[i] = "";
      }

      state.tables[payload.indexTable].value.splice(indexID, 0, arrIn);
    },
    INPUT_EDIT(state, payload) {
      state.tables[payload.tableIndex].value.splice(
        payload.rowIndex,
        1,
        payload.inputText
      );
    },
    REVERSE_TABLE(state, payload) {
      if (!state.isSorting) {
        var sortMethod = (firstId, secondId) => {
          return firstId.id - secondId.id;
        };
        state.tables[payload.tableIndex].value.sort(sortMethod);
      }
      state.tables[payload.tableIndex].value.reverse();
      state.isSorting = true;
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
    getgapJson: state => state.gapJson,
    getIsEditTable: state => state.isEditTable,
    getIsSorting: state => state.isSorting
  }
});
