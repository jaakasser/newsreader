<template>
    <div>
        <button @click="goBack()">Back</button>
        <h4>{{ newsItem.title }}</h4>
        <img :src="img" alt="">
        <p>{{ newsItem.content }}</p>
        <p>Original story: </p><a :href="newsItem.url" target="_blank">{{ newsItem.url }}</a>
    </div>
</template>

<script>
    import api from '../api';
    import router from '../router';

    const props = {
        id: {
            type: String,
            default: ''
        }
    }

    export default {
        name: 'news-detail',
        props,

        data () {
            return {
                newsItem: {}
            }
        },

        computed: {
            img () {
                return this.newsItem.img;
            },

            query () {
                return `{
                    newsItem(id: "${this.id}") {
                        title,
                        img,
                        content,
                        url
                    }
                }`
            }
        },

        methods: {
            async getNewsDetail() {
                const query = this.query;
                const res = await api.post('/', { query });
                this.newsItem = res.data.data.newsItem;

                if (this.newsItem == null) {
                    router.push({
                        name: '404'
                    })
                }
            },

            goBack() {
                router.push({name: 'NewsList'});
            }
        },

        mounted() {
            this.getNewsDetail();
        }
    }
</script>
