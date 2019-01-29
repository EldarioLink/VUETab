<template>
  <div id="app">
    <button @click.prevent="showTab" class="btn_add_table">Добавить таблицу</button>
    <add-table @close="showTab" v-if="showModal"></add-table>
    <tab class="tables" v-for="(table, index) in tables" :table="table" :tableIndex="index" :key="index"></tab>
    <div class="vld-parent">
      <loading :active.sync="isLoading"></loading>
    </div>
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
      },

    },
    computed: {
      ...mapGetters({
        tables: 'getTables',
        Loading: 'getisLoading',
      }),
      isLoading() {
        return this.Loading
      }
    },
  }
</script>

<style>
  .btn_add_table {
    border: 0px solid black;
    width: 10%;
    height: 5%;
    line-height: 30px;
  }

  .tables {
    margin-top: 70px
  }
</style>
