import type { Router } from "vue-router";

export const authMiddleware = (router: Router) => {
    router.beforeEach((to, from, next) => {
        const isAuthenticated = !!localStorage.getItem("token");
        if (to.matched.some(record => record.meta.requiresAuth)) {
            if (!isAuthenticated) {
                next({
                    path: '/login',
                    query: { redirect: to.fullPath }
                });
            } else {
                next();
            }
        }else if (to.matched.some(record => record.meta.guest)) {
            if (isAuthenticated) {
                next({
                    path: '/menu',
                    query: { redirect: to.fullPath }
                });
            } else {
                next();
            }
        }else {
            next();
        }
    });
}