import { mapGetters } from "vuex";
export default {
  props: ['table', 'tableIndex'],

  data() {
    return {
      perPage: 10,
      pagination: {},
      tableData: {
        values: [],
        page: 1,
        rows: [],
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
    }
  },
 mounted() {
    this.setPage(this.table.value.length  , 1);
  }
};
