export default {
  props: {
    table: {
      type: Array
    }
  },
  data() {
    return {
      empty: [],
      json: null
    };
  },
  methods: {
    //  копирование данных в буфер обмена
    copyToBuffer() {
      const inputEl = document.querySelector(".textfield");
      const inputValue = inputEl.value.trim();
      if (inputValue)
        navigator.clipboard.writeText(inputValue);
      },

    // восстановление данных из буфера обмена
    readBuffer() {
      navigator.clipboard.readText().then(text => {
        if (_.isEqual(text, this.json)) {
        } else {
          document.querySelector(".textfield").value =
            "Не правильный JSON объект ";
          console.log("copyed" + text);
        }
      });
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.json = JSON.stringify(this.table);
    });
  }
};
