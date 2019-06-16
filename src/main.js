import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import router from './router';

Vue.use(VueRouter);

const app = new Vue({
    el: '.vue-app',
    render: h => h(App),
    router,
    data: {
        loading: false
    }
});

router.beforeEach((to, from, next) => {
    app.loading = true;    
    next();
});

router.afterEach((to, from) => {
    app.loading = false;
});

window.app = app;