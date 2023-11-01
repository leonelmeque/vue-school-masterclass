// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
import { initializeApp } from 'firebase/app'

const firebaseConfig = {
  apiKey: process.env.VUE_API_KEY,
  authDomain: process.env.VUE_AUTH_DOMAIN,
  projectId: process.env.VUE_PROJECT_ID,
  storageBucket: process.env.VUE_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_MESSAGING_SENDER_ID,
  appId: process.env.VUE_APP_ID
}

// Initialize Firebase

const firebaseApp = initializeApp(firebaseConfig)

export default firebaseApp
