<template>
  <div class="modal-mask">
    <div class="modal-wrapper">
      <div class="modal-container">
        <span v-on:click="closePopup" class="closeBtn">&times;</span>
        <p>
          Название заголовков (через запятую):
        </p>
        <input v-model="headers" class="inp" type="text">

        <p>
          Количество строк в таблице (через запятую):
        </p>
        <input v-model="rows" class="inp" type="text">
        <p>
          Стилизация строки заголовка, четной и нечетной строки (через запятую):
        </p>
        <input v-model="css_table" class="inp" type="text">
        <button class="modal-default-button" @click="checkInputs">
                             Добавить
                            </button>
      </div>
    </div>
  </div>
</template>

<script src="./addTable.js">

</script>

  <!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  p {
    font-size: 10pt;
    color: black;
  }

  .inp {
    width: 80%;
    line-height: 25px;
    border-radius: 5px;
  }

  .modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: table;
    transition: opacity 0.3s ease;
  }

  .modal-wrapper {
    display: table-cell;
    vertical-align: middle;
  }

  .modal-container {
    width: 500px;
    margin: 0px auto;
    padding: 20px 30px;
    background-color: #fff;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
    transition: all 0.3s ease;
    font-family: Helvetica, Arial, sans-serif;
    border-radius: 5px;
  }

  .modal-default-button {
    float: right;
    height: 30px;
  }

  .modal-enter .modal-container,
  .modal-leave-active .modal-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
  }

  .closeBtn {
    float: right;
    font-size: 25px;
    cursor: pointer;
  }
</style>

