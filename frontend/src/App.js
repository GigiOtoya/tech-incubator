import './App.css';
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"
import Home from './components/Home'
import Tasks from './components/Tasks'
import Login from './components/Login'
import { applyActionCode, signOut } from 'firebase/auth';
import { auth } from './firebase-config'
import { FirebaseError } from 'firebase/app';

function App() {
  const [isAuth, setIsAuth] = useState(localStorage.getItem('isAuth'))

  const signUserOut = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      setIsAuth(false);
      window.location.pathname='/';
    });
  };

  const getName = () => {
    
  }
  return(
    <Router>
      <nav>
        <Link to={'/'} className='home'> 
          <img src={require('./components/Task.png')}></img>Tech Incubator
        </Link>
        {
          !isAuth ? ( 
            <Link to={'/Login'} className='login'> Login </Link>
          ):(
            <>
             <Link to={'/tasks'} className='tasks'> Tasks </Link>
             <button onClick={signUserOut} className='logout'> Logout </button>
             <b> Hi! </b>
            </>
          )
        }
      </nav>
      <Routes>
        <Route path="/" element={<Home isAuth={isAuth}/>}/>
        <Route path="/tasks" element={<Tasks isAuth={isAuth}/>}/>
        <Route path="/login" element={<Login setIsAuth={setIsAuth}/>}/>
      </Routes>
    </Router>
  )
}

export default App