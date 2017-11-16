import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import Spinner from 'react-spinner-material';
import {
  loginActionCreator
} from '../../actions/auth';

/**
 * Display Login
 * 
 * @class Login
 * 
 * @extends {React.Component}
 * 
 * @param {any} props
 */
export class Login extends React.Component {
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
    this.onLoginUser = this.onLoginUser.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.closeError = this.closeError.bind(this);
    this.state = {
      username: '',
      password: '',
      errorMessage: '',
      isLoading: false,
      hasError: false
    };
  }

  /**
   * @return {void}
   * @param {object} nextProps
   */
  componentWillReceiveProps(nextProps) {
    if (this.props.authData.isAuthenticated !== nextProps.authData.isAuthenticated) {
      location.href = '#/dashboard';
    }

    if (nextProps.error !== '') {
      this.setState({ isButtonDisabled: false, errorMessage: nextProps.error });
    }
  }

  /**
   * onChange Method
   * 
   * @param {event} event
   * 
   * @return {void}
   */
  onChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  /**
   * onFocus method
   * 
   * @param {void} void
   * 
   * @return {void}
   */
  onFocus() {
    this.setState({ errorMessage: '' });
  }

  /**
   * onLoginUser Method
   * this dispatches the loginActionCreator in our actions file
   * 
   * @param {event} event
   * 
   * @return {void} 
   */
  onLoginUser(event) {
    event.preventDefault();
    let { username, password } = this.state;
    username = username.trim();
    password = password.trim();
    if (username !== '' && password !== '') {
      this.setState({ isLoading: true });
      this.props.loginActionCreator({ username, password }).then(
        () => {
          this.setState({ isLoading: false });
          // redirecting
          this.props.history.push('/dashboard');
      });
    } else {
      this.setState({ 
        errorMessage: 'Error: One or more fields are empty',
        isLoading: false
      });
    }
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
    return (
      <div id="loginContainer" className="login-container">
        <div id="loginFormContainer" className="login-form">
            <form
              onSubmit={this.onLoginUser}
              id="loginForm"
              className="row"
            >
              <p className="flow-text"> &nbsp; Sign In</p>
              {this.state.hasError &&
                <div
                  className="chip red white-text center"
                  style={{ width: '20rem' }}
                >
                  {this.state.errorMessage}
                  <i
                    className="close material-icons"
                    tabIndex={-1}
                    role="button"
                    onClick={this.closeError}
                  >
                    close
                  </i>
                </div>}
              <div className="input-field col s12">
                <input
                  onFocus={this.onFocus}
                  type="text"
                  id="username_login"
                  name="username"
                  value={this.state.username}
                  onChange={this.onChange}
                  maxLength="15"
                  pattern="(?=^.{6,15}$)(?!.*\s).*$"
                  required
                />
                <label htmlFor="username_login">Username</label>
              </div>
              <div className="input-field col s12 no-padding">
                <input
                  onFocus={this.onFocus}
                  type="password"
                  id="password_login"
                  name="password"
                  value={this.state.password}
                  onChange={this.onChange}
                  pattern="(?=^.{6,12}$)(?!.*\s).*$"
                  title="6 to 12 characters required"
                  required
                />
                <label htmlFor="password_login">Password</label>
                <span>
                  <Link to="/resetpassword" className="forgotPass">
                    forgot password
                  </Link>
                </span>
              </div>
              <div className="input-field col s12">
                {!this.state.isLoading &&
                <button
                  className="btn waves-effect waves-light"
                  type="submit"
                >
                  sign in
                </button> }
                {this.state.isLoading &&
                  <Spinner
                    size={40}
                    spinnerColor={'#fff'}
                    spinnerWidth={2}
                    visible
                  />}
                <br /><br />
                <p>
                  &nbsp;
                  <Link to="/register" className="alternative">
                    Don&rsquo;t have an Account? &nbsp;
                    <span>SIGN UP NOW</span>
                  </Link>
                </p>
                <p>
                  <Link to="/" className="alternative">
                    <span>Go Home</span>
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
    );
  }
}

// Define Proptypes
Login.propTypes = {
  loginActionCreator: PropTypes.func.isRequired,
  authData: PropTypes.objectOf(String).isRequired,
  history: PropTypes.objectOf(String).isRequired
};

// connect to your required actions for this component
const mapDispatchToProps = {
  loginActionCreator
};

/**
 * connect to the required state of data in the store
 * for this component
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

// connect to redux
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login));
