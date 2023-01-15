import { setupLayouts } from "virtual:generated-layouts";
import { createRouter, createWebHistory } from "vue-router";
import routes from "~pages";
import { canNavigate } from "@layouts/plugins/casl";
import { isUserLoggedIn } from "./utils";


console.log(routes)
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [...setupLayouts(routes)],
    scrollBehavior() {
        return { top: 0 };
    }
});

// Docs: https://router.vuejs.org/guide/advanced/navigation-guards.html#global-before-guards
router.beforeEach((to) => {
    const isLoggedIn = isUserLoggedIn();

    if (canNavigate(to)) {
        if (to.meta.redirectIfLoggedIn && isLoggedIn) return "/";
    } else {
        if (isLoggedIn) return { name: "not-authorized" };
        else return { name: "login", query: { to: to.name !== "index" ? to.fullPath : undefined } };
    }
});
export default router;
