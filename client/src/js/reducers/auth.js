import { cloneDeep } from 'lodash';
import {
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  GET_USERS_SUCCESS,
  GET_USERS_FAIL,
  LOGOUT_USER } from '../constants';

  const initialState = {
    isAuthenticated: false,
    token: '',
    currentUserData: {},
    allUsersData: [],
    successMessage: '',
    errorMessage: ''
  };

  const authData = (state = initialState, action) => {
    const newState = cloneDeep(state);
    const { type, token, currentUserData, allUsersData, successMessage, errorMessage } = action;
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
