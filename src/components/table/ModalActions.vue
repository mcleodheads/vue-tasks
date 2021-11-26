<template>
  <div class="single-set">
    {{ set.name }}
    <span class="set-action" v-if="set.type === 'Text'">
      <input class="def-input" type="text" :placeholder=set.name>
    </span>
    <span class="set-action" v-if="set.type === 'Integer' || set.type === 'Number'">
      <input class="def-input" type="number" :placeholder=set.name>
    </span>
    <span class="set-action" v-if="set.type === 'Select' || set.type === 'Enum'">
      <select  id="da" class="set-dropdown def-input">
        <option value="da">data item</option>
      </select>
    </span>
    <span class="set-action" v-if="set.type === 'Boolean'">
      <input class="def-input" type="checkbox" :checked="set.name">
    </span>
    <span class="set-action" v-if="set.type === 'Time'">
      <input class="def-input" type="time">
    </span>
    <span class="set-action" v-if="set.type === 'Date'">
      <input class="def-input" type="date">
    </span>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    set: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style>
.single-set {
  display: grid;
  grid-template-columns: 1fr 1fr;
}

.def-input {
  border: 1px solid #c4c4c4;
  padding: 5px;
  border-radius: 3px;
}

.set-action {
}

.set-dropdown {
  width: 100%;
}
</style>
