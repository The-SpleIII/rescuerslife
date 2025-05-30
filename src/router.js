import { createRouter, createWebHistory } from "vue-router";
import homePage from "./pages/home-page.vue";
import guidePage from "./pages/guide-page.vue";
import testPage from "./pages/test-page.vue";
import map from "./pages/map.vue";
import error from "./pages/error.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: homePage,
  },
  {
    path: "/guide",
    name: "guide",
    component: guidePage,
  },
  {
    path: "/test",
    name: "test",
    component: testPage,
  },
  {
    path: "/map",
    name: "map",
    component: map,
  },
  {
    path: "/:pathMatch(.*)*",
    name: "error",
    component: error,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
