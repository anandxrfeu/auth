import './ProfileForm.css'
import {useRef, useContext} from 'react'
import AuthContext from '../../store/auth-context'
import {Navigate} from 'react-router-dom'

import axios from 'axios'

const ProfileForm = () => {
    
    const newPasswordInputRef = useRef()

    const authCxt = useContext(AuthContext)

    const URL = 'https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyD7a8bSmuRMCQy271QVQ42Qptjg9PWq41E'
    
    
    
    const submitHandler = (event) =>{
        event.preventDefault()
        
        const payload = {
            idToken: authCxt.token,
            password: newPasswordInputRef.current.value,
            returnSecureToken: true
        }

        axios.post(URL, payload)
            .then(response => {
                console.log(response.data)
                //authCxt.login(response.data.idToken);
                //console.log(authCxt.token)
            }).catch(err => {
                console.log(err)
            })
    }
    
    return (
        <>
            <form className='form' onSubmit={submitHandler}>
            <div className='control'>
                <label htmlFor='new-password'>New Password</label>
                <input type='password' id='new-password' ref={newPasswordInputRef}/>
            </div>
            <div className='action'>
                <button>Change Password</button>
            </div>
            </form>
        </>
      );
    }

export default ProfileForm