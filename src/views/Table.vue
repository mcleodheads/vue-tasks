<template>
  <div class="table-content-wrapper">
    <div class="selector-wrapper">
      <category-selector @category-selector="categoryHandler"/>
    </div>
    <table-content v-if="categoryHeader !== ''" :categoryHeader="categoryHeader"/>
  </div>
</template>

<script >
import TableContent from '../components/table/TableContent.vue';
import CategorySelector from '../components/table/CategorySelector.vue';

export default {
  data() {
    return {
      categoryHeader: '',
    };
  },
  methods: {
    categoryHandler(value) {
      this.categoryHeader = value;
    },
  },
  components: {
    TableContent,
    CategorySelector,
  },
};
</script>

<style scoped>
.table-content-wrapper {
  display: flex;
  justify-content: center;
  flex-direction: column;
}
.selector-wrapper {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
</style>
