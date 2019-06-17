<template>
    <div class="news-detail">
        <div class="img">
            <img :src="img" alt="">
        </div>
        <div class="body">
            <h3>{{ newsItem.title }}</h3>
            <p class="content">{{ newsItem.content }}</p>
            <p class="source">Source: </p><a :href="newsItem.url" target="_blank">{{ newsItem.url }}</a>
        </div>
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
            }
        },

        mounted() {
            this.getNewsDetail();
        }
    }
</script>

<style>
    .news-detail {
        max-width: 700px;
        margin: auto;
    }

    .news-detail .body {
        padding: 5px;
    }

    .news-detail .img {
        padding: 0;
        height: 200px;
        overflow: hidden;
    }

    .news-detail .img img {
        max-width: 100%;
    }

    .news-detail .content {
        color: grey;
    }

    .news-detail .source {
        font-size: 0.8em;
        color: gray;
    }
</style>
