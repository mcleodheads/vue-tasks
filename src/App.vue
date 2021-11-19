<template>
  <div id="nav">
    <router-link to="/about">About</router-link>
    <router-link to="/logout" v-on:click="handleLogout">Logout</router-link>
  </div>
  <router-view/>
</template>

<script>
import router from './router';

export default {
  methods: {
    handleLogout(e) {
      e.preventDefault();
      const { dispatch } = this.$store;
      dispatch('authentication/logout');
      router.push('/');
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
  display: flex;
  justify-content: space-between;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
