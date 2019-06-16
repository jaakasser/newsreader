<template>
  <div>
    <div v-for="(item, index) in news" :key="index">
        <news-item :id="item.id" :title="item.title"></news-item>
    </div>
  </div>
</template>

<script>
    import NewsItem from './NewsItem.vue';
    import api from '../api';

    const props = {};

    export default {
        name: 'news-list',
        props,
        components: {
            'news-item': NewsItem
        },

        data () {
            return {
                news: [],
                page: 0,
                newsPerPage: 5,
                cacheName: 'news-list-cache'
            }
        },

        computed: {
            skipNews () {
                return this.page * this.newsPerPage;
            },

            query () {
                return `{
                    newsList(skip: ${this.skipNews}, limit: ${this.newsPerPage}) {
                        totalRows,
                        rows {
                            id,
                            title
                        }
                    }
                }`;
            }
        },

        methods: {
            async getNewsList () {
                const query = this.query;
                const res = await api.post("/", { query });
                this.news.push(...res.data.data.newsList.rows);
            },

            infinite () {
                window.onscroll = () => {
                    let bottomOfWindow = document.documentElement.scrollTop + window.innerHeight === document.documentElement.offsetHeight;

                    if (bottomOfWindow) {
                        this.page++;
                        this.getNewsList();
                    }
                };
            }
        },

        mounted () {
            this.getNewsList();
            this.infinite()
        }
    }
</script>
