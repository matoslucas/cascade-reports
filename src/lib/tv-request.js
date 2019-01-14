//const auth = require('./auth');
import auth from './auth'

const getDefaultOptions = () => ({
    requiresAuth: true,
    dataType: 'json',
    method: 'GET'
});

const jsonToFormURL = (json) => {
    const params = [];
    for (let key in json) {
        if (json[key]) {
            params.push(`${encodeURIComponent(key)}=${encodeURIComponent(json[key])}`);
        }
    }
    return params.join('&');
}

class tvRequest {
    async makeRequest(endpoint, requestDetails, options) {
        options = Object.assign(getDefaultOptions(), options);
        let url = window.__tv_host + endpoint;

        let body = requestDetails.body || null;
        let queryParamObject = {};

        if (options.requiresAuth) {
            queryParamObject.access_token = auth.getAccessToken();
            queryParamObject.user_key = auth.getUserKey();
        }

        if (requestDetails.qs) {
            queryParamObject = Object.assign(queryParamObject, requestDetails.qs);
        }

        if (Object.keys(queryParamObject).length > 0) {
            url += `?${jsonToFormURL(queryParamObject)}`;
        }
        
        try {
            const initialResponse = await fetch (url, {
                method: requestDetails.method,
                headers: requestDetails.headers,
                body
            });
            const contentType = initialResponse.headers.get("content-type");
            const response = (contentType && contentType.indexOf("application/json") !== -1)
                ? await initialResponse.json() 
                : {message: initialResponse};

            if (response.error && response.error_description.indexOf('Access token expired')) {
                let retryOptions = Object.assign(options, {});
                await auth.doRefreshToken();
                return await this.makeRequest(retryOptions);
            } else if (response.error) {
                throw new Error(`url: ${url}, method: ${options.method}, response: ${JSON.stringify(response)}`);
            } else {
                return response;
            }
        } catch (err) {
            throw new Error(err);
        }
    }

    get(url, params, options) {
        const requestDetails = {
            method: 'GET'
        }

        if (params && params.file) {
            requestDetails.file = params.file;
        }

        if (params && params.qs) {
            requestDetails.qs = params.qs;
        }

        return this.makeRequest(url, requestDetails, options);
    }

    post(url, params, options) {
        const requestDetails = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        }

        if (params && params.qs) {
            requestDetails.qs = params.qs;
        }

        if (params && params.body) {
            if (typeof params.body !== 'string' && !params.notJson) {
                requestDetails.body = JSON.stringify(params.body);
            } else {
                requestDetails.body = params.body;
                delete requestDetails.headers['Content-Type'];
            }
        }

        return this.makeRequest(url, requestDetails, options);
    }

    put(url, params, options) {
        const requestDetails = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            }
        }

        if (params && params.qs) {
            requestDetails.qs = params.qs;
        }

        if (params && params.body) {
            if (typeof params.body !== 'string' && !params.notJson) {
                requestDetails.body = JSON.stringify(params.body);
            } else {
                requestDetails.body = params.body;
                delete requestDetails.headers['Content-Type'];
            }
        }

        return this.makeRequest(url, requestDetails, options);
    }

    delete(url) {
        const requestDetails = {
            method: 'DELETE'
        };

        return this.makeRequest(url, requestDetails);
    }
}



export default new tvRequest();