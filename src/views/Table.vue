<template>
  <div class="table-content-wrapper">
    <div class="selector-wrapper">
      <table-category-selector
        :categoryHeader="categoryHeader"
        @category-selector="categoryHandler"/>
    </div>
    <table-content
      @modal-open="modalOpen"
      v-if="categoryHeader !== ''"
      :categoryHeader="categoryHeader"
    />
  </div>
  <div v-if="isModalOpen">
    <table-modal :header="categoryHeader" :field="field" :close="close" ></table-modal>
  </div>
</template>

<script >
import TableContent from '../components/table/TableContent.vue';
import TableCategorySelector from '../components/table/TableCategorySelector.vue';
import TableModal from '../components/table/TableModal.vue';

export default {
  data() {
    return {
      categoryHeader: '',
      isModalOpen: false,
      field: {},
    };
  },
  methods: {
    categoryHandler(value) {
      this.categoryHeader = value;
      console.log(this.categoryHeader);
    },
    modalOpen(item) {
      this.$emit('modal-open', item);
      this.isModalOpen = true;
      this.field = item;
    },
    close() {
      this.isModalOpen = false;
    },
  },
  components: {
    TableContent,
    TableCategorySelector,
    TableModal,
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
