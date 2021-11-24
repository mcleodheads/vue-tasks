<template>
  <div class="wrapper" @click.stop>
    <button class="btn-decline btn" @click="close">X</button>
  </div>
</template>

<script>
export default {
  data() {
    return {};
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
  methods: {
  },
  mounted() {
    if (this.field && this.header) {
      const { dispatch } = this.$store;
      const { header } = this;
      const { id } = this.field;
      console.log(id);
      dispatch('tableData/getDataById', { name: header, id });
    }
  },
};
</script>

<style scoped>
.wrapper {
  background-color: #fcfcfc;
  width: 85%;
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
</style>
