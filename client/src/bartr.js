import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, IndexRedirect, hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers/index';
import createStoreWithMiddleware from './store';

import AppContainer from './containers/AppContainer';
import HomeContainer from './containers/HomeContainer';
import ProfileContainer from './containers/ProfileContainer';
import PastEngagements from './components/PastEngagements';
import EngageReq from './components/EngageReq';
import EditProfile from './components/EditProfile';
import AuthService from './utils/AuthService';
import GoogleMapContainer from './components/GoogleMapsContainer';
import '../../node_modules/sweetalert/dist/sweetalert.css'



class Routing extends React.Component {

  render() {

    // const auth = new AuthService('UdN-x_zIrEAok74rlhBGRDHcdJzASbC5', 'bartr.auth0.com');
    // // validating authentication
    // const requireAuth = (nextState, replace) => {
    //   if (!AuthService.loggedIn()) {
    //     replace({
    //       pathname: '/home'
    //     })
    //   }
    // }

    // creating store and history
    const store = createStoreWithMiddleware();
    const history = syncHistoryWithStore(hashHistory, store);
    
    return (
      <Provider store={store}>
        <Router history={history}>
          <Route path='/' component={AppContainer}>
            {/*<IndexRoute component={Home}/>*/}
            <IndexRedirect to='/home'/>
            <Route path='/home' component={HomeContainer}/>
            <Route path='/profile' component={ProfileContainer}/>
            <Route path='/currentengagements' component={EngageReq}/>
            <Route path='/map' component={GoogleMapContainer}/>
            <Route path='/editprofile' component={EditProfile}/>
            <Route path='/pastengagements' component={PastEngagements}/>
          </Route>
        </Router>
      </Provider>
    )
  }
}

// ReactDOM.render(<Routing/>, document.getElementById('app'));

export default Routing;

