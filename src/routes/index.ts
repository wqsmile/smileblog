import { createRouter, createWebHashHistory } from "vue-router";
import routes from "./routes";
import { whoami } from "@/api/user";

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!whoami()) {
      next({
        path: "/login",
      });
    }
  }
  next();
});

export default router;
