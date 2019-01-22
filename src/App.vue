<template>
  <div id="app">
    <button @click.prevent="showTab" class="btn_add_table">Добавить таблицу</button>

    <addtable @close="showTab" v-if="showModal"></addtable>
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
        getStaticHeaders: 'static_headers',
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
    border-radius: 5px;
    line-height: 30px;
    box-sizing: border-box;
    margin-bottom: 20px;
  }
  .tables{
    margin-top: 40px
  }
</style>
