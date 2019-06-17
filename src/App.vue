<template>
    <div>
        <header>
            <div class="heading">
                <button v-if="isNewsDetail" @click="goBack()">Back</button>
                <p>News Reader</p>
            </div>
        </header>
        <loading v-if="$root.loading"></loading>
        <router-view></router-view>
    </div>
</template>

<script>
    import Loading from './components/Loading.vue';
    import router from './router';

    export default {
        name: 'app',
        components: {
            'loading': Loading
        },

        data() {
            return {
                currentRoute: router.currentRoute.name
            }
        },

        computed: {
            isNewsDetail () {
                return this.currentRoute === 'NewsDetail';
            }
        },

        methods: {
            goBack() {
                router.push({name: 'NewsList'});
            }
        },

        mounted () {
            router.afterEach( route => {
                this.currentRoute = route.name;
            });
        }
    }
</script>

<style>
    body {
        font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
        margin: 0;
    }

    header {
        /* margin: 0 5px; */
    }

    .heading {
        padding: 15px 5px;
        background-color: darkslateblue;
        color: whitesmoke;
    }

    .heading p {
        text-align: center;
        margin: 0;
    }

    .heading button {
        position: absolute;
    }

</style>
