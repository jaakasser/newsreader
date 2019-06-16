<template>
  <div>
    <div v-for="(item, index) in news" :key="index">
        <news-item :id="item.id" :title="item.title"></news-item>
    </div>
  </div>
</template>

<script>
    import NewsItem from './NewsItem.vue';
    import axios from 'axios';

    const props = {}

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
                newsPerPage: 5
            }
        },

        computed: {
            skipNews () {
                return this.page * this.newsPerPage;
            }
        },

        methods: {
            async getNewsList () {
                const res = await axios.post(
                    'https://news-reader.stagnationlab.dev/graphql', {
                        query: `{
                            newsList(skip: ${this.skipNews}, limit: ${this.newsPerPage}) {
                                totalRows,
                                rows {
                                    id,
                                    title
                                }
                            }
                        }`
                });
                this.news.push(...res.data.data.newsList.rows);
            },

            infinite () {
                window.onscroll = () => {
                let bottomOfWindow = document.documentElement.scrollTop + window.innerHeight === document.documentElement.offsetHeight;

                if (bottomOfWindow) {
                    console.log("BOTTOM");
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
