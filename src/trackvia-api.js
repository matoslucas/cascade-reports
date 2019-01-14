
//const tvRequest = require('./lib/tv-request');
//const auth = require('./lib/auth.js');
import tvRequest from './lib/tv-request'
import auth from './lib/auth.js'


class TrackviaAPI {
    /**
     * Creates new TrackviaAPI object
     * @param {String} apiKey
     * @param {String} accessToken (optional)
     * @param {String} host (optional)
     */
    constructor(userKey, accessToken = '', host = 'https://go.trackvia.com:443') {
        if (!userKey) {
            throw new Error('Must provide API key to TrackviaAPI constructor');
        }

        if (accessToken.length) {
            this.setAccessToken(accessToken);
        }

        window.__tv_host = host;

        auth.setUserKey(userKey);
    }

    /**
     * Authenticate into system as specified user.
     * Access and refresh tokens will be handled internally.
     * @param {String} username
     * @param {String} password
     * @return {Promise<Object>}
     */
    async login(username, password) {
        const params = {
            qs: {
                client_id: 'TrackViaAPI',
                grant_type: 'password',
                username,
                password
            }
        };

        try {
            const loginResponse = await tvRequest.post('/oauth/token', params);
            if (loginResponse.access_token) {
                auth.setAccessToken(loginResponse.access_token);
                auth.setRefreshToken(loginResponse.refresh_token, loginResponse.expires_in);
            } else {
                throw new Error ('Access token not returned from login');
            }
    
            return loginResponse;
        } catch(err) {
            throw new Error(`Login failed: ${JSON.stringify(err)}`);
        }
    }

    /**
     * Get all apps available
     * @return {Promise<Object>}
     */
    getApps() {
        return tvRequest.get('/openapi/apps');
    }

    /**
     * Get an app by name
     * @param {String} name
     * @return {Promise<Object>} 
     */
    getAppByName(name) {
        return tvRequest.get('/openapi/apps', { qs: { name } });
    }

    /**
     * Get all users, optionally paged
     * @return {Promise<Object>}
     */
    getUsers(paging = {}) {
        return tvRequest.get('/openapi/users', {
            qs: {
                start: paging.start,
                max: paging.max
            },
        });
    }

    /**
     * Add new user
     * @param {Object} userInfo with three string properties: email, firstName, and lastName
     * @returns {Promise<Object>}
     */
    addUser(userInfo) {
        if (!userInfo.email) {
            throw new Error('email must be supplied when adding user');
        }

        if (!userInfo.firstName) {
            throw new Error('firstName must be supplied when adding user');
        }

        if (!userInfo.lastName) {
            throw new Error('lastName must be supplied when adding user');
        }

        return tvRequest.post('/openapi/users', {qs: userInfo});
    }

    /**
     * Get all views
     * @return {Promise<Object>}
     */
    getViews() {
        return tvRequest.get('/openapi/views');
    }

    /**
     * Get view by name
     * @param {String} name of view
     * @return {Promise<Object/>}
     */
    getViewByName(name) {
        if (!name) {
            throw new Error('name must be supplied when getting view by name');
        }

        return tvRequest.get('/openapi/views', {qs:  { name } });
    }

    /**
     * Get view by id, optional paging, and optional query to filter records
     * @param {Number} id 
     * @param {Object} paging object with properties start and max (numbers)
     * @param {String} query filter record results in view
     * @returns {Promise<Object>}
     */
    getView(id, paging = {}, query) {
        if (query) {
            return tvRequest.get(`/openapi/views/${id}/find`, {
                qs: { 
                    q: query,
                    start: paging.start,
                    max: paging.max
                },
                
            });
        } else {
            return tvRequest.get(`/openapi/views/${id}`, {
                qs: {
                    start: paging.start,
                    max: paging.max
                }
            });
        }
    }

    /**
     * Get record by id
     * @param {Number} viewId 
     * @param {Number} recordId
     * @returns {Promise<Object>}
     */
    getRecord(viewId, recordId) {
        if (!viewId) {
            throw new Error('view id must be supplied to getRecord');
        }
        if (!recordId) {
            throw new Error('record id must be supplied to getRecord');
        }
        return tvRequest.get(`/openapi/views/${viewId}/records/${recordId}`);
    }

    /**
     * Add new record
     * @param {Number} viewId 
     * @param {Object} recordData key value pair of columns and values for the new record
     * @returns {Promise<Object>}
     */
    addRecord(viewId, recordData) {
        if (!viewId) {
            throw new Error('viewId must be supplied to addRecord');
        }

        return tvRequest.post(`/openapi/views/${viewId}/records`, {
            body: {
                data: [recordData]
            }
        })
    }

    /**
     * Update existing record
     * @param {Number} viewId 
     * @param {Number} recordId 
     * @param {Object} recordData key value pair of columns and values to update in the record
     * @returns {Promise<Object>}
     */
    updateRecord(viewId, recordId, recordData) {
        if (!viewId) {
            throw new Error('view id must be supplied to updateRecord');
        }

        if (!recordId) {
            throw new Error('record id must be supplied to updateRecord');
        }

        return tvRequest.put(`/openapi/views/${viewId}/records/${recordId}`, {
            body: {
                data: [recordData]
            }
        });
    }

    /**
     * Delete record
     * @param {Number} viewId 
     * @param {Number} recordId 
     * @returns {Promise<Object>}
     */
    deleteRecord(viewId, recordId) {
        if (!viewId) {
            throw new Error('view id must be supplied to deleteRecord');
        }
        if (!recordId) {
            throw new Error('record id must be supplied to deleteRecord');
        }
        
        return tvRequest.delete(`/openapi/views/${viewId}/records/${recordId}`);
    }

    /**
     * Delete all records in a view
     * @param {Number} viewId 
     * @returns {Promise<Object>}
     */
    deleteAllRecordsInView(viewId) {
        if (!viewId) {
            throw new Error('view id must be supplied to deleteAllRecordsInView');
        }

        return tvRequest.delete(`/openapi/views/${viewId}/records/all`);
    }

    /**
     * Get a file or image from a records
     * @param {Number} viewId 
     * @param {Number} recordId 
     * @param {String} fieldName 
     * @param {Object} options When getting an image file, you can specify widdth or maxDimension (Numbers) -- options are mutually exclusive
     * @returns {Promise<Object>}
     */
    getFile(viewId, recordId, fieldName, options = {}) {
        if (!viewId) {
            throw new Error('view id must be supplied to getFile');
        }
        if (!recordId) {
            throw new Error('record id must be supplied to getFile');
        }
        if (!fieldName) {
            throw new Error('field name must be supplied to getFile');
        }

        const requestDetails = {
            qs: {}
        };

        if (options.width) {
            requestDetails.qs.width = options.width;
        } else if (PushSubscriptionOptions.maxDimension) {
            requestDetails.qs.maxDimension = options.maxDimension;
        }

        return tvRequest.get(`/openapi/views/${viewId}/records/${recordId}/files/${fieldName}`, requestDetails);
    }

    /**
     * Attach a file to a record (can be used to overwrite existing file)
     * @param {Number} viewId 
     * @param {Number} recordId 
     * @param {String} fieldName name of field to add file to
     * @param {Binary String} file
     * @returns {Promise<Object>}
     */
    attachFile(viewId, recordId, fieldName, file) {
        if (!viewId) {
            throw new Error('view id must be supplied to attachFile');
        }
        if (!recordId) {
            throw new Error('record id must be supplied to attachFile');
        }
        if (!fieldName) {
            throw new Error('field name must be supplied to attachFile');
        }
        if (!file) {
            throw new Error('file must be supplied to attachFile');
        }
        const formData = new FormData();
        formData.append('file', file);

        return tvRequest.post(`/openapi/views/${viewId}/records/${recordId}/files/${fieldName}`, {
            notJson: true,
            body: formData,
        });
    }

    /**
     * Delete file from record
     * @param {Number} viewId 
     * @param {Number} recordId 
     * @param {String} fieldName name of field to remove file from
     * @returns {Promise<Object>}
     */
    deleteFile(viewId, recordId, fieldName) {
        if (!viewId) {
            throw new Error('view id must be supplied to deleteFile');
        }
        if (!recordId) {
            throw new Error('record id must be supplied to deleteFile');
        }
        if (!fieldName) {
            throw new Error('field name must be supplied to deleteFile');
        }

        return tvRequest.delete(`/openapi/views/${viewId}/records/${recordId}/files/${fieldName}`);
    }

    /**
     * Set access token for authentication
     * @param {String} accessToken 
     */
    setAccessToken(accessToken) {
        auth.setAccessToken(accessToken);
    }

    /**
     * Get access token for authentication
     * @returns {String}
     */
    getAccessToken() {
        return auth.getAccessToken();
    }

    /**
     * Get refresh token for authentication
     * @returns {String}
     */
    getRefreshToken() {
        return auth.getRefreshToken();
    }

    /**
     * Get user key (API key)
     * @returns {String}
     */
    getUserKey() {
        return auth.getUserKey();
    }
}

export default TrackviaAPI;