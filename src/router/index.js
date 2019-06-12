import VueRouter from 'vue-router';
import NewsList from '../components/NewsList.vue';
import NewsDetail from '../components/NewsDetail.vue';


export default new VueRouter({
    routes: [
        {
            path: '/',
            redirect: {
                name: "NewsList"
            }
        },
        {
            path: '/news',
            name: 'NewsList',
            component: NewsList
        },
        {
            path: '/news/:id',
            name: 'NewsDetail',
            component: NewsDetail,
            props: true
        },
    ]
})