import Vue from 'vue';
import App from './App.vue';

window.app = new Vue({
    el: '.vue-app',
    render: h => h(App)
});