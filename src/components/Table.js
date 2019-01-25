import { mapMutations } from "vuex";
import { mapGetters } from "vuex";
export default {
  props: ["table", "tableIndex"],

  data() {
    return {
      perPage: 10,
      pagination: {},
      saveTab: false,
      tableData: {
        page: 1,
        col: null,
        row: null
      },
      edit: {
        row: null,
        col: null,
        value: []
      },
      inputText: null,
      isSorting: false
    };
  },
  computed: {
    ...mapGetters(["getIsEditTable"]),
    // Возвратим заголовки таблицы
    tabs() {
      return this.tables;
    }
  },
  methods: {
    ...mapMutations([
      "CLEAN_TABLE",
      "REMOVE_TABLE",
      "ADD_ROW",
      "INPUT_EDIT",
      "IS_EDIT_TABLE"
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
    isEditing(rowIndex, colIndex) {
      return (
        rowIndex == this.edit.row &&
        colIndex == this.edit.col &&
        this.getIsEditTable
      );
    },
    editField(row, col) {
      this.edit.row = row;
      this.edit.col = col;
      this.IS_EDIT_TABLE(true);
    },
    inputSaveText(rowIndex, colIndex) {
      this.edit.value = _.cloneDeep(this.table.value);
      var Gap = _.cloneDeep(this.table.value[rowIndex]);
      let key = this.table.rows[colIndex];
      if (Object.prototype.toString.call(Gap) == "[object Object]") {
        if (~key.indexOf(".")) {
          var arr = key.split(".");
          Gap.adress[arr[1]] = this.inputText;
        } else {
          Gap[key] = this.inputText;
        }
      } else {
        //   Если двойной клик на ячейки Actions, то ничего не делаем
        if (colIndex == 11) {
          return;
        }
        Gap[colIndex] = this.inputText;
      }
      this.edit.value[rowIndex] = Gap;
      let data = {
        rowIndex: rowIndex,
        colIndex: colIndex,
        tableIndex: this.tableIndex,
        inputText: this.edit.value[rowIndex]
      };
      this.INPUT_EDIT(data);
      this.inputText = "";
      this.IS_EDIT_TABLE(false);
      Gap = null;
    },
    sortElements() {
      if (!this.isSorting) {
         var sortMethod = (firstId, secondId) => {
          return firstId.id - secondId.id;
        }
        this.tableData.value.sort(sortMethod);
        this.isSorting = true
      }
      this.tableData.value.reverse()
    },
    inputEditEsc() {
      this.inputText = "";
      this.IS_EDIT_TABLE(false);
    },
    collection(value) {
      return this.paginate(value);
    },
    // Данные для пагинаций
    setPage(length, page) {
      this.tableData.page = page;
      this.pagination = this.paginator(length, page);
    },
    checkActivePage(page) {
      if (page == this.tableData.page) {
        return "active";
      }
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
      this.CLEAN_TABLE(index);
    },
    removeTable(index) {
      this.REMOVE_TABLE(index);
    },
    addRow(index, indexRow) {
      let indexesEl = {
        indexTable: index,
        indexRow: indexRow,
        page: this.tableData.page
      };
      this.ADD_ROW(indexesEl);
      this.setPage(this.table.value.length, indexesEl.page);
    }
  },
  mounted() {
    this.copyTable();
    this.setPage(this.table.value.length, 1);
  }
};
