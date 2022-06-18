import React, {useState} from 'react';

//Create context and initialize it
const AuthContext = React.createContext({
    token: '',
    isLoggedIn: false,
    login: (token) => {},
    logout: () => {}
});

// Add context providor component
export const AuthContextProvider = (props) => {
    const initialToken = localStorage.getItem('token')
    const [token, setToken] = useState(initialToken)
    
    const userIsLoggedIn = !!token; //convers a truthy or falsy value to boolean value
    
    const loginHandler = (token) => {
        setToken(token)
        localStorage.setItem('token',token)
    };
    
    const logoutHandler = () => {
        setToken(null)
        localStorage.removeItem('token')
    };

    // set Context Value
    const contextValue = {
        token: token,
        isLoggedIn: userIsLoggedIn,
        login: loginHandler,
        logout: logoutHandler
    }

    return (
        <AuthContext.Provider value={contextValue}>
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthContext;