import axios from 'axios'

const publicAPI = axios.create({
    baseURL: 'http://localhost:3001',
    timeout: 5000
})

const authAPI = axios.create({
    baseURL: 'http://localhost:3001',
    timeout: 5000
})

authAPI.interceptors.request.use(
    (config) => {
        config.headers.authorization = localStorage.getItem("token");
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);



export { authAPI, publicAPI };