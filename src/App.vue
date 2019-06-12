<template>
    <div>
        <p>News Reader</p>
        <news-list></news-list>
    </div>
</template>

<script>
    import NewsList from './components/NewsList.vue';

    export default {
        data() {
            return {}
        },

        components: {
            'news-list': NewsList
        }
    }
</script>

<style>
    body {
        font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
        margin: 0;
    }
</style>
