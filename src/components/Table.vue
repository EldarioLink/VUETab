<template>
    <div class="hello">
        <div  class="parent_table">
            <div class="div_for_align_boxes">
                <table border="1" class="table">
                    <tr >
                        <td class="static_headers" v-for="(header,i) in headers" :key="i">{{ header }} </td>
                    </tr>
                    <tr  v-for="(obj,i) in collection" :key="i">
                        <td class="table_boxes" v-for="(props,i) in data(obj)" :key="i">{{ props }}</td>
                        <td class="no-wrap-section">
                            <close-icon/>
                            <up-icon/>
                            <down-icon/>
                        </td>
                    </tr>
                </table>
            </div>
            <div class="table_all_controls">
                <div class="table_btn_controls">
                    <!-- <button>Удалить таблицу</button>
                    <button @click="cleanTable">Очистить таблицу</button>
                    <button id="show-modal" @click="saveJson = true">Получить таблицу</button> -->
                </div>

                <div  class="pagination_controls">
                    <button v-for="p in pagination.pages" :key="p.id" @click.prevent="setPage(p)">{{ p }}</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script src="./Table.js">

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .table {
        width: 80%;
        border-collapse: collapse;
        border: 1px solid gray;
    }

    .div_for_align_boxes {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .static_headers,
    .table_boxes {
        padding: 10px;
        text-align: center;
    }

    .table_all_controls {
        margin-top: 30px;
        display: flex;
        justify-content: space-around;
    }

    .no-wrap-section {
        white-space: nowrap;
        text-align: center;
    }

    .customize-headers {
        background: #FF0;
    }

    .td-even:nth-child(even) {
        background: #CCC;
    }

    .td-odd:nth-child(odd) {
        background: #FFF;
    }
</style>
