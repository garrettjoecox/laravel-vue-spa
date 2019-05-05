import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import auth from './auth';
import alert from './alert';

export default new Vuex.Store({
    modules: {
        auth,
        alert,
    },

    strict: true,
});
