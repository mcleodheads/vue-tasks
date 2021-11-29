<template>
  <div class="background" @click.stop="close">
    <div class="wrapper" @click.stop>
      <div class="container">
        <div class="data-container">
          <div class="data-sets" v-for="set in field" v-bind:key="set.name">
            <modal-actions :set="set"/>
          </div>
        </div>
        <div class="button-actions">
          <button class="btn-decline btn" @click="close">Close</button>
          <button class="btn" @click="close">Submit</button>
        </div>
      </div>
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
};
</script>

<style scoped>
.background {
  background-color: rgba(0, 0, 0, 0.6);
  width: 100vw;
  height: 100vh;
  min-height: 250px;
  box-shadow: 0 0 2px #1a202c;
  border-radius: 3px;
  position: fixed;
  z-index: 5;
  left: 50%;
  right: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.wrapper {
  background-color: #f6f6f6;
  width: 95%;
  height: fit-content;
  min-height: 250px;
  box-shadow: 0 0 2px #1a202c;
  border-radius: 3px;
  position: fixed;
  z-index: 10;
  left: 50%;
  right: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  padding: 15px;
  display: flex;
  align-items: center;
}

.container {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
}

.btn {
  outline: none;
  border: none;
  border-radius: 10px;
  margin: 5px;
  font-weight: 700;
}

.btn:hover {
  background-color: #e8e8e8;
  box-shadow: 0 0 2px #c4c4c4;
  transition: 0.2s;
}

.btn-decline {
}

.data-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}

.data-sets {
  padding: 5px;
}

.button-actions {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
}

</style>
