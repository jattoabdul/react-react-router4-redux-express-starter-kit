import axios from 'axios';
import {
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  GET_USERS_SUCCESS,
  GET_USERS_FAIL,
  LOGOUT_USER } from '../constants';

  export function loginAction (res) {
    return {
      type: LOGIN_USER_SUCCESS,
      token: res.token,
      currentUserData: res.data,
      successMessage: res.message
    }
  };

  export function loginFailAction (res){
    return {
      type: LOGIN_USER_FAIL,
      errorMessage: res.error
    }
  };

  export function logoutAction () {
    return {
      type: LOGOUT_USER
    }
  };

  export const loginActionCreator = ({ username, password }) => dispatch => {
      const request = axios({
        method: 'POST',
        data: { username, password },
        url: '/api/v1/signin'
      });

      return request.then(
        (response) => {
          console.log(response)
          sessionStorage.setItem('user', response.token);
          dispatch(loginAction(response));
        }
      ).catch((error) => {
        return dispatch(loginFailAction(response));
      });
  };

  export const logoutActionCreator = () => dispatch => {
      sessionStorage.removeItem('user');
      dispatch(logoutAction());
  };