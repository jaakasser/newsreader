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
                news: []
            }
        },

        methods: {
            async getNewsList () {
                const res = await axios.post(
                    'https://news-reader.stagnationlab.dev/graphql', {
                        query: `{
                            newsList(skip: 0, limit: 20) {
                                totalRows,
                                rows {
                                    id,
                                    title
                                }
                            }
                        }`
                });
                this.news = res.data.data.newsList.rows;
            }
        },

        mounted () {
            this.getNewsList();
        }
    }
</script>
