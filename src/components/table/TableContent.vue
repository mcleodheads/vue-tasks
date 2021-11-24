<template>
  <div class="table-wrapper">
    <vue-good-table
      :columns="Object
      .values(this.tableDataHeaders[0])
      .map((header) => ({ label: header, field: header }))"
      :rows="this.tableDataItems
      || this.tableDataHeaders[0].map((header) => this.tableDataItems
      .map((item) => item[header]))"
      v-on:row-click="modalOpen()"
      :search-options="{ enabled: true }"
      :sort-options="{ enabled: false }"
      :line-numbers="true"
    />
  </div>
</template>

<script>
import { VueGoodTable } from 'vue-good-table-next';

export default {
  data() {
    return {};
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
  },
  methods: {
    modalOpen(item) {
      this.$emit('modal-open', item);
      console.log(item);
    },
  },
};
</script>

<style>
.table-wrapper {
  margin-top: 10rem;
}

table {
  width: 100%;
  margin-top: 3rem;
}
td {
  border: 1px solid #d0d0d0;
  padding: 10px;
}
.vgt-left-align {
  cursor: pointer;
}
</style>
