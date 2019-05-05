import Vue from 'vue';
import VueRouter from 'vue-router';

import NotFound from './views/NotFound';
import Welcome from './views/Welcome';
import Home from './views/Home';
import Register from './views/auth/Register';
import Login from './views/auth/Login';
import PasswordEmail from './views/auth/passwords/Email';
import PasswordReset from './views/auth/passwords/Reset';

Vue.use(VueRouter);

export default new VueRouter({
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
            component: Home
        },

        {
            path: '/register',
            component: Register
        },

        {
            path: '/login',
            component: Login
        },

        {
            path: '/password/email',
            component: PasswordEmail
        },

        {
            path: '/password/reset/:token',
            component: PasswordReset
        },
    ]
});
