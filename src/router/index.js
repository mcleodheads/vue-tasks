import { createRouter, createWebHistory } from 'vue-router';
import {
  getLocale, loadLocaleMessages, setI18nLanguage, SUPPORT_LOCALES,
} from '../i18n';

export function setupRouter(i18n) {
  const locale = getLocale(i18n);

  const routes = [
    {
      path: '/:locale/',
      name: 'Authorization',
      component: () => import('../views/Authorization.vue'),
    },
    {
      path: '/:locale/table',
      name: 'Table',
      component: () => import('../views/Table.vue'),
    },
    {
      path: '/:locale/home',
      name: 'Home',
      component: () => import('../views/Home.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: () => `/${locale}`,
    },
  ];

  const router = createRouter({
    history: createWebHistory(),
    routes,
  });

  // eslint-disable-next-line consistent-return
  router.beforeEach(async (to) => {
    const paramsLocale = `${to.params.locale}`;
    if (!SUPPORT_LOCALES.includes(paramsLocale)) {
      return `/${locale}`;
    }
    if (!i18n.global.availableLocales.includes(paramsLocale)) {
      await loadLocaleMessages(i18n, paramsLocale);
    }

    setI18nLanguage(i18n, paramsLocale);
  });

  return router;
}

export default setupRouter;
