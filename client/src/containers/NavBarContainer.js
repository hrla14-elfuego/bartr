import { connect } from 'react-redux'
import { loginRequest, logoutSuccess, setToken } from '../actions/auth0';
import NavBar from '../components/NavBar';

const mapStateToProps = (state) => {
  const { isAuthenticated, profile, error } = state.auth;
  return {
    isAuthenticated,
    profile,
    error
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLoginClick: () => dispatch(loginRequest()),
    onLogoutClick: () => { console.log('hey were dispatching') 
    return dispatch({type: 'LOGOUT_SUCCESS'})}
  }
}

const NavBarContainer = connect(mapStateToProps, mapDispatchToProps)(NavBar);

export default NavBarContainer;
