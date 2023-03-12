import firebase from 'firebase/app'
import 'firebase/storage'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDKZKMUyS-jZQUf1dGywQlj5W5Yqnk6FdQ',
  authDomain: 'fir-react-upload-aa945.firebaseapp.com',
  projectId: 'fir-react-upload-aa945',
  storageBucket: 'fir-react-upload-aa945.appspot.com',
  messagingSenderId: '308316262650',
  appId: '1:308316262650:web:cf353487aed7c72b007943',
  measurementId: 'G-S99V1FQSMG',
}

firebase.initializeApp(firebaseConfig)

const storage = firebase.storage()

export { storage, firebase as default }
