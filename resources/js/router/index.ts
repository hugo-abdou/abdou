import { setupLayouts } from "virtual:generated-layouts";
import { createRouter, createWebHistory } from "vue-router";
import routes from "~pages";
import store from '../store'



const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [...setupLayouts(routes)],
    scrollBehavior() {
        return { top: 0 };
    }
});

// Docs: https://router.vuejs.org/guide/advanced/navigation-guards.html#global-before-guards
router.beforeEach(async (to) => {

    const isLoggedIn = await store.dispatch('isUserLoggedIn');

    if (to.meta.redirectIfNotLoggedIn && !isLoggedIn) {
        return { name: "login", query: { to: to.name !== "index" ? to.fullPath : undefined } }
    }


    // if (canNavigate(to)) {
    //     console.log(to.meta.redirectIfLoggedIn && isLoggedIn)
    //     if (to.meta.redirectIfLoggedIn && isLoggedIn) return "/";
    // } else {
    //     if (isLoggedIn) return { name: "not-authorized" };
    //     else return { name: "login", query: { to: to.name !== "index" ? to.fullPath : undefined } };
    // }
});
export default router;
