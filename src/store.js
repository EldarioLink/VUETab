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
    reverseKey: "Action"
  },
  mutations: {
    /**
   * Индикатор загрузки таблицы
   */
    IS_LOADING(state, payload) {
      state.isLoading = payload;
    },
    /**
   * Ключ для определения момента реверсирования/сортировки
   */
    REVERSE_KEY(state, payload) {
      state.reverseKey = payload;
    },
    IS_EDIT_TABLE(state, payload) {
      state.isEditTable = payload;
    },
    /**
   * Промежуточная переменная для хранения json перед восстановлением
   */
    GAP_JSON(state, payload) {
      state.gapJson = payload;
    },
    /**
   * Создание таблицы
   * @param {*} payload - данные сервера, названия классов стилей
   */
    ADD_DEFAULT_TABLE(state, payload) {
    /**
   * Разбор вложенных объектов
   */
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
    /**
   * Сопоставление пары ключ-значение разобранных объектов
   */
      function RM_NESTED_OBJ(value) {
        let parsedArr = [];
        let Arr = [];
        for (let i = 0; i < value.length; i++) {
          parsedArr[i] = parse(value[i]);
          let Gap = {};
          for (let r = 0; r < state.static_headers.length - 1; r++) {
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

     /**
   * Создание таблицы
   * @param {*} payload - заголовки, кол-во строк, стили
   */
    ADD_EMPTY_TABLE(state, payload) {
      let headers = payload.headers
        .toString()
        .replace(/\s+/g, "")
        .split(",");
      headers.push("Actions");
      let arr = [];
      let arrIn = {};
      for (let index = 0; index < payload.rows; index++) {
        for (let i = 0; i < headers.length - 1; i++) {
          arrIn[headers[i]] = "";
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
     /**
   * Очистка таблицы
   */
    CLEAN_TABLE(state, payload) {
      state.tables[payload].value = [];
    },
     /**
   *Восстановление таблицы
   */
    RECOVERY_TABLE(state, payload) {
      state.tables[payload].value = JSON.parse(state.gapJson);
    },
       /**
   * Удаление таблицы
   */
    REMOVE_TABLE(state, payload) {
      state.tables.splice(payload, 1);
    },
       /**
   * Добавление строки
   *  @param {*} payload - индекс строки, активная страница, заголовки таблицы
   */
    ADD_ROW(state, payload) {
      let indexID = payload.indexRow + 1 + (payload.page - 1) * 10;
      let arrIn = {};
      for (let i = 0; i < payload.headers.length - 1; i++) {
        arrIn[payload.headers[i]] = " ";
      }
      state.tables[payload.indexTable].value.splice(indexID, 0, arrIn);
    },
       /**
   * Редактирование ячейки таблицы
   * @param {*} payload - индекс таблицы, индекс строки, отредактированная строки
   */
    INPUT_EDIT(state, payload) {
      state.tables[payload.tableIndex].value.splice(
        payload.indexRowAll,
        1,
        payload.setRow
      );
    },
       /**
   * Сортировка столбца
   * @param {*} payload - заголовки таблицы, индекс таблицы
   */
    SORT_TABLE(state, payload) {
      if (!(state.reverseKey === payload.header)) {
        var sortMethod = (a, b) => {
          if (a[payload.header] < b[payload.header]) {
            return -1;
          }
          if (a[payload.header] > b[payload.header]) {
            return 1;
          }
          return 0;
        };
        state.reverseKey = payload.header;
        state.tables[payload.tableIndex].value.sort(sortMethod);
      } else {
        state.tables[payload.tableIndex].value.reverse();
      }
    }
  },
  actions: {
       /**
   * Создаем таблицу, делаем запрос и при успешном ответе отправим полученны данные на обработку в мутацию
   */
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
    getIsEditTable: state => state.isEditTable
  }
});
