import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, IndexRedirect, hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers/index';
import createStoreWithMiddleware from './store';

import AppContainer from './containers/AppContainer';
import Main from './components/Main';
import Home from './components/Home';
import UserProfile from './components/UserProfile';
import PastEngagements from './components/PastEngagements';
import EditProfile from './components/EditProfile';
import AuthService from './utils/AuthService';



class Routing extends React.Component {

  render() {

    const auth = new AuthService('UdN-x_zIrEAok74rlhBGRDHcdJzASbC5', 'bartr.auth0.com');
    // validating authentication
    const requireAuth = (nextState, replace) => {
      if (!AuthService.loggedIn()) {
        replace({
          pathname: '/home'
        })
      }
    }

    // creating store and history
    const store = createStoreWithMiddleware();
    const history = syncHistoryWithStore(hashHistory, store);
    
    return (
      <Provider store={store}>
        <Router history={history}>
          <Route path='/' component={AppContainer}>
            {/*<IndexRoute component={Home}/>*/}
            <IndexRedirect to='/home'/>
            <Route path='/home' component={Home}/>
            <Route path='/profile' component={UserProfile} onEnter={requireAuth}/>
            <Route path='/editprofile' component={EditProfile}/>
            <Route path='/pastengagements' component={PastEngagements}/>
          </Route>
        </Router>
      </Provider>
    )
  }
}

ReactDOM.render(<Routing/>, document.getElementById('app'));