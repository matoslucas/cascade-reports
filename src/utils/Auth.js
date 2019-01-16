import firebase from '../firebase/Firebase'

class Auth {
  
  isAuthenticated() {

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

  }

  login(p, cb) {
    
    //const _self = this
    return firebase.auth().signInWithEmailAndPassword(p.user, p.pass)
    
    
  }

  logout(cb) {
    const _self = this
    firebase.auth().signOut().then(function() {
      console.log('Signed Out');
      _self._authenticated = false;
      cb('pepe');
    }, function(error) {
      console.error('Sign Out Error', error);
    });
 
  }

}

export default new Auth();
