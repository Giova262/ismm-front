const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", name: 'index', component: () => import("pages/IndexPage.vue") },
      { path: "/persona/crear", name: 'crear', component: () => import("src/pages/PersonaStore.vue") },
      { path: "/personas/show", name: 'show', component: () => import("src/pages/PersonaShow.vue") },
      { path: "/personas/edit", name: 'edit', component: () => import("src/pages/PersonaEdit.vue") },
      { path: "/personas/show/revision", name: 'revision', component: () => import("src/pages/PersonaShowRevision.vue") },
      { path: "/personas/details", name: 'details', component: () => import("src/pages/PersonaDetails.vue") },
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
