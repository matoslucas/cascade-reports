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
     }

     getAccessToken() {
         return this.accessToken;
     }

     getRefreshToken() {
         return this.refreshToken;
     }

     setRefreshToken(refreshToken, secondsUntilExpiration) {
         this.refreshToken = refreshToken;
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

     async doRefreshToken() {
        const params = {
             client_id: 'TrackViaAPI',
             grant_type: 'refresh_token',
             refresh_token: this.refreshToken
         };

         
        const refreshTokenResponse = fetch(`${__tv_host}/oath/token`, {
            method: 'POST',
            body: JSON.stringify(params)
        });

        const refreshTokenJSON = await refreshTokenResponse.json();

        if (refreshTokenJSON.access_token) {
            this.setAccessToken(refreshTokenJSON.access_token);
            this.setRefreshToken(refreshTokenJSON.refresh_token, refreshTokenJSON.expires_in);
        } else {
            throw new Error('Access token not returned from doRefreshToken()');
        }
     }
 }

 export default new Auth();