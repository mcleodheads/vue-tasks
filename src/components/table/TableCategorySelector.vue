<template>
  <select class="selector" @change="categoryHandler" v-model="currentHeader">
    <option selected class="empty-option" disabled>{{$t('Permission.FieldsSettings')}}</option>
    <option
      :key="category.name"
      class="option"
      :value="category.name"
      v-for="category in configCategories.dictionaries">
      {{$t(category.name)}}
    </option>
  </select>
</template>

<script>
export default {
  data() {
    return {
      currentHeader: '',
    };
  },
  computed: {
    configCategories() {
      return this.$store.state.tableData.configCategories;
    },
    tableDataHeaders() {
      return this.$store.state.tableData.configCategories.dictionaries;
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
  mounted() {
    const { dispatch } = this.$store;
    dispatch('tableData/getConfigCategories');
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
