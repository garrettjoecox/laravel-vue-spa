import axios from 'axios';

import { STATE_PRE, STATE_IN_PROGRESS, STATE_SUCCESS, STATE_FAIL } from '../requestStates';

export default {
    namespaced: true,

    state: {
        requestState: STATE_PRE,
        data: null,
        errors: {},
    },

    mutations: {
        setRequestState(state, requestState) {
            state.requestState = requestState;
        },

        setData(state, data) {
            state.data = data;
        },

        setErrors(state, errors) {
            state.errors = errors;
        },

        reset(state) {
            state.requestState = STATE_PRE;
            state.data = null;
            state.errors = {};
        },
    },

    actions: {
        async sendRequest({ commit }, formData) {
            commit('reset');
            commit('setRequestState', STATE_IN_PROGRESS);

            try {
                const response = await axios.post('/api/logout', formData);

                commit('setRequestState', STATE_SUCCESS);
                commit('setData', response.data);
                commit('auth/clearUser', null, { root: true });
            } catch (error) {
                commit('setRequestState', STATE_FAIL);
                commit('setErrors', error.response.data.errors);
            }
        },
    }
}
