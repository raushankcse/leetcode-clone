
import { useEffect } from 'react';
import './App.css'
import { Signin } from './components/Signin';
import {getAuth, onAuthStateChanged } from 'firebase/auth';
// import { initializeApp } from 'firebase/app';
import { RecoilRoot, useRecoilState } from 'recoil';
import { userAtom } from './store/atoms/user';
import { Topbar } from './components/Topbar';
import { Card } from './components/Card';
import { app } from './utils/firebase';
import { SubmissionActivityList } from './components/SubmissionActivityList';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Landing } from './components/Landing';
import { About } from './components/About';


// const firebaseConfig = {
//   apiKey: "AIzaSyCN3-raoVPQrqCPXaivm2-FzTClqugbmyI",
//   authDomain: "leetcode-clone-5ecf3.firebaseapp.com",
//   projectId: "leetcode-clone-5ecf3",
//   storageBucket: "leetcode-clone-5ecf3.appspot.com",
//   messagingSenderId: "99977825385",
//   appId: "1:99977825385:web:75c515f8fa99cbbed2a6f8",
//   measurementId: "G-3KXT5MY5ES"
// };

// export const app = initializeApp(firebaseConfig)
export const auth = getAuth(app);

function App() {
  return <RecoilRoot>
    <StoreApp/> 
  </RecoilRoot>
}

function StoreApp(){
  const [user, setUser] = useRecoilState(userAtom);
  useEffect(()=>{
    onAuthStateChanged(auth, function(user){
      if(user && user.email){
        setUser({
          loading: false,
          user: {
            email: user.email
          }
        })
      } else {
        setUser({
          loading:false,
        })
        console.log('There is no logged in user');
      }
    })
  }, [])

 if(user.loading){
    return <div>loading....</div>
 }
  if(!user.user){
    return <div><Signin/> </div>
 }


  return (
    <div className="place-items-center grid">
       <div className="max-w-screen-lg w-full ">
        <Router>
          <Topbar />
            <Routes>
              <Route path='/' element={<Landing/>}/>
              <Route path='/about' element={<About/>}/>
              <Route path='/activity' element={<SubmissionActivityList/>}/>
              <Route path='/problems' element={<ProblemList problemList = {problemList}/>}/>
            </Routes>
          </Router>  
      </div>
    </div>
  )
}

export default App
