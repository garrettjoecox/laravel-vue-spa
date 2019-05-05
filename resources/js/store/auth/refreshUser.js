import axios from 'axios';
import { defaultsDeep } from 'lodash';

import requestStore from '../requestStore';
import { STATE_IN_PROGRESS, STATE_SUCCESS, STATE_FAIL } from '../requestStates';

export default defaultsDeep({
    actions: {
        async sendRequest({ commit }) {
            commit('reset');
            commit('setRequestState', STATE_IN_PROGRESS);

            try {
                const response = await axios.get('/api/me');

                commit('setRequestState', STATE_SUCCESS);
                commit('setData', response.data);
                commit('auth/setUser', response.data, { root: true });
            } catch (error) {
                commit('setRequestState', STATE_FAIL);
                commit('setErrors', error.response.data.errors);
                commit('auth/clearUser');
            }
        },
    }
}, requestStore);
