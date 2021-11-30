<script>
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { ref, watch } from 'vue';

// eslint-disable-next-line import/extensions
import { SUPPORT_LOCALES } from '../i18n.js';

export default {
  setup() {
    const setupRouter = useRouter();
    const { t, locale } = useI18n();
    const currentLocale = ref(locale.value);
    watch(setupRouter.currentRoute, (route) => {
      currentLocale.value = route.params.locale;
    });

    watch(currentLocale, (val) => {
      setupRouter.push({
        name: setupRouter.currentRoute.value.name,
        params: { locale: val },
      });
    });

    return {
      t, locale, currentLocale, SUPPORT_LOCALES,
    };
  },
  methods: {
    handleLogout(e) {
      e.preventDefault();
      const { dispatch } = this.$store;
      dispatch('authentication/logout');
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

<template>
  <div id="nav" v-if="isAuth">
    <router-link :to="{ name: 'Table', params: { locale } }">Table</router-link>
    <router-link :to="{ name: 'Home', params: { locale } }">Home</router-link>
    <div class="header-right-side">
      <div class="switch-container">
        <form class="language">
          <select id="locale-select" v-model="currentLocale">
            <option
              v-for="optionLocale in SUPPORT_LOCALES"
              :key="optionLocale"
              :value="optionLocale"
            >
              {{ optionLocale }}
            </option>
          </select>
        </form>
      </div>
      <router-link to="#" v-on:click="handleLogout">
        {{ $t('exit') }}
      </router-link>
    </div>
  </div>
  <div>
  </div>
</template>

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
