<template>
    <div class="news-item-container" @click="navigate()">
        <div class="news-item-img">
            <img :src="img" alt="">
        </div>
        <div class="news-item-heading">{{ title }}</div>
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
        },
        img: {
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

<style>
    .news-item-container {
        margin: 15px 5px;
        -webkit-box-shadow: 0px 5px 14px -1px rgba(0,0,0,0.75);
        -moz-box-shadow: 0px 5px 14px -1px rgba(0,0,0,0.75);
        box-shadow: 0px 5px 14px -1px rgba(0,0,0,0.75);
        /* background-color: whitesmoke; */
    }

    .news-item-container .news-item-heading {
        padding: 7px;
        margin: 0;
        font-size: 1.2em;
    }

    .news-item-img {
        height: 200px;
        overflow: hidden;
        position:relative;
        display:inline-block;
    }

    .news-item-img:after {
        content:'';
        position:absolute;
        left:0; top:0;
        width:100%; height:100%;
        display:inline-block;
        background: -moz-linear-gradient(top, rgba(0,47,75,0.5) 0%, rgba(220, 66, 37, 0.5) 100%); /* FF3.6+ */
        background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,rgba(220, 66, 37, 0.5)), color-stop(100%,rgba(0,47,75,0.5))); /* Chrome,Safari4+ */
        background: -webkit-linear-gradient(top, rgba(0,47,75,0.5) 0%,rgba(220, 66, 37, 0.5) 100%); /* Chrome10+,Safari5.1+ */
        background: -o-linear-gradient(top, rgba(0,47,75,0.5) 0%,rgba(220, 66, 37, 0.5) 100%); /* Opera 11.10+ */
        background: -ms-linear-gradient(top, rgba(0,47,75,0.5) 0%,rgba(220, 66, 37, 0.5) 100%); /* IE10+ */
        background: linear-gradient(to bottom, rgba(0,47,75,0.5) 0%,rgba(220, 66, 37, 0.5) 100%); /* W3C */
    }

    .news-item-img img {
        max-width: 100%;
        display: block;
    }
</style>
