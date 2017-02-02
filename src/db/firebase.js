import Vue from 'vue'
import VueFire from 'vuefire'
import Firebase from 'firebase'

Vue.use(VueFire)

export const firebaseApp = Firebase.initializeApp({
  apiKey: 'AIzaSyBJrsysCANrrrvvaZsHQ5JCVFtuefmwgiw',
  authDomain: 'coratuvoige.firebaseapp.com',
  databaseURL: 'https://coratuvoige.firebaseio.com',
  storageBucket: 'coratuvoige.appspot.com',
  messagingSenderId: '420022212127'
})

export const firebaseDB = firebaseApp.database()

export const dbConfigRef = firebaseApp.database().ref('/config')
export const dbDriversRef = firebaseApp.database().ref('/drivers')
export const dbRidesRef = firebaseApp.database().ref('/rides')
