<template>
  <div id="nav" v-if="isAuth">
    <router-link to="/table">Table</router-link>
    <div>
      {{$t('exit')}}
    </div>
    <div class="header-right-side">
      <div class="switch-container">
<!--        <Switch v-model="$root.$i18n.locale" checked :onChange="languageChange"/>-->
        <select @change="languageChange" v-model="$i18n.locale">
          <option value="ru">Ру</option>
          <option value="en">Eng</option>
        </select>
      </div>
      <router-link to="#" v-on:click="handleLogout">{{$t('exit')}}</router-link>
    </div>
  </div>
  <div>
  </div>
</template>

<script>
import router from '../router';

export default {
  data() {
    return {
      lang: 'en',
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
      const { dispatch } = this.$store;
      dispatch('localization/getLocalization', $event.target.value);
    },
  },
  computed: {
    isAuth() {
      return this.$store.state.authentication.isAuth;
    },
    getLanguageValue() {
      return this.$store.state.localization.chosenLanguage;
    },
  },
  mounted() {
    const { dispatch } = this.$store;
    dispatch('localization/getLocalization', this.lang);
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
