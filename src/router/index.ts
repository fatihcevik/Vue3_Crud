import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import("../components/Home.vue"),
    },
    {
      path: '/home',
      name: 'home',
      component: () => import("../components/Home.vue"),
    },
    {
      path: "/login",
      name: 'login',
      component: () => import("../components/Login.vue"),
    },
    {
      path: "/register",
      name: 'register',
      component: () => import("../components/Register.vue"),
    },
    {
      path: "/manageusers",
      name: 'manageusers',
      component: () => import("../components/ManageUsers.vue"),
    },
    {
      path: "/users/:id",
      name: "user-details",
      component: () => import("../components/UserDetails.vue"),
    },
    {
      path: "/profile",
      name: 'profile',
      component: () => import("../components/Profile.vue"),
    },
    {
      path: "/",
      alias: "/tutorials",
      name: "tutorials",
      component: () => import("../components/TutorialList.vue"),
    },
    {
      path: "/tutorials/:id",
      name: "tutorial-details",
      component: () => import("../components/TutorialDetails.vue"),
    },
    {
      path: "/add",
      name: "add",
      component: () => import("../components/AddTutorial.vue"),
    }
  ]
})

router.beforeEach((to, from, next) => {
  const publicPages = ['/login', '/register', '/home'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('user');

  // trying to access a restricted page + not logged in
  // redirect to login page
  if (authRequired && !loggedIn) {
    next('/login');
  } else {
    next();
  }
});

export default router
