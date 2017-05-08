import { connect } from 'react-redux';
import { loginRequest, logoutSuccess, checkLogin } from '../actions/Auth0Actions';
import Home from '../components/Home';
import { bindActionCreators } from 'redux';
import * as authActions from '../actions/Auth0Actions'
import * as authSelectors from '../auth/Auth0Selectors'

const mapStateToProps = (state) => {
  return {
    profile: authSelectors.getProfile(state),
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({ ...authActions }, dispatch),
  }
};

const HomeContainer = connect(mapStateToProps, mapDispatchToProps)(Home);

export default HomeContainer;