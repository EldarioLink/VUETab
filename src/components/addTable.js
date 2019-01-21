import { mapMutations, mapActions } from "vuex";

export default {
  data() {
    return {
      headers: [],
      rows: 1,
      css_table: "customize-headers, td-even, td-odd"
    };
  },
  methods: {
    ...mapMutations({
      addEmptyTable: "addEmptyTable",
    }),
    ...mapActions({
      addDefaultTable: "addDefaultTable"
      }),

    checkInputs() {
      // Если есть ли заголовки таблицы, то создаем пользо-ую таблицу
      if (this.headers.lenght) {
        let user_tb = {
          headers: this.headers,
          rows: this.rows,
          css: this.css_table
        };
        this.addEmptyTable(user_tb);
      } else {
        this.changeFlags();
       this.addDefaultTable()
      }
      this.$emit('click')
    },
    // Скрываем модальное окно, показываем индикатор загрузки, и таблицу
    changeFlags() {
      this.$store.commit("IS_LOADING", true);
    }
  }
};
