import { mapMutations } from "vuex";
export default {
  props: ["table", "tableIndex"],

  data() {
    return {
      perPage: 10,
      pagination: {},
      saveTab: false,
      tableData: {
        values: [],
        page: 1,
        rows: []
      }
    };
  },
  computed: {
    // Возвратим заголовки таблицы
    tabs() {
      return this.tables;
    }
  },
  methods: {
    ...mapMutations([
      "CLEAN_TABLE" //
    ]),
    // Избавимся от вложенных элементов
    parse(parseObj) {
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
    },
    collection(value) {
      return this.paginate(value);
    },
    // Данные для пагинаций
    setPage(length, page) {
      this.pagination = this.paginator(length, page);
    },
    paginate(array) {
      return _.slice(
        array,
        this.pagination.startIndex,
        this.pagination.endIndex + 1
      );
    },
    paginator(totalItems, currentPage) {
      var startIndex = (currentPage - 1) * this.perPage,
        endIndex = Math.min(startIndex + this.perPage - 1, totalItems - 1);
      return {
        currentPage: currentPage,
        startIndex: startIndex,
        endIndex: endIndex,
        pages: _.range(1, Math.ceil(totalItems / this.perPage) + 1)
      };
    },
    setCustomHeaders() {
      return this.table.options[0];
    },
    setCustomTdEven() {
      return this.table.options[1];
    },
    setCustomTdOdd() {
      return this.table.options[2];
    },
    copyTable() {
      let copy = Object.assign({}, this.table);
      this.tableData = copy;
    },

    // Очистка таблицы
    cleanTable(index) {
      this.table.value = [];
      this.CLEAN_TABLE(index);
    }
  },
  mounted() {
    this.copyTable();
    this.setPage(this.table.value.length, 1);
  }
};
