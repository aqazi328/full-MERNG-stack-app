import React, {createContext, useReducer} from 'react';
import jwtDecode from 'jwt-decode';

const initialState = {
    user: null
}

if(localStorage.getItem('jwtToken')){
    console.log(true);
    initialState.user = jwtDecode(localStorage.getItem('jwtToken'));
    console.log(initialState.user);
}

const AuthContext = createContext({
    user: null,
    login: (user_data) => {},
    logout: () => {}
});

function authReducer(state, action){
    switch (action.type) {
        case 'LOGIN':
            return{
                ...state,
                user: action.payload
            }
        case "LOGOUT":
            return{
                ...state,
                user: null
            }
        default:
            return state;
    }
}

function AuthProvider(props){
    const [state, dispatch] = useReducer(authReducer, initialState);
    
    function login(user_data){
        localStorage.setItem("jwtToken", user_data.token)
        dispatch({
            type: 'LOGIN',
            payload: user_data
        })
    }
    function logout(){
        localStorage.removeItem("jwtToken")
        dispatch({
            type: 'LOGOUT'
        })
    }

    return(
        <AuthContext.Provider value={{user: state.user, login, logout}}
        {...props}
        />
    )
}

export {AuthContext, AuthProvider}