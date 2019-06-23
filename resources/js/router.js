import Vue from 'vue';
import VueRouter from 'vue-router';

import store from './store';
import NotFound from './views/NotFound.vue';
import Welcome from './views/Welcome.vue';
import Home from './views/Home.vue';
import Register from './views/auth/Register.vue';
import Login from './views/auth/Login.vue';
import PasswordEmail from './views/auth/passwords/Email.vue';
import PasswordReset from './views/auth/passwords/Reset.vue';

Vue.use(VueRouter);

const router = new VueRouter({
    mode: 'history',

    linkActiveClass: 'font-bold',

    routes: [
        {
            path: '*',
            component: NotFound,
        },

        {
            path: '/',
            component: Welcome,
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
                hideNavbar: true,
                guest: true,
            },
        },

        {
            path: '/login',
            component: Login,
            meta: {
                hideNavbar: true,
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
    ],
});

router.beforeEach(async (to, from, next) => {
    if (store.state.auth.isAuth && !store.state.auth.user) {
        await store.dispatch('auth/refreshUser/sendRequest');
    }

    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!store.state.auth.isAuth) {
            next({
                path: '/login',
                query: { redirect: to.fullPath },
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
