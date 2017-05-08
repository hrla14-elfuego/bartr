import { connect } from 'react-redux';
import { checkLogin } from '../actions/Auth0Actions';
import App from '../components/App';

const mapDispatchToProps = (dispatch) => {
  return {
    checkLogin: () => dispatch(checkLogin())
  }
}

const AppContainer = connect(null, mapDispatchToProps)(App);

export default AppContainer;