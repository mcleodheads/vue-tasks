<template>
  <select class="selector" @change="categoryHandler" >
    <option value="null">Chose type</option>
    <option v-bind:key="category.name" v-for="category in configCategories">
      {{category.name}}
    </option>
  </select>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {

  },
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
}
</style>
