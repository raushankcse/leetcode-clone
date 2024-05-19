
import './App.css'
import { Landing } from './components/Landing'

import { initializeApp } from "firebase/app";
import { Signin } from './components/Signin';

const firebaseConfig = {
  apiKey: "AIzaSyCN3-raoVPQrqCPXaivm2-FzTClqugbmyI",
  authDomain: "leetcode-clone-5ecf3.firebaseapp.com",
  projectId: "leetcode-clone-5ecf3",
  storageBucket: "leetcode-clone-5ecf3.appspot.com",
  messagingSenderId: "99977825385",
  appId: "1:99977825385:web:75c515f8fa99cbbed2a6f8",
  measurementId: "G-3KXT5MY5ES"
};

const app = initializeApp(firebaseConfig);


function App() {

  return (
    <div>
      <Signin/>
    </div>
  )
}

export default App
