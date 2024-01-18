const fetchData = async ({ method, url, params }) => {
    try {
        const response = await fetch(url, {
            method,
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: params ? JSON.stringify(params) : {}
        });

        if (!response.ok) {
            throw new Error(`${response.status} ${response.statusText}`);
        }

        if (response.error) {
            throw new Error(response.error.message);
        }

        return { result: response, error: null }
    }
    catch (error) {
        return { result: null, error: error.message }
    }
}