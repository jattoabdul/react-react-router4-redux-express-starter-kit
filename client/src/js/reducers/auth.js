import { cloneDeep } from 'lodash';
import {
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  GET_USERS_SUCCESS,
  GET_USERS_FAIL,
  LOGOUT_USER } from '../constants';

  // initial application states for this auth reducers
  const initialState = {
    isAuthenticated: false,
    token: '',
    currentUserData: {},
    allUsersData: [],
    successMessage: '',
    errorMessage: ''
  };

  // the reducer method that only recieves the initial state
  // the action (type and payload) as an object
  const authData = (state = initialState, action) => {
    // cloning the state because react repels mutating state
    const newState = cloneDeep(state);

    // deconstructuring the type and possible payload from the action
    const { type, token, currentUserData, allUsersData, successMessage, errorMessage } = action;

    // a switch statement to define the changes to be made with the data in the state
    // for any particular type as a case
    switch (type) {
      case LOGIN_USER_SUCCESS:
        return {
          ...newState,
          isAuthenticated: true,
          token,
          currentUserData,
          successMessage
        }
      case LOGIN_USER_FAIL:
        return {
          ...newState,
          isAuthenticated: false,
          token: '',
          currentUserData: {},
          errorMessage
        }
      case GET_USERS_SUCCESS:
        return {
          ...newState,
          allUsersData,
          successMessage
        }
      case GET_USERS_FAIL:
        return {
          ...newState,
          errorMessage
        }
      case LOGOUT_USER:
        return {
          ...newState,
          isAuthenticated: false,
          token: '',
          currentUserData: {}
        }
    
      default:
        return newState;
    }
  }

export default authData;
