import Vue from 'vue';
import VueRouter from 'vue-router';

import routerConfig from './router';
import './bootstrap';

Vue.use(VueRouter);

const files = require.context('./components', true, /\.vue$/i);
files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default));

const app = new Vue({
    el: '#app',
    router: new VueRouter(routerConfig),
});
