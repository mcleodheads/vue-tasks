import { createRouter, createWebHistory } from 'vue-router';
import {
  getLocale, loadLocaleMessages, setI18nLanguage, SUPPORT_LOCALES,
} from '../i18n';

export function setupRouter(i18n) {
  const locale = getLocale(i18n);

  const routes = [
    {
      path: '/',
      name: 'Authorization',
      component: () => import('../views/Authorization.vue'),
    },
    {
      path: '/:locale/table',
      name: 'Table',
      component: () => import('../views/Table.vue'),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/:locale/home',
      name: 'Home',
      component: () => import('../views/Home.vue'),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: () => `/${locale}`,
      meta: {
        requiresAuth: true,
      },
    },
  ];

  const router = createRouter({
    history: createWebHistory(),
    routes,
  });

  // eslint-disable-next-line consistent-return
  router.beforeEach(async (to, from, next) => {
    const paramsLocale = `${to.params.locale}`;
    const publicPages = ['/'];
    const authPages = !publicPages.includes(to.path);
    const loggedIn = localStorage.getItem('token');
    if (authPages && !loggedIn) {
      next('/');
    } else {
      next();
    }
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

// const routes = [
//   {
//     path: '/',
//     name: 'Authorization',
//     component: () => import('../views/Authorization.vue'),
//   },
//   {
//     path: '/table',
//     name: 'Table',
//     component: () => import('../views/Table.vue'),
//   },
// ];
//
// const router = createRouter({
//   history: createWebHistory(process.env.BASE_URL),
//   routes,
// });
//
// router.beforeEach((to, from, next) => {
//   console.log(localization.state.chosenLanguage);
//   loadLanguageAsync(localization.state.chosenLanguage).then(() => next());
// });
//
// router.beforeEach((to, from, next) => {
//   const publicPages = ['/'];
//   const authPages = !publicPages.includes(to.path);
//   const loggedIn = localStorage.getItem('token');
//   if (authPages && !loggedIn) {
//     next('/');
//   } else {
//     next();
//   }
// });
//
// export default router;
