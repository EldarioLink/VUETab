import { mapGetters } from "vuex";
export default {
    props: ['tables', 'static_headers'],

  data() {
    return {
      perPage: 10,
      pagination: {},
      customizeTd: undefined
    };
  },
  computed: {

    collection() {

      return this.paginate(   );
    },
    // Возвратим заголовки таблицы
    headers() {
      return this.tables.headers
    }
  },
  methods: {
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
    }
  },
  mounted() {
  }
};
