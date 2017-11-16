import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import Spinner from 'react-spinner-material';
import {
  logoutActionCreator
} from '../../actions/auth';

/**
 * Display Dashboard
 * 
 * @class Dashboard
 * 
 * @extends {React.Component}
 * 
 * @param {any} props
 */
export class Dashboard extends React.Component {
  /**
   * Creates an instance of Login
   * 
   * @param {any} props
   * 
   * @memberof Login
   * 
   * @return {void}
   */
  constructor(props) {
    super(props);
    this.onLogout = this.onLogout.bind(this);
    this.closeError = this.closeError.bind(this);
    this.state = {
      username: '',
      fullName: '',
      errorMessage: '',
      isLoading: false,
      hasError: false
    };
  }

  componentWillMount() {
    this.setState({ 
      username: this.props.authData.currentUserData.data.username,
      fullName: this.props.authData.currentUserData.data.fullName
     });
  }
  /**
   * @return {void}
   * @param {object} nextProps
   */
  componentWillReceiveProps(nextProps) {
    this.setState({ 
      username: nextProps.authData.currentUserData.data.username,
      fullName: nextProps.authData.currentUserData.data.fullName
     });
  }

  /**
   * onLogoutUser Method
   * 
   * @param {event} event
   * 
   * @return {void} 
   */
  onLogout(event) {
    event.preventDefault();
    this.props.logoutActionCreator();
    // redirecting
    this.props.history.push('/login');
  }

  /**
   * closeError Method - flash message error
   * 
   * @param {event} event
   * 
   * @return {void} 
   */
  closeError(event) {
    event.preventDefault();
    this.setState({
      hasError: false
    });
  }

  /**
   * Render Method
   * 
   * @return {dom} DomElement
   */
  render() {
    const { username, fullName } = this.state;
    return (
      <div id="dashboardContainer" className="dashboard-container">
        <div>
        <p>Welcome {username}</p>
        <p>Your fullName is {fullName}</p>
        <button onClick={this.onLogout}>
          Logout
        </button>
        </div>  
      </div>
    );
  }
}

Dashboard.propTypes = {
  logoutActionCreator: PropTypes.func.isRequired,
  authData: PropTypes.objectOf(String).isRequired,
  history: PropTypes.objectOf(String).isRequired
};

const mapDispatchToProps = {
  logoutActionCreator
};

/**
 * 
 * @param {object} Authdata
 * 
 * @return {object} authData 
 */
function mapStateToProps({ authData }) {
  return {
    authData
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Dashboard));
