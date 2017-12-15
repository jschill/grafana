import axios from 'axios';

const requestIsLocal = options => !options.url.match(/^http/);

const request = {
    get: (url, config?) => {
        return axios.get(url, config);
    },
    delete: (url) => {
        return axios.delete(url);
    },
    post: (url, data, config?) => {
        return axios.post(url, data, config);
    },
    patch: (url, data, config?) => {
        return axios.patch(url, data, config);
    },
    put: (url, data, config?) => {
        return axios.put(url, data, config);
    }
};

export const loginPing = () => {
    return request.get('/api/login/ping');
};

export default request;
