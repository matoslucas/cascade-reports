
import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';


import Config from './firebase.config'
const Firebase = app.initializeApp(Config);

export default Firebase;