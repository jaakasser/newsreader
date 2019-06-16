<template>
    <div @click="navigate()">
        <h4>{{ title }}</h4>
        <p>News item</p>
        <p>ID: {{ id }}</p>
    </div>
</template>

<script>
    import router from '../router';

    const props = {
        id: {
            type: String,
            default: ''
        },
        title: {
            type: String,
            default: ''
        }
    }

    export default {
        name: 'news-item',
        props,
        
        data () {
            return {}
        },

        methods: {
            navigate() {
                router.push({
                    name: 'NewsDetail',
                    params: {
                        id: this.id
                    }
                });
            }
        }
    }
</script>
