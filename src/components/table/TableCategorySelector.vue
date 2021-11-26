<template>
  <select class="selector" @change="categoryHandler" >
    <option selected class="empty-option" disabled>Chose category</option>
    <option
      v-bind:key="category.name"
      class="option"
      v-for="category in configCategories.dictionaries">
      {{category.name}}
    </option>
  </select>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {},
  mounted() {
    const { dispatch } = this.$store;
    dispatch('tableData/getConfigCategories');
  },
  computed: {
    configCategories() {
      return this.$store.state.tableData.configCategories;
    },
  },
  emits: {
    'category-selector': (value) => typeof value === 'string' && value.length > 0,
  },
  methods: {
    categoryHandler($event) {
      this.$emit('category-selector', $event.target.value);
    },
  },
};

</script>

<style scoped>
.selector {
  margin-top: 15rem;
  margin-right: 1rem;
  position: fixed;
  z-index: 5;
  width: fit-content;
  background: #ffffff;
  padding: 5px;
  border-radius: 3px;
  border: 1px solid #c4c4c4;
}

.empty-option {
  color: #8b8b8b;
}

.option {
  color: #1a202c;
}
</style>
