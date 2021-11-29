<template>
  <HeaderComp/>
  <router-view/>
</template>

<script>
import HeaderComp from './components/HeaderComp.vue';

export default {
  data() {
    return {};
  },
  components: {
    HeaderComp,
  },
  mounted() {
  },
};

</script>
