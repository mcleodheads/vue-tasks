<template>
  <div class="wrapper" @click.stop>
    <div class="data-container">
      <div class="data-sets" v-for="set in field" v-bind:key="set.name">
        <!--        TUT DOLJEN BIT SWITCH CASE ANALOG-->
        <modal-actions>
          <template #input>
            <div class="single-set">
              {{ set.name }}
              <span class="set-action" v-if="set.type === 'Text'">
                <input type="text" :placeholder=set.name>
              </span>
              <span class="set-action" v-if="set.type === 'Integer' || set.type === 'Number'">
                <input type="number" :placeholder=set.name>
              </span>
              <span class="set-action" v-if="set.type === 'Select' || set.type === 'Enum'">
                <select id="da">
                  <option value="da">da</option>
                </select>
              </span>
              <span class="set-action" v-if="set.type === 'Boolean'">
                <input type="checkbox" :checked="set.name">
              </span>
              <span class="set-action" v-if="set.type === 'Date'">
                <input type="date">
              </span>
            </div>
          </template>
        </modal-actions>
      </div>
    </div>
    <div class="button-actions">
      <button class="btn-decline btn" @click="close">X</button>
    </div>
  </div>
</template>

<script>
import ModalActions from './ModalActions.vue';

export default {
  data() {
    return {};
  },
  components: {
    ModalActions,
  },
  props: {
    close: {
      type: Function,
      required: true,
    },
    field: {
      type: Object,
      required: true,
    },
    header: {
      type: String,
      required: true,
    },
  },
  methods: {},
  mounted() {
  },
  computed: {
    modalDataSet() {
      return this.$store.state.tableData.modalData.data;
    },
  },
};
</script>

<style scoped>
.wrapper {
  background-color: #fcfcfc;
  width: 95%;
  height: fit-content;
  min-height: 250px;
  box-shadow: 0 0 2px #1a202c;
  border-radius: 3px;
  position: fixed;
  z-index: 10;
  left: 50%;
  right: 50%;
  top: 45%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;
  padding: 15px;
}

.btn {
  outline: none;
  border: none;
  border-radius: 50%;
  margin: 5px;
  font-weight: 700;
}

.btn:hover {
  background-color: #e8e8e8;
  box-shadow: 0 0 2px #4c4c4c;
  transition: 0.2s;
}

.btn-decline {
  border: 1px solid;
}

.data-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}

.data-sets {
  padding: 5px;
}

.single-set {
  display: grid;
  grid-template-columns: 1fr 1fr;
}

.set-action {
}

.button-actions {

}

</style>
