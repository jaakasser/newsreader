<template>
  <div class="news-list">
    <div v-for="(item, index) in news" :key="index">
        <news-item v-bind="item"></news-item>
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
                cacheAgeInMs: 60000 * 60 // 1 hour
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
                            title,
                            img
                        }
                    }
                }`;
            }
        },

        methods: {
            async getNewsList () {
                this.checkCacheAge();
                const query = this.query;
                if (window.localStorage.getItem(JSON.stringify(query)) != null) {
                    this.fromCache();
                } else {
                    const res = await api.post("/", { query });
                    this.news.push(...res.data.data.newsList.rows);
                    this.updateCache();
                }
            },

            fromCache () {
                this.news = JSON.parse(window.localStorage.getItem(JSON.stringify(this.query)));
            },

            updateCache () {
                const lastQuery = JSON.stringify(this.query);
                window.localStorage.setItem(lastQuery, JSON.stringify(this.news));
                window.localStorage.setItem('newest', new Date().getTime()); 
            },

            checkCacheAge () {
                const newest = window.localStorage.getItem('newest');
                const isNotEmpty = newest != null;
                const isTooOld = (newest - new Date().getTime) > this.cacheAgeInMs;
                if (isNotEmpty && isTooOld) {
                    window.localStorage.clear();
                }
            },

            infinite () {
                window.onscroll = () => {
                    let pageHeight = document.documentElement.offsetHeight;
                    let windowHeight = window.innerHeight;
                    let scrollPosition = window.scrollY || window.pageYOffset || document.body.scrollTop + (document.documentElement && document.documentElement.scrollTop || 0);

                    if (pageHeight <= windowHeight + scrollPosition) {
                        this.page++;
                        this.getNewsList();
                        this.updateCache();
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

<style>
    .news-list {
        max-width: 700px;
        margin: auto;
    }
</style>
