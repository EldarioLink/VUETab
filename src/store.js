import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import VueAxios from "vue-axios";

Vue.use(Vuex,VueAxios, axios, Vuex);

export default new Vuex.Store({
  state: {
    tableFields: {
      value: [],
      page: 1,
      rows: [],
      options: []
    },
    tables: [],
    isLoading: false
  },
  mutations: {
    //

    addEmptyTable: (state, payload) => {
      // удаление пробелов и преобразование в массив
      let headers = payload.headers.replace(/\s+/g, "").split(",");
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
      el.rows = payload.rows;
      el.value = arr;
      el.options = payload.css
        ? payload.css.replace(/\s+/g, "").split(",", 3)
        : [];

      state.tables.push(el);
    }
  },

  addDefaultTable: (state, payload) => {
    this.axios
      .get(
        "http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&adress={addressObject}&description={lorem|32}"
      )
      .then(response => {
        console.log(response.data);
        // this.json = response.data;
        // this.setPage(this.json.length, 1);
        // this.$store.commit("IS_LOADING", false);
        // this.isTableReady = true;
      });
  },

  actions: {},
  getters: {}
});
