<template>
    <table class="table-bordered">
      <thead class="table-header">
      <tr
        v-bind:key="items"
        v-for="items in tableDataHeaders"
        class="table-header-row">
        <td
          v-for="item in items"
          v-bind:key="item"
          class="table-header-cell">
          {{item}}
        </td>
      </tr>
      </thead>
      <tbody>
        <tr
          v-bind:key="items"
          v-for="items in tableDataItems"
        >
          <td
            v-for="item in items"
            v-bind:key="item"
          >
            {{ item?.name || item }}
          </td>
        </tr>
      </tbody>
    </table>
</template>

<script>
export default {
  data() {
    return {
    };
  },
  props: {
    categoryHeader: {
      type: String,
      required: true,
    },
  },
  watch: {
    categoryHeader(val) {
      const { dispatch } = this.$store;
      dispatch('tableData/getCategoriesValues', {
        name: val,
      });
    },
  },
  computed: {
    tableDataValues() {
      return this.$store.state.tableData.configCategories;
    },
    tableDataHeaders() {
      const { categoryHeader } = this;
      return this.$store.state.tableData.configCategories
        .filter((category) => category.name === categoryHeader)
        .map((item) => item.columns
          .map((head) => head.displayNameKey));
    },
    tableDataItems() {
      console.log(this.$store.state.tableData.searchingResults);
      return this.$store.state.tableData.searchingResults;
    },
  },
  methods: {
  },
};
</script>

<style scoped>
.table-bordered {
  margin-top: 10rem;
  width: 100vw;
  z-index: 2;
}

.table-header {
  font-weight: 600;
}

.table-header-row {
}

.table-header-cell {
  min-width: 250px;
  text-align: center;
}

</style>
