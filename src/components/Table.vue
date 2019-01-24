<template>
    <div>
        <div class="parent_table">
            <div class="div_for_align_boxes">
                <table class="table" border="1">

                    <tr :class="setCustomHeaders()">
                        <td class="static_headers" v-for="(header,indexTable) in table.rows" :key="indexTable">{{ header }} </td>
                    </tr>
                    <tr :class="[setCustomTdEven(), setCustomTdOdd() ]" v-for="(obj,b) in collection(table.value)" :key="b">

                        <td class="table_boxes" v-for="(props,i) in parse(obj)" :key="i">
                            {{ props}}
                        </td>

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
                    <button @click="removeTable(tableIndex)">Удалить таблицу</button>
                    <button @click="cleanTable(tableIndex)">Очистить таблицу</button>
                    <button id="show-modal" @click="saveTab = true">Получить таблицу</button>
                </div>
                <div class="pagination_controls">
                    <button v-for="p in pagination.pages" :key="p.id" @click.prevent="setPage(table.value.length,p)">{{ p }}</button>
                </div>
            </div>
        </div>
        <popup v-if="saveTab" :table="this.table.value" :tableIndex="tableIndex" @close="saveTab=false"></popup>
    </div>
</template>

<script src="./Table.js">

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .parent_table {
        display: flex;
        flex-direction: column;
    }

    .table {
        width: 100%;
        border-collapse: collapse;
        border: 2px solid gray;
    }

    .div_for_align_boxes {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .static_headers,
    .table_boxes {
        padding: 10px;
        text-align: center;
        border: 2px solid gray;
    }

    .table_all_controls {
        margin-top: 40px;
        align-items: flex-end;
        display: flex;
        justify-content: space-around;
    }

    .no-wrap-section {
        white-space: nowrap;
        text-align: center;
        padding: 10px;
        text-align: center;
        border: 2px solid gray;
    }

    .customize-headers {
        background: #FFFFCC;
    }

    .td-even:nth-child(even) {
        background: #99FF99;
    }

    .td-odd:nth-child(odd) {
        background: #CCFFFF;
    }
</style>
