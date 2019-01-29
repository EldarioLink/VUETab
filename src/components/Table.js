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
      search: "",
      filteredData: []
    };
  },
  computed: {
    ...mapGetters(["getIsEditTable"]),
    /**
   * Возвратим длину отфильтрованного элемента
   */
    filteredDataLength() {
      return this.filteredData != 0
        ? this.filteredData
        : this.table.value.length;
    }
  },
  methods: {
    ...mapMutations([
      "CLEAN_TABLE",
      "REMOVE_TABLE",
      "ADD_ROW",
      "INPUT_EDIT",
      "IS_EDIT_TABLE",
      "SORT_TABLE",
      "REVERSE_KEY"
    ]),
   /**
   * После 2-го клика выставим флаг в состояние редактирования, и сохраним индексы ячейки таблицы
   * @param {*} row - индекс редактируемой строки
   * @param {*} col - индекс редактируемого столбца
   */
    editField(row, col) {
      this.edit.row = row;
      this.edit.col = col;
      this.IS_EDIT_TABLE(true);
    },
    /**
   * Если индексы ячейки совпадают, открываем поле редактирования
   * @param {*} row - индекс редактируемой строки
   * @param {*} col - индекс редактируемого столбца
   */
    isEditing(row, col) {
      return (
        row == this.edit.row &&
        col == this.edit.col &&
        this.getIsEditTable
      );
    },
      /**
   * Обертка для blur
   * @param {*} row - индекс редактируемой строки
   * @param {*} col - индекс редактируемого столбца
   */
    wrapperBlur(row, col) {
      if (this.keypressed) {
        this.inputSaveText(row, col);
      } else {
        this.keypressed = true;
      }
    },
       /**
   *  При нажатий Esc отменяем редактирование
   */
    inputEditEsc() {
      this.keypressed = false;
      this.inputText = "";
      this.IS_EDIT_TABLE(false);
    },
       /**
   * При нажатий на Enter сохраняем значение редактируемого поля
   * @param {*} rowIndex - индекс редактируемой строки
   * @param {*} colIndex - индекс редактируемого столбца
   */
    inputEnter(rowIndex, colIndex) {
      this.keypressed = false;
      this.inputSaveText(rowIndex, colIndex);
    },
       /**
   * Метод сохранения ячейки таблицы
   * @param {*} rowIndex - индекс редактируемой строки
   * @param {*} colIndex - индекс редактируемого столбца
   */
    inputSaveText(rowIndex, colIndex) {
      let indexRowAll = rowIndex + (this.table.page - 1) * 10;
      let Gap = _.clone(this.table.value[indexRowAll]);
      if (isNaN(this.inputText)) {
        Gap[colIndex] = this.inputText;
      } else {
        Gap[colIndex] = +this.inputText;
      }
      let data = {
        tableIndex: this.tableIndex,
        setRow: Gap,
        indexRowAll: indexRowAll
      };
      this.INPUT_EDIT(data);
      this.REVERSE_KEY(false);
      this.inputText = "";
      this.IS_EDIT_TABLE(false);
    },
         /**
   * Возвращает отфильтрованные данные для пагинаций
   */
    collection() {
      let value = this.search ? this.filteredData : this.table.value;
      return this.paginate(value);
    },
         /**
   * Метод сохранения отредактированной ячейки таблицы
   * @param {*} page - страница пагинаций на кот-оу нужно отобразить пользователю
   */
    setPage(page) {
      let value = this.search
        ? this.filteredData.length
        : this.table.value.length;
      this.table.page = page;
      this.pagination = this.paginator(value, page);
    },
         /**
   * Подсветка активной кнопки пагинаций
   */
    checkActivePage(page) {
      if (page == this.table.page) {
        return "active";
      }
    },
         /**
   * Возвращает преобразованные данные для пагинаций
   * @param {*} array - то что нужно преобразовать
   */
    paginate(array) {
      return _.slice(
        array,
        this.pagination.startIndex,
        this.pagination.endIndex + 1
      );
    },
         /**
   * Элемент пагинаций. Возвращает данные для пользовательской навигаций
   * @param {*} totalItems - общее количество элементов
   * @param {*} currentPage - активная страница
   */
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
           /**
   * Стилизация заголовков
   */
    setCustomHeaders() {
      return this.table.options[0];
    },
    setCustomTdEven() {
      return this.table.options[1];
    },
    setCustomTdOdd() {
      return this.table.options[2];
    },
           /**
   * Очистка таблицы
   * @param {*} index - индекс очищаемой таблицы
   */
    cleanTable(index) {
      this.pagination = this.paginator(this.table.value.length, 1);
      this.CLEAN_TABLE(index);
      this.filteredData.length = 0;
      this.search = "";
    },
           /**
   * Удаляем таблицу
   * @param {*} index - индекс удалемой таблицы
   */
    removeTable(index) {
      this.REMOVE_TABLE(index);
    },
           /**
   * Добавление новой пустой строки в таблицу
   * @param {*} indexTable - индекс таблицы в которую добавляется строка
   * @param {*} indexRow - номер строки после которой доб-ся строка
   */
    addRow(indexTable, indexRow) {
      let indexesEl = {
        indexTable: indexTable,
        indexRow: indexRow,
        page: this.table.page,
        headers: this.table.rows
      };
      this.ADD_ROW(indexesEl);
      this.setPage(indexesEl.page);
    },
        /**
   * Сортировка столбца таблицы
   * @param {*} indexCol - индекс столбца
   * @param {*} header - заголовок сортируемого столбца
   */
    sortTable(indexCol, header) {
      if (header == "Actions") {
        return;
      }
      let data = {
        index: indexCol,
        tableIndex: this.tableIndex,
        header: header
      };
      this.SORT_TABLE(data);
    },
         /**
   * Фильтрация таблицы
   * @param {*} value - данные, которые фильтруются
   */
    filteredTable(value) {
      let s = this.search.toLowerCase();
      let forSeach = value;
      let m = forSeach.filter(n =>
        Object.values(n).some(m =>
          m
            .toString()
            .toLowerCase()
            .includes(s)
        )
      );
      this.filteredData = m.slice();
      this.setPage(1);
      return this.collection();
    }
  },
  mounted() {
    this.setPage(1);
  }
};
