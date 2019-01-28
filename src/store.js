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
    isSorting: [],
  },
  mutations: {
    // Индикатор загрузки
    IS_LOADING(state, payload) {
      state.isLoading = payload;
    },
    // Редактируется ли таблица
    IS_EDIT_TABLE(state, payload) {
      state.isEditTable = payload;
    },
    // Для хранения json перед восстановлением таблицы
    GAP_JSON(state, payload) {
      state.gapJson = payload;
    },
    // Отсортирована ли колонка
    IS_SORTING(state, payload) {
      state.isSorting[payload.colIndex] = payload.state;
    },
    // Создание пользовательской таблицы
    ADD_DEFAULT_TABLE(state, payload) {

         // Поднимаем вложенные объекты
     function parse(parseObj) {
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
        getProp(parseObj);
        return subarr;
      }
      // Сопоставим ключ-значение объектов
      function RM_NESTED_OBJ(value) {
        let parsedArr = [];
        let Arr = []
        for (let i = 0; i < value.length; i++) {
          parsedArr[i] = parse(value[i]);
          let Gap = {};
          for (let r = 0; r < state.static_headers.length-1; r++) {
            Gap[state.static_headers[r]] = parsedArr[i][r];
          }
          Arr.push(Gap);
        }
        return Arr;
      }
      let response = RM_NESTED_OBJ(payload.response);
      let el = Object.assign({}, state.tableFields);
      el.rows = state.static_headers;
      el.value = response;
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
    // Добавление строки
    ADD_ROW(state, payload) {
      let indexID = payload.indexRow + 1 + (payload.page - 1) * 10;
      let arrIn = {};
      for (let i = 0; i < payload.headers.length - 1; i++) {
          arrIn[payload.headers[i]] = " ";
      }
      state.isSorting[payload.index] = true;
      state.tables[payload.indexTable].value.splice(indexID, 0, arrIn);
    },
    // Редактирование ячейки таблицы
    INPUT_EDIT(state, payload) {
      console.log( payload.setRow,indexRow)
      let indexRow = payload.indexRow   + (payload.page - 1) * 10;
      state.tables[payload.tableIndex].value.splice(
       indexRow,
        1,
        payload.setRow
      );
    },
    // Редактирование ячейки таблицы
    SORT_TABLE(state, payload) {
      if (!state.isSorting[payload.index] === true) {
        var sortMethod = (a, b) => {
            if (a[payload.header] < b[payload.header]) {
              return -1;
            }
            if (a[payload.header] > b[payload.header]) {
              return 1;
            }
            return 0;

        };
        state.tables[payload.tableIndex].value.sort(sortMethod);
        state.isSorting[payload.index] = true;
      } else {
        state.tables[payload.tableIndex].value.reverse();
      }
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
          state.commit("ADD_DEFAULT_TABLE", data);
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
