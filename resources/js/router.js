import Vue from 'vue';
import VueRouter from 'vue-router';

import store from './store';
import NotFound from './views/NotFound';
import Welcome from './views/Welcome';
import Home from './views/Home';
import Register from './views/auth/Register';
import Login from './views/auth/Login';
import PasswordEmail from './views/auth/passwords/Email';
import PasswordReset from './views/auth/passwords/Reset';

Vue.use(VueRouter);

const router = new VueRouter({
    mode: 'history',

    linkActiveClass: 'font-bold',

    routes: [
        {
            path: '*',
            component: NotFound
        },

        {
            path: '/',
            component: Welcome
        },

        {
            path: '/home',
            component: Home,
            meta: {
                requiresAuth: true,
            },
        },

        {
            path: '/register',
            component: Register,
            meta: {
                guest: true,
            },
        },

        {
            path: '/login',
            component: Login,
            meta: {
                guest: true,
            },
        },

        {
            path: '/password/email',
            component: PasswordEmail,
            meta: {
                guest: true,
            },
        },

        {
            path: '/password/reset/:token',
            component: PasswordReset,
            meta: {
                guest: true,
            },
        },
    ]
});

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!store.state.auth.isAuth) {
            next({
                path: '/login',
                query: { redirect: to.fullPath }
            });
        } else {
            next();
        }
    } else if (to.matched.some(record => record.meta.guest)) {
        if (store.state.auth.isAuth) {
            next({ path: '/home' });
        } else {
            next();
        }
    } else {
        next();
    }
});

export default router;
