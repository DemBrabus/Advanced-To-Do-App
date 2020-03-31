import axios from 'axios'
import axiosInstance from '../../axios-data';
import * as actionTypes from './actionTypes';

//Start ------
  const authStart = () => {
    return {
      type: actionTypes.AUTH_START
    }
  }

//Clears ------
  export const clearError = () => {
    return {
      type: actionTypes.AUTH_CLEAR_ERROR
    }
  }
  export const clearSignUp = () => {
    return {
      type: actionTypes.AUTH_CLEAR_SIGNUP
    }
  }


//Check Auth Timeout -------
  export const checkAuthTimeout = (expiration) => {
    return dispatch => {
      setTimeout(() => {
      dispatch(logout())
    }, expiration * 1000);}
  }


//Logout -------
  export const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('expiration')
    localStorage.removeItem('userId')
    return {
      type: actionTypes.AUTH_LOGOUT
    }
  }


//Sign Up ------
  const authSignUpSuccess = () => {
    return {
      type: actionTypes.AUTH_SIGNUP_SUCCESS
    }
  }
  const authSignUpFailed = (error) => {
    return {
      type: actionTypes.AUTH_SIGNUP_FAIL,
      error: error
    }
  }


//Sign In ------
  const authSignInSuccess = (token, userId) => {
    return {
      type: actionTypes.AUTH_SIGNIN_SUCCESS,
      token: token,
      userId: userId
    }
  }
  const authSignInFailed = (error) => {
    return {
      type: actionTypes.AUTH_SIGNIN_FAIL,
      error: error
    }
  }


//Store User
  const authStoreUser = (user) => {
    const userId = user.userId;
    const firstName = user.firstName;
    const lastName = user.lastName;
    return {
      type: actionTypes.AUTH_STORE_USER,
      userId: userId,
      userName: `${firstName} ${lastName}`
    }
  }


//Get User
  const authGetUser = (userId) => {
    return dispatch => {
      axios.get('https://adv-to-do.firebaseio.com/users.json')
        .then(response => {
          let user = {};
          for(let key in response.data){
            if(response.data[key].userId === userId){
              user = { ...response.data[key] }
            }
          }
          
          dispatch(authStoreUser(user))
        })
        .catch(error => {
          console.log(error);
          
        })
    }
  }
  


//Add New User
  const authAddUserToData = (userId, firstName, lastName) => {
    return dispatch => {
      const newUserData = {
        userId: userId,
        firstName: firstName,
        lastName: lastName
      }
      axiosInstance.post('/users.json', newUserData)
        .then(response => {
          // console.log('new User Data: ', response.data);
        })
        .catch(error => {
          console.log('new User Error: ', error.data.error);
        })
    }
  }


//Auth Sign Up
  export const authSignUp = (firstName, lastName, email, password) => {
    return dispatch => {
      dispatch(authStart())
      const authData = {
        email: email,
        password: password,
        returnSecureToken: true
      }
      // console.log(authData);
      
      let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBvFh4ZeUvoMq25t6joLnZoiBvJHDNR3rg';
      axios.post(url, authData)
        .then(response => {
          dispatch(authAddUserToData(response.data.localId, firstName, lastName))
          dispatch(authSignUpSuccess())
        })
        .catch(error => {
          dispatch(authSignUpFailed(error.response.data.error.message))
        })
    }
  }


//Auth Sign In 
  export const authSignIn = (email, password) => {
    return dispatch => {
      dispatch(authStart())
      const authData = {
        email: email,
        password: password,
        returnSecureToken: true
      };
      axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBvFh4ZeUvoMq25t6joLnZoiBvJHDNR3rg', authData)
        .then(response => {
          
          const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
          localStorage.setItem('token', response.data.idToken);
          localStorage.setItem('userId', response.data.localId);
          localStorage.setItem('expiration', expirationDate);
          dispatch(authSignInSuccess(response.data.idToken, response.data.localId))
          dispatch(authGetUser(response.data.localId))
        })
        .catch(error => {
          console.log(error);
          dispatch(authSignInFailed(error.response.data.error.message))
        })
    }
  }


//Check Auth --------
  export const checkAuthState = () => {
    return dispatch => {
      const token = localStorage.getItem('token');
      if(!token){
        dispatch(logout())
      } else {
        const expirationDate = new Date(localStorage.getItem('expiration'));
        if(expirationDate < new Date()){
          logout()
        } else {
          const userId = localStorage.getItem('userId');
          dispatch(authSignInSuccess(token, userId));
          dispatch(authGetUser(userId))
          dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000))
        }
      }
    }
  }