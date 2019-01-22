import { mapGetters } from "vuex";
export default {
  props: ["tables"],

  data() {
    return {
      perPage: 10,
      pagination: {}
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
    setCustomHeaders(i) {
      console.log(i);
      return this.tables[i].options[0];
    },
    setCustomTdEven(i) {
      return this.tables[i].options[1];
    },
    setCustomTdOdd(i) {
      return this.tables[i].options[2];
    }
  },
 mounted() {
    this.setPage(this.tables[0].value.length  , 1);
  }
};
