import { mapMutations, mapActions } from "vuex";

export default {
  data() {
    return {
      headers: undefined,
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
      if (this.headers ) {
        let user_tb = {
          headers: this.headers,
          rows: this.rows,
          css: this.css_table
        };
        this.addEmptyTable(user_tb);
      } else {
        let user_tb = {
          css: this.css_table
        };
       this.addDefaultTable(user_tb)
      }
      this.$emit('close');
    },
  }
};
