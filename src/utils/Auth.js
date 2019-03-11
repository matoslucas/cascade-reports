import firebase from '../firebase/Firebase'

import Config from '../utils/Trackvia.config'
import TrackviaAPI from '../trackvia-api'

const api = new TrackviaAPI(Config.apiKey, Config.accessToken, Config.env);

class Auth {
  
  isAuthenticated() {
    //console.log('isAuthenticated')
 
      const fetchUser = new Promise((resolve, reject) => {
        firebase.auth().onAuthStateChanged(function (user) {
          if (user) {
            resolve(user)
          } else {
            reject('user no loged')
          }
        })
      })

  return fetchUser
 
//return localStorage.getItem('accessToken');
  }

  login(p) {
    return firebase.auth().signInWithEmailAndPassword(p.user, p.pass)    
  }

  loginApi(p) {
    return api.login(p.user, p.pass)
  }

  createFirebaseUser(p) {
    return firebase.auth().createUserWithEmailAndPassword(p.user, p.pass)
  }

  logout(cb) {

    localStorage.removeItem('accessToken');
    console.log('Signed Out');   
    
    const _self = this
    firebase.auth().signOut().then(function() {
      console.log('Signed Out');
      _self._authenticated = false;
      cb();
    }, function(error) {
      console.error('Sign Out Error', error);
    });
 
  }

}

export default new Auth();
