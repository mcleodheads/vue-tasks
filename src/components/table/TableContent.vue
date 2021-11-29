<template>
  <div class="table-wrapper" v-if="!tableIsLoading">
    <vue-good-table
      :columns="Object
      .values(this.tableDataHeaders[0])
      .map((header) => {
      return {
      label: $t(header),
      field: header,
      thClass: 'custom-th-class',
      tdClass: 'custom-td-class',
      }})"
      :rows="[...this.tableDataItems]"
      :sort-options="{enabled: false}"
      :search-options="{enabled: false}">
      <template #table-row="props">
        <div
          @click="modalOpen(props.row)"
          v-if="props.row[props.column.field]"
          class="inner-cell">
          {{ props.row[props.column.field]?.name || props.row[props.column.field] }}
        </div>
      </template>
    </vue-good-table>
  </div>
</template>

<script>
import { VueGoodTable } from 'vue-good-table-next';

export default {
  data() {
    return {
      dataObj: {},
    };
  },
  props: {
    categoryHeader: {
      type: String,
      required: true,
    },
  },
  components: {
    VueGoodTable,
  },
  watch: {
    categoryHeader(val) {
      const { dispatch } = this.$store;
      dispatch('tableData/getCategoriesValues', {
        name: val,
      });
    },
  },
  mounted() {
    console.log(this.tableDataValues);
    const { dispatch } = this.$store;
    dispatch('tableData/getCategoriesValues', {
      name: this.categoryHeader,
    });
  },
  computed: {
    tableDataValues() {
      return this.$store.state.tableData.configCategories;
    },
    tableDataHeaders() {
      const { categoryHeader } = this;
      return this.$store.state.tableData.configCategories.dictionaries
        .filter((category) => category.name === categoryHeader)
        .map((item) => item.columns
          .map((head) => head.name));
    },
    tableDataItems() {
      return this.$store.state.tableData.searchingResults;
    },
    tableDataTypes() {
      const { categoryHeader } = this;
      return this.$store.state.tableData.configCategories.dictionaries
        .filter((category) => category.name === categoryHeader)
        .map((item) => item.columns);
    },
    tableIsLoading() {
      return this.$store.state.tableData.isLoading;
    },
  },
  methods: {
    modalOpen() {
      this.dataObj = this.tableDataTypes;
      this.$emit('modal-open', this.dataObj[0]);
    },

  },
  emits: {
    'data-obj': null,
  },
};
</script>

<style>
.custom-th-class {
  color: #1a202c;
}

.custom-td-class {
  min-width: 200px;
  text-align: center;
  color: #2c3e50;
}

.vgt-input {
  padding: 5px;
  border-radius: 3px;
  border: 1px solid #c4c4c4;
}

.table-wrapper {
  padding: 10px;
  margin-top: 10rem;
}

table {
  width: 100%;
  margin-top: 3rem;
}

td {
  border: 1px solid #c4c4c4;
  background-color: #fcfcfc;
  cursor: pointer;
}

.inner-cell {
  flex: 1;
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 5px;
}

</style>
