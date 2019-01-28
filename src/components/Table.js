import { mapMutations } from "vuex";
import { mapGetters } from "vuex";
export default {
  props: ["table", "tableIndex"],
  data() {
    return {
      perPage: 10,
      pagination: {},
      saveTab: false,
      edit: {
        row: null,
        col: null,
        value: []
      },
      inputText: undefined,
      keypressed: true,
      search: ""
    };
  },
  computed: {
    ...mapGetters(["getIsEditTable"])
  },
  methods: {
    ...mapMutations([
      "CLEAN_TABLE",
      "REMOVE_TABLE",
      "ADD_ROW",
      "INPUT_EDIT",
      "IS_EDIT_TABLE",
      "SORT_TABLE",
      "IS_SORTING"
    ]),
    // Редактирование ячейки
    isEditing(rowIndex, colIndex) {
      return (
        rowIndex == this.edit.row &&
        colIndex == this.edit.col &&
        this.getIsEditTable
      );
    },
    // Перед редактированием ячейки
    editField(row, col) {
      this.edit.row = row;
      this.edit.col = col;
      this.IS_EDIT_TABLE(true);
    },
    // Фокус уходит от элементa,то сохраняем новое значение таблицы
    wrapperBlur(rowIndex, colIndex) {
      if (this.keypressed) {
        this.inputSaveText(rowIndex, colIndex);
      } else {
        this.keypressed = true;
      }
    },
    // Отмена редактирования
    inputEditEsc() {
      this.keypressed = false;
      this.inputText = "";
      this.IS_EDIT_TABLE(false);
    },
    // Сохранение редактированного значения
    inputEnter(indexRow, colIndex) {
      this.keypressed = false;
      this.inputSaveText(indexRow, colIndex);
    },
    // Сохранение в ячейку таблицы нового значения таблицы
    inputSaveText(indexRow, colIndex) {
      let indexRowAll = indexRow + (this.table.page - 1) * 10;
      let Gap = _.cloneDeep(this.table.value[indexRowAll]);
      Gap[colIndex] = this.inputText;
      let data = {
        indexRow: indexRow,
        tableIndex: this.tableIndex,
        page: this.table.page,
        setRow: Gap
      };

      this.INPUT_EDIT(data);
      let sortData = {
        colIndex: colIndex,
        state: false
      };
      this.IS_SORTING(sortData);
      this.inputText = "";
      this.IS_EDIT_TABLE(false);
      Gap = null;
    },
    // Данные для пагинаций
    collection(value) {
      return this.paginate(value);
    },
    // Данные для пагинаций
    setPage(length, page) {
      this.table.page = page;
      this.pagination = this.paginator(length, page);
    },
    // Подсветка активной страницы пагинации
    checkActivePage(page) {
      if (page == this.table.page) {
        return "active";
      }
    },
    // Данные для пагинаций
    paginate(array) {
      return _.slice(
        array,
        this.pagination.startIndex,
        this.pagination.endIndex + 1
      );
    },
    // Данные для пагинаций
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
    // Стилизация заголовков
    setCustomHeaders() {
      return this.table.options[0];
    },
    // Стилизация нечетной строки
    setCustomTdEven() {
      return this.table.options[1];
    },
    // Стилизация четной строки
    setCustomTdOdd() {
      return this.table.options[2];
    },
    // Очистка таблицы
    cleanTable(index) {
      this.CLEAN_TABLE(index);
    },
    // Удаление таблицы
    removeTable(index) {
      this.REMOVE_TABLE(index);
    },
    // Добавление строки в таблицу
    addRow(indexTable, indexRow) {
      let indexesEl = {
        indexTable: indexTable,
        indexRow: indexRow,
        page: this.table.page,
        headers: this.table.rows
      };
      this.ADD_ROW(indexesEl);
      this.setPage(this.table.value.length, indexesEl.page);
    },
    // Сортировка таблицы
    sortTable(indexTd, header) {
      let data = {
        index: indexTd,
        tableIndex: this.tableIndex,
        header: header
      };
      this.SORT_TABLE(data);
    },
    filteredUsers(value) {
      const s = this.search.toLowerCase();
      let forSeach = value;
      let m = forSeach.filter(n =>
        Object.values(n).some(m =>
          m
            .toString()
            .toLowerCase()
            .includes(s)
        )
      );
      return this.collection(m);
    }
  },
  mounted() {
    this.setPage(this.table.value.length, 1);
  }
};
