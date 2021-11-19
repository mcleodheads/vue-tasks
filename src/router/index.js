import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'Authorization',
    component: () => import('../views/Authorization.vue'),
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue'),
    meta: {
      requiresAuth: true,
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const publicPages = ['/'];
  const authPages = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('token');
  if (authPages && !loggedIn) {
    next('/');
  } else {
    next();
  }
});

export default router;
