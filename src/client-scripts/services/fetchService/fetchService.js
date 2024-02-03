import axios from 'axios';

const fetchServiceClass = () => {
    const axiosInstance = axios.create({
        withCredentials: true,
        baseURL: '/api/v1',
        headers: {
            'Content-Type': 'application/json',
        }
    });

    const handleRequest = (method, url, params = {}) => {
        return axiosInstance[method](url, params)
            .then((response) => ({ result: response.data }))
            .catch((error) => ({ error: error.message }))
    }

    const get = ({ url, params = null }) => handleRequest('get', url, params);

    const post = ({ url, params }) => handleRequest('post', url, params);

    const put = ({ url, params }) => handleRequest('put', url, params);

    const patch = ({ url, params }) => handleRequest('patch', url, params);

    const deleteRequest = ({ url }) => handleRequest('delete', url, params = null)

    return {
        get,
        post,
        put,
        patch,
        deleteRequest,
    }
}

export const fetchService = fetchServiceClass();