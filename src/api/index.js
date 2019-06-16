import axios from 'axios'

const api = axios.create({
    baseURL: 'https://news-reader.stagnationlab.dev/graphql',
});

export default api;