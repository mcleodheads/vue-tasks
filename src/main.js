import { createApp } from 'vue';
import { createI18n } from 'vue-i18n';
import axios from 'axios';

import App from './App.vue';
import router from './router';
import store from './store';
import localization from './store/localization';

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import FontAwesomeIcon from './plugins/font-awesome';

export const i18n = createI18n({
  locale: localization.state.chosenLanguage,
  messages: localization.state.localizationLib,
});

const loadedLanguages = [];

function setI18nLanguage(lang) {
  i18n.locale = lang;
  axios.defaults.headers.common['Accept-Language'] = lang;
  document.querySelector('html').setAttribute('lang', lang);
  return lang;
}

export function loadLanguageAsync(lang) {
  if (loadedLanguages.includes(lang)) {
    if (i18n.locale !== lang) setI18nLanguage(lang);
    return Promise.resolve();
  }
  return axios.get(`/api/translation/GetForLangType/${lang}`).then((response) => {
    const res = response.data;
    loadedLanguages.push(lang);
    i18n.message = res;
    setI18nLanguage(lang);
  });
}

createApp(App)
  .use(store)
  .use(i18n)
  .use(router)
  .component('font-awesome-icon', FontAwesomeIcon)
  .mount('#app');

// router.js
router.beforeEach((to, from, next) => {
  loadLanguageAsync(localization.state.chosenLanguage).then(() => next());
});
