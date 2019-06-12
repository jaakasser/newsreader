<template>
    <div>
        <h4>{{ title }}</h4>
        <p>News item</p>
        <p>ID: {{ id }}</p>
    </div>
</template>

<script>
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
        }
    }
</script>
