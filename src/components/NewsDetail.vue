<template>
    <div>
        <button @click="goBack()">Back</button>
        <h4>{{ newsItem.title }}</h4>
        <img :src="img" alt="">
        <p>{{ newsItem.content }}</p>
    </div>
</template>

<script>
    import axios from 'axios';
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
            img() {
                return this.newsItem.img;
            }
        },

        methods: {
            async getNewsDetail() {
                const res = await axios.post(
                    'https://news-reader.stagnationlab.dev/graphql', {
                        query: `{
                            newsItem(id: "${this.id}") {
                                title,
                                img,
                                content,
                                url
                            }
                        }`
                });
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
