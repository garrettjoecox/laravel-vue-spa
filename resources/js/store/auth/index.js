import register from './register';
import login from './login';
import logout from './logout';
import passwords from './passwords';

const isAuth = !!document.head.querySelector('meta[name="is-auth"]');
const localStorageUser = localStorage.getItem('user');

export default {
    namespaced: true,

    modules: {
        register,
        login,
        logout,
        passwords
    },

    state: {
        isAuth: isAuth,
        user: isAuth && localStorageUser && JSON.parse(localStorageUser),
    },

    mutations: {
        setUser(state, user) {
            state.isAuth = true;
            state.user = user;

            localStorage.setItem('user', JSON.stringify(user));
        },

        clearUser(state) {
            state.isAuth = false;
            state.user = null;

            localStorage.removeItem('user');
        }
    },
}
