import * as actionTypes from '../actions/actionTypes';
import updatedObject from '../utility';

const initState = {
  userId: null,
  user: null, 
  token: null,
  errorUp: null,
  errorIn: null,
  loading: null,
  redirect: '/home',
  successfulSignUp: false,
  signedIn: false
}

//Start
  const authStart = (state, action) => {
    return updatedObject(state, {errorUp: null, errorIn: null, loading: true})
  }

//Logout 
  export const authLogout = (state, action) => {
    return updatedObject(state, { token: null, loading: null, userId: null, redirect: '/home', signedIn: false })
  }

//Store User
  const authStoreUser = (state, action) => {
    return updatedObject(state, { userId: action.userId, user: action.userName  })
  }

//Sign Up
    const authSignUpSuccess = (state, action) => {
      return updatedObject(state, {errorUp: null, loading: false, successfulSignUp: true })
    }
    const authSignUpFail = (state, action) => {
      return updatedObject(state, {errorUp: action.error, loading: false, })
    }

//Sign In
  const authSignInSuccess = (state, action) => {
    return updatedObject(state, { token: action.token, userId: action.userId, errorIn: null, loading: null, redirect: '/all', signedIn: true })
  }
  const authSignInFail = (state, action) => {
    return updatedObject(state, { loading: null, errorIn: action.error })
  }


//Clears
  const authClearSignUp = (state, action) => {
    return updatedObject(state, {successfulSignUp: false})
  }

  const clearErrorMessage = (state, action) => {
    return updatedObject(state, { errorUp: null, errorIn: null })
  }



const authReducer = (state = initState, action) => {
  switch (action.type){
    case actionTypes.AUTH_START: return authStart(state, action);
    case actionTypes.AUTH_LOGOUT: return authLogout(state, action);
    case actionTypes.AUTH_SIGNUP_SUCCESS: return authSignUpSuccess(state, action)
    case actionTypes.AUTH_SIGNUP_FAIL: return authSignUpFail(state, action)
    case actionTypes.AUTH_SIGNIN_SUCCESS: return authSignInSuccess(state,action)
    case actionTypes.AUTH_SIGNIN_FAIL: return authSignInFail(state,action)
    case actionTypes.AUTH_STORE_USER: return authStoreUser(state, action);
    case actionTypes.AUTH_CLEAR_SIGNUP: return authClearSignUp(state, action)
    case actionTypes.AUTH_CLEAR_ERROR: return clearErrorMessage(state, action)
    default:
      return state;
  }
}

export default authReducer;