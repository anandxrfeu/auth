import { useEffect, useContext } from 'react';
import AuthContext from '../../store/auth-context';
import { Link } from 'react-router-dom';
import './MainNavigation.css'
import axios from 'axios';

const MainNavigation = () => {

  const authCxt = useContext(AuthContext)
  const isLoggedIn = authCxt.isLoggedIn
  
  useEffect (()=>{
    const payload = {
      idToken: authCxt.token
    }
    authCxt.token && axios.post('https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyD7a8bSmuRMCQy271QVQ42Qptjg9PWq41E',payload)
      .then(response => {
        console.log(response.data)
      })
      .catch(err => {
        console.log(err)
      })

  },[authCxt.token])

  const logoutHandler = () => {
    authCxt.logout()
  }

  return (
    <header className='header'>
      <Link to='/'>
        <div className='logo'>Auth Proof Of Concept</div>
      </Link>
      <nav>
        <ul>
        {!isLoggedIn && (
          <li>
            <Link to='/login'>Login</Link>
          </li>
        )}
        {isLoggedIn  && (
          <li>
            <Link to='/profile'>Profile</Link>
          </li>
        )}

        {isLoggedIn  && (
          <li>
            <button onClick={logoutHandler}>Logout</button>
          </li>
        )}
          
          
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;