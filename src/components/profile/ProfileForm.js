import './ProfileForm.css'
import {useRef, useContext} from 'react'
import AuthContext from '../../store/auth-context'

import axios from 'axios'

const ProfileForm = () => {
    
    const newPasswordInputRef = useRef()
    const newNicknameInputRef = useRef()

    const authCxt = useContext(AuthContext)
    
    
    const changePasswordHandler = (event) =>{
        event.preventDefault()
        const URL = 'https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyD7a8bSmuRMCQy271QVQ42Qptjg9PWq41E'
        const payload = {
            idToken: authCxt.token,
            password: newPasswordInputRef.current.value,
            returnSecureToken: true
        }

        axios.post(URL, payload)
            .then(response => {
                authCxt.login(response.data.idToken, null);
            }).catch(err => {
                console.log(err)
            })
    }
    
    const changeNameHandler = (event) =>{
        event.preventDefault()
        const URL = 'https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyD7a8bSmuRMCQy271QVQ42Qptjg9PWq41E'
        const payload = {
            idToken: authCxt.token,
            displayName: newNicknameInputRef.current.value,
            photoUrl:'',
            returnSecureToken: true
        }

        axios.post(URL, payload)
            .then(response => {
                authCxt.login(authCxt.token,response.data.displayName );
            }).catch(err => {
                console.log(err)
            })
    }

    return (
        <>
            <form className='form' onSubmit={changeNameHandler}>
                <div className='control'>
                    <label htmlFor='name'>Nickname</label>
                    <input type='text' id='name' ref={newNicknameInputRef}/>
                </div>
                <div className='action'>
                    <button>Change Nickname</button>
                </div>
            </form>


            <form className='form' onSubmit={changePasswordHandler}>
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