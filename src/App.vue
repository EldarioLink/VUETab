<template>
  <div id="app">
    <button @click.prevent="showTab" class="btn_add_table">Добавить таблицу</button>

    <addtable v-if="showModal"></addtable>
  </div>
</template>

<script>
  import {
    mapGetters
  } from 'vuex'

  export default {
    name: 'app',
    data() {
      return {
        showModal: false,
      };
    },
    methods: {
      showTab() {
        this.showModal = !this.showModal
      }
    }
  }
</script>

<style>
  .btn_add_table {
    border: 0px solid black;
    width: 10%;
    height: 5%;
    border-radius: 5px;
    line-height: 30px;
    box-sizing: border-box;
    margin-bottom: 20px;
  }
</style>
