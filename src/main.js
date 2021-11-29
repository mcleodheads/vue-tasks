import { createApp } from 'vue';
// import { createI18n, I18n } from 'vue-i18n';
// import axios from 'axios';
import App from './App.vue';
// import router from './router';
// eslint-disable-next-line import/no-cycle
import store from './store';
// eslint-disable-next-line import/no-named-as-default
import setupRouter from './router';

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import FontAwesomeIcon from './plugins/font-awesome';
import { setupI18n } from './i18n';

const i18n = setupI18n({
  locale: 'en',
  fallbackLocale: 'en',
  messages: {},
});
const router = setupRouter(i18n);

createApp(App)
  .use(store)
  .use(i18n)
  .use(router)
  .component('font-awesome-icon', FontAwesomeIcon)
  .mount('#app');

export default router;
