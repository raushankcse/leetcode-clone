
import { useEffect } from 'react';
import './App.css'
import { Landing } from './components/Landing'
import { Signin } from './components/Signin';
import {getAuth, onAuthStateChanged } from 'firebase/auth';
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyCN3-raoVPQrqCPXaivm2-FzTClqugbmyI",
  authDomain: "leetcode-clone-5ecf3.firebaseapp.com",
  projectId: "leetcode-clone-5ecf3",
  storageBucket: "leetcode-clone-5ecf3.appspot.com",
  messagingSenderId: "99977825385",
  appId: "1:99977825385:web:75c515f8fa99cbbed2a6f8",
  measurementId: "G-3KXT5MY5ES"
};

export const app = initializeApp(firebaseConfig)
export const auth = getAuth(app);

function App() {

  useEffect(()=>{
    onAuthStateChanged(auth, function(user){
      if(user){
        console.log('This is the user: ', user)
      } else {
        console.log('There is no logged in user');
      }
    })
  }, [])

  return (
    <div>
      <Signin/>
    </div>
  )
}

export default App
