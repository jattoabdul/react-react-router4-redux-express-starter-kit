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
   * Creates an instance of Dashboard
   * 
   * @param {any} props
   * 
   * @memberof Dashboard
   * 
   * @return {void}
   */
  constructor(props) {
    super(props);
    // binding method for this component class
    this.onLogout = this.onLogout.bind(this);
    this.closeError = this.closeError.bind(this);
    // setting component specific state
    this.state = {
      username: '',
      fullName: '',
      errorMessage: '',
      isLoading: false,
      hasError: false
    };
  }

  /**
   * On Initial Component Mounting
   * We are setting the current component state with the value in our store
   * provided to us in this component by react as props (this.props) object
   * 
   * NB:
   * We could simply get this data in our render method
   * and display back to the user from the props
   * 
   * @return {void}
   * @param {object} nextProps
   */
  componentWillMount() {
    this.setState({ 
      username: this.props.authData.currentUserData.data.username,
      fullName: this.props.authData.currentUserData.data.fullName
     });
  }
  /**
   * On reciept of data or in event of data change/modification, in the store
   * react send the new props as nextProps to this lifecycle method
   * We are simply setting the current component state with the new data coming
   * 
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
   * This dispatches our logutActionCreator from our actions
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
    // NB: We could get the username and full name from the (this.props) object directly here
    // like this: const {username, fullName } = this.props.authData.currentUserData.data

    // deconstructuring the username and fullName from the current component state
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

// Defining Proptypes
Dashboard.propTypes = {
  logoutActionCreator: PropTypes.func.isRequired,
  authData: PropTypes.objectOf(String).isRequired,
  history: PropTypes.objectOf(String).isRequired
};

// Connecting component to the desired actioncreator from our actions
const mapDispatchToProps = {
  logoutActionCreator
};

/**
 * Connecting the data from our store state to this component to be accesible as props
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

// connecting component to redux
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Dashboard));
