import React, { createContext, useEffect, useState } from "react";
import { useHistory } from 'react-router-dom'
import api, { loginUser } from '../api'

const AuthContext = createContext();
console.log("create AuthContext: " + AuthContext);

// THESE ARE ALL THE TYPES OF UPDATES TO OUR AUTH STATE THAT CAN BE PROCESSED
export const AuthActionType = {
    GET_LOGGED_IN: "GET_LOGGED_IN",
    REGISTER_USER: "REGISTER_USER",
    LOGIN_USER: "LOGIN_USER",
    LOGOUT_USER: "LOGOUT_USER",
    SIGN_IN_ERROR: "SIGN_IN_ERROR"
}

function AuthContextProvider(props) {
    const [auth, setAuth] = useState({
        user: null,
        loggedIn: false,
        error: false,
        errorMessage: null
    });
    const history = useHistory();

    useEffect(() => {
        auth.getLoggedIn();
    }, []);

    const authReducer = (action) => {
        const { type, payload } = action;
        switch (type) {
            case AuthActionType.GET_LOGGED_IN: {
                return setAuth({
                    user: payload.user,
                    loggedIn: payload.loggedIn,
                    error: false,
                    errorMessage: null
                });
            }
            case AuthActionType.REGISTER_USER: {
                return setAuth({
                    user: payload.user,
                    loggedIn: true,
                    error: false,
                    errorMessage: null
                })
            }
            case AuthActionType.LOGIN_USER: {
                return setAuth({
                    user: payload.user,
                    loggedIn: true,
                    error: false,
                    errorMessage: null
                })
            }
            case AuthActionType.LOGOUT_USER: {
                return setAuth({
                    user: null,
                    loggedIn: false,
                    error: false,
                    errorMessage: null
                })
            }
            case AuthActionType.SIGN_IN_ERROR: {
                return setAuth({
                    user: null,
                    loggedIn: false,
                    error: payload.error,
                    errorMessage: payload.errorMessage
                })
            }
            case AuthActionType.SET_LOGGED_IN: {
                return setAuth({
                    user: payload.user,
                    loggedIn: payload.loggedIn,
                    error: false,
                    errorMessage: null
                })
            }
            default:
                return auth;
        }
    }

    auth.handleError = function (msg) {
        authReducer({
            type:AuthActionType.SIGN_IN_ERROR,
            payload: {
                error: !(auth.error),
                errorMessage: msg 
            }
        });
    }

    auth.getLoggedIn = async function () {
        try{
            const response = await api.getLoggedIn();
                authReducer({
                    type: AuthActionType.SET_LOGGED_IN,
                    payload: {
                        loggedIn: response.data.loggedIn,
                        user: response.data.user
                    }
                });
        }
        catch(err){
        
        }
    }

    auth.logoutUser = async function(){
        try {
            const response = await api.logoutUser();
            if (response.status === 200 || response.status === 304){
                console.log("successfully logging out");
                authReducer({
                    type: AuthActionType.LOGOUT_USER
                });
                history.push("/");
            }
        }
        catch(err){
            console.log("error logging out");
            console.log(err.response.data.errorMessage);

        }

    }

    auth.loginUser = async function(userData, store){
        try{
            const response = await api.loginUser(userData);
            if (response && response.status === 200) {
                authReducer({
                    type: AuthActionType.LOGIN_USER,
                    payload: {
                        user: response.data.user
                    }
                })
                history.push("/");
                store.loadIdNamePairs();
            }
        }
        catch(err){
            console.log("message: " + err.response.data.errorMessage);
            auth.handleError(err.response.data.errorMessage);
        }   
    }

    auth.registerUser = async function(userData, store) {
        try{
            const response = await api.registerUser(userData);      
            if (response && response.status === 200) {
                authReducer({
                    type: AuthActionType.REGISTER_USER,
                    payload: {
                        user: response.data.user
                    }
                })
                history.push("/");
                store.loadIdNamePairs();
            }
        }
        catch(err) {
            auth.handleError(err.response.data.errorMessage);
        }
    }

    

      

    return (
        <AuthContext.Provider value={{
            auth
        }}>
            {props.children}
        </AuthContext.Provider>
    );
}

export default AuthContext;
export { AuthContextProvider };