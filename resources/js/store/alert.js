let alertId = 1;

export default {
    namespaced: true,

    state: {
        alerts: [],
    },

    mutations: {
        addAlert(state, alert) {
            if (!alert.id) alert.id = alertId++;
            state.alerts.push(alert);
        },

        removeAlert(state, alertId) {
            const index = state.alerts.findIndex((alert) => alert.id === alertId);
            if (index !== -1) state.alerts.splice(index, 1);
        },

        clearAlerts(state) {
            state.alerts = [];
        },
    },

    actions: {
        addTimedAlert({ commit }, alert) {
            if (!alert.id) alert.id = alertId++;
            commit('addAlert', alert);
            setTimeout(() => {
                commit('removeAlert', alert.id);
            }, 5000);
        }
    }
}
