const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", name: 'inicio', component: () => import("pages/IndexPage.vue") },
      { path: "/persona/crear", component: () => import("src/pages/PersonaStore.vue") },
      { path: "/personas/show", component: () => import("src/pages/PersonaShow.vue") },
    ],
  },
  {
    path: '/login',
    component: () => import('pages/Login.vue'),
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
