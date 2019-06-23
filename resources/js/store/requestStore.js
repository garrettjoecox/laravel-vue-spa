import { STATE_PRE } from '../constants/requestStates';

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
        sendRequest() {
            throw new Error('Overwrite me!');
        },
    }
}
