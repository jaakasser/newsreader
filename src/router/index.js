import VueRouter from 'vue-router';
import NewsList from '../components/NewsList.vue';
import NewsDetail from '../components/NewsDetail.vue';
import NotFoundPage from '../components/NotFoundPage.vue';

const router = new VueRouter({
    routes: [
        {
            path: '/',
            name: 'NewsList',
            component: NewsList
        },
        {
            path: '/:id',
            name: 'NewsDetail',
            component: NewsDetail,
            props: true
        },
        {
            path: '/404',
            name: '404',
            component: NotFoundPage
        }
    ]
});

export default router;