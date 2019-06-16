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
                            title
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
                window.localStorage.setItem(JSON.stringify(this.query), JSON.stringify(this.news));
                window.localStorage.setItem('newest', new Date().getTime());
                console.log(window.localStorage.getItem('newest'));
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
                    let bottomOfWindow = document.documentElement.scrollTop + window.innerHeight === document.documentElement.offsetHeight;

                    if (bottomOfWindow) {
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
