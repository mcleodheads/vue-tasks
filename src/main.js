import axios from 'axios';
import { createApp } from 'vue';
import { createI18n } from 'vue-i18n';
import App from './App.vue';
import router from './router';
import store from './store';

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import FontAwesomeIcon from './plugins/font-awesome';

const i18n = createI18n({
  locale: 'en',
  messages: async () => {
    const response = await axios.get('/api/translation/GetForLangType/en');
    return response.data;
  },
});

createApp(App)
  .use(store)
  .use(i18n)
  .use(router)
  .component('font-awesome-icon', FontAwesomeIcon)
  .mount('#app');
