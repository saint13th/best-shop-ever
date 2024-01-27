const fetchService = (function () {
    // const request = async ({ method, url, params }) => {
    //     try {
    //         const response = await fetch(url, {
    //             method,
    //             headers: {
    //                 'Accept': 'application/json',
    //                 'Content-Type': 'application/json',
    //                 'Cache': 'no-cache'
    //             },
    //             ...(params ? { body: JSON.stringify(params) } : {}),
    //             credentials: 'include',
    //         });

    //         if (!response.ok) {
    //             throw new Error(`${response.status} ${response.statusText}`);
    //         }

    //         if (response.error) {
    //             throw new Error(response.error.message);
    //         }

    //         return { result: response, error: null }
    //     }
    //     catch (error) {
    //         return { result: null, error: error.message }
    //     }
    // }

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

    const deleteRequest = ({ url }) => handleRequest('delete', url, params = null )

    return {
        get,
        post,
        put,
        patch,
        deleteRequest,
    }
}(axios))