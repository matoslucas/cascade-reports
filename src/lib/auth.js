/**
 * Singleton service for handling authentication and API keys
 */
const __tv_host = 'https://go.trackvia.com:443';
class Auth {
    setUserKey(userKey) {
        this.userKey = userKey;
    }

    getUserKey() {
        return this.userKey;
    }

    setAccessToken(accessToken) {
        this.accessToken = accessToken;
        //localStorage.setItem('accessToken', accessToken);
    }

    getAccessToken() {
        return this.accessToken;
        //return localStorage.getItem('accessToken');
    }

    getRefreshToken() {
        return this.refreshToken;
    }

    setRefreshToken(refreshToken, secondsUntilExpiration) {
        this.refreshToken = refreshToken;
        console.log(secondsUntilExpiration)
        if (typeof secondsUntilExpiration !== 'number') {
            secondsUntilExpiration = parseInt(secondsUntilExpiration);
        }

        if (this.refreshTimer) {
            clearTimeout(this.refreshTimer);
        }

        // Refresh token 15 seconds before it expires
        this.refreshTimer = setTimeout(() => {
            this.doRefreshToken();
        }, (secondsUntilExpiration - 15) * 1000);
    }

    doRefreshToken() {
        const params = {
            client_id: 'TrackViaAPI',
            grant_type: 'refresh_token',
            refresh_token: this.refreshToken
        };

        console.log('doRefreshToken')
        localStorage.removeItem('accessToken');

            /*
            const refreshTokenResponse = fetch(`${__tv_host}/oauth/token`, {
                method: 'POST',
                body: JSON.stringify(params)
            })
            .then(response => {
                console.log(response)
                //const data = response.json()

            }).catch(function (error) {
                console.log('Request failed', error);
            });
            */
            /*

        console.log(refreshTokenResponse)

        let refreshTokenJSON = await refreshTokenResponse.json();

        if (refreshTokenJSON.access_token) {
            this.setAccessToken(refreshTokenJSON.access_token);
            this.setRefreshToken(refreshTokenJSON.refresh_token, refreshTokenJSON.expires_in);
        } else {
            throw new Error('Access token not returned from doRefreshToken()');
        }
        */
    }
}

export default new Auth();