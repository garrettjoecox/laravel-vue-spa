let nextAlertId = 1;

export default {
    namespaced: true,

    state: {
        alerts: [],
    },

    mutations: {
        addAlert(state, alert) {
            alert.id = nextAlertId;
            nextAlertId += 1;

            state.alerts.push(alert);
        },

        removeAlert(state, alertId) {
            const index = state.alerts.findIndex(alert => alert.id === alertId);
            if (index !== -1) state.alerts.splice(index, 1);
        },

        clearAlerts(state) {
            state.alerts = [];
        },
    },

    actions: {
        addTimedAlert({ commit }, alert) {
            alert.id = nextAlertId;
            nextAlertId += 1;

            commit('addAlert', alert);
            setTimeout(() => {
                commit('removeAlert', alert.id);
            }, 5000);
        },
    },
};
