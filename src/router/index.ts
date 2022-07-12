import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Home",
      component: HomeView
    },
    {
      path: "/category",
      name: "Category",
      component: () => import(/* webpackChunkName: "category" */ '../views/CategoryView.vue')
    },
    {
      path: "/category-detail/:id",
      name: "CategoryDetail",
      component: () => import(/* webpackChunkName: "category" */ '../views/CategoryDetailView.vue')
    },
    {
      path: "/mv",
      name: "MV",
      component: () => import(/* webpackChunkName: "category" */ '../views/MVView.vue')
    },
    {
      path: "/top-100",
      name: "TOP100",
      component: () => import(/* webpackChunkName: "category" */ '../views/TOP100View.vue')
    },
    {
      path: "/playlist/:id",
      name: "Playlist",
      component: () => import(/* webpackChunkName: "playlist" */ '../views/PlaylistView.vue')
    },
    {
      path: "/:pathMatch(.*)*",
      name: "NotFound",
      component: () => import(/* webpackChunkName: "playlist" */ '../views/404.vue')
    }
  ],
});

export default router;
