<template>
    <div>
        <p>News Reader</p>
        <loading v-if="$root.loading"></loading>
        <router-view></router-view>
    </div>
</template>

<script>
    import Loading from './components/Loading.vue';

    export default {
        name: 'app',
        components: {
            'loading': Loading
        },

        data() {
            return {}
        },
    }
</script>

<style>
    body {
        font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
        margin: 0;
    }
</style>
