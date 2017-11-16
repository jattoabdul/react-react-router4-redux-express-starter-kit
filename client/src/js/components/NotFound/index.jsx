import React from 'react';
import { Link, withRouter } from 'react-router-dom';

/**
 * Display Home
 * @class Home
 * @param {any} props
 * @return {dom} DomeElement
 */
const NotFound = () => (
  <div className="errorContainer">
    <div className="welcome">
      <p>ERROR 404</p>
      <p>Page Not Found</p>
      <Link to="/home" className="btn">
        Login
      </Link>
    </div>
  </div>
);

export default withRouter(NotFound);