import NotFound from './views/NotFound';
import Welcome from './views/Welcome';
import Home from './views/Home';
import Register from './views/auth/Register';
import Login from './views/auth/Login';
import PasswordEmail from './views/auth/passwords/Email';

export default {
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
            path: '/password/reset',
            component: PasswordEmail
        },
    ]
};
