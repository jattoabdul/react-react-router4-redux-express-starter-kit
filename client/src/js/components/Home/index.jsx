import React from 'react';
import { Link, withRouter } from 'react-router-dom';

/**
 * Display Home
 * @class Home
 * @param {any} props
 * @return {dom} DomeElement
 */
const Home = () => (
  <div className="homeContainer">
    <div className="welcome">
      <p>Welcome to React-Redux</p>
      <Link to="/login" className="btn">
        Login
      </Link>
    </div>
  </div>
);

export default withRouter(Home);