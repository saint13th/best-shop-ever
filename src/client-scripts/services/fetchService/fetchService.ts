import axios from 'axios';
import * as https from "https";
import * as fs from 'fs';

export const httpsAgent = new https.Agent({
    rejectUnauthorized: false,
    cert: fs.readFileSync('secrets/create-cert.pem'),
});

export const fetchServiceClass = ({ token }: { token?: string }) => {
    const axiosInstance = axios.create({
        httpsAgent,
        withCredentials: true,
        baseURL: 'https://localhost:3000/api/v1',
        headers: {
            'Content-Type': 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {})
        }
    });

    const handleRequest = async (method, url, params = {}) => {
        return axiosInstance[method](url, params)
            .then((response) => ({ result: response.data }))
            .catch((error) => ({ error: error.message }))
    }

    const get = ({ url, params = null }) => handleRequest('get', url, params);

    const post = ({ url, params }) => handleRequest('post', url, params);

    const put = ({ url, params }) => handleRequest('put', url, params);

    const patch = ({ url, params }) => handleRequest('patch', url, params);

    const deleteRequest = ({ url, params }) => handleRequest('delete', url, params = null)

    return {
        get,
        post,
        put,
        patch,
        deleteRequest,
    }
}

export const fetchService = fetchServiceClass({});