import { mapMutations } from "vuex";
import { mapGetters } from "vuex";
export default {
  props: {
    table: {
      type: Array
    },
    tableIndex: {
      type: Number
    }
  },
  data() {
    return {
      json: null
    };
  },
  computed: {
    ...mapGetters(["getgapJson"])
  },
  methods: {
    ...mapMutations(["GAP_JSON", "RECOVERY_TABLE"]),
    //  копирование данных в буфер обмена
    copyToBuffer() {
      const elTag = document.querySelector(".textfield");
      const outputJSON = elTag.value.trim();
      if (outputJSON) {
        navigator.clipboard.writeText(outputJSON);
        this.GAP_JSON(outputJSON);
      }
    },
    // восстановление данных из буфера обмена
    readBuffer(index) {
      navigator.clipboard.readText().then(text => {
        if (_.isEqual(text, this.getgapJson)) {
          this.RECOVERY_TABLE(index);
        } else {
          document.querySelector(".textfield").value =
            "Не правильный JSON объект ";
        }
      });
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.json = JSON.stringify(this.table);
    });
  }
};
