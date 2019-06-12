import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import router from './router';

Vue.use(VueRouter);

window.app = new Vue({
    el: '.vue-app',
    render: h => h(App),
    router: router
});