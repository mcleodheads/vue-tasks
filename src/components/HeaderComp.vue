<template>
  <div id="nav" v-if="isAuth">
    <router-link to="/table">Table</router-link>
    <div class="header-right-side">
      <div class="switch-container">
        <Switch checked :onChange="languageChange"/>
      </div>
      <router-link to="#" v-on:click="handleLogout">Logout</router-link>
    </div>
  </div>
</template>

<script>
import router from '../router';
import Switch from './Switch.vue';

export default {
  components: { Switch },
  data() {
    return {
    };
  },
  methods: {
    handleLogout(e) {
      e.preventDefault();
      const { dispatch } = this.$store;
      dispatch('authentication/logout');
      router.push('/');
    },
    languageChange($event) {
      this.$emit('update:checked', $event.target.checked);
      console.log($event.target.checked);
    },
  },
  computed: {
    isAuth() {
      return this.$store.state.authentication.isAuth;
    },
  },
};
</script>

<style scoped>
#nav {
  padding: 30px;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #e8e8e8;
  position: fixed;
  left: 0;
  right: 0;
  z-index: 3;
  background-color: #ffffff;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.switch-container {
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
}

.header-right-side {
  display: flex;
  flex-direction: row;
}
</style>
