import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { HashRouter as Router,
  Route, Switch, Redirect } from 'react-router-dom';

import '../assets/styles/index.scss';

import Home from './components/Home';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import NotFound from './components/NotFound';

import configureStore from './stores/configureStore';

const store = configureStore();

const app = document.getElementById('root');

/**
 * check sessionStorage for authed user
 * @param {void} void
 * @return {object} authState
 */
const isAuthenticated = () => {
  const authState = sessionStorage.getItem('user') !== null;
  return authState;
};

// React Router that defines Routes and Wrapped with Redux store Provider
render(
  <Provider store={store}>
    <Router>
      <Switch>
        <Route
          exact
          path="/"
          render={props =>
            (isAuthenticated() ? (<Redirect to={{ pathname: '/dashboard' }} />)
              : (<Home {...props} />))}
        />
        <Route
          path="/login"
          render={props =>
            (isAuthenticated() ? (<Redirect to={{ pathname: '/dashboard' }} />)
              : (<Login {...props} />))}
        />
        <Route
          path="/dashboard"
          render={props =>
            (isAuthenticated() ? (<Dashboard {...props} />)
              : (<Redirect to={{ pathname: '/login' }} />))}
        />
        <Route component={NotFound} />
      </Switch>
    </Router>
  </Provider>, app);