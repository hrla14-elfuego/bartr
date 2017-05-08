import { connect } from 'react-redux';
import { loginRequest, logoutSuccess, checkLogin } from '../actions/Auth0Actions';
import Home from '../components/Home';


const mapStateToProps = (state) => {
  const { isAuthenticated, profile, error } = state.Auth0
  return {
    isAuthenticated,
    profile,
    error
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
     onLoginClick: () => {
      dispatch(loginRequest())
    },
    onLogoutClick: () => {
      dispatch(logoutSuccess())
    }
  }
};

const HomeContainer = connect(mapStateToProps, mapDispatchToProps)(Home);

export default HomeContainer;