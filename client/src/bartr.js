import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import { Provider } from 'react-redux';
import { createStore, applyMiddleWare } from 'redux';
import Promise from 'redux-promise';

import App from './components/App';
import Main from './components/Main';
import SignUp from './components/SignUpLogin/SignUp';
import Login from './components/SignUpLogin/Login';
import Home from './components/Home';
import UserProfile from './components/UserProfile';
import PastEngagements from './components/PastEngagements';
import EditProfile from './components/EditProfile';
import store, { history } from './store';



class Routing extends React.Component {
  constructor() {
    super();

  }
  render() {
    return (
      <Provider store={store}>
        <Router history={history}>
          <Route path='/' component={App}>
            <IndexRoute component={Home}></IndexRoute>
            <Route path='/login' component={Login}></Route>
            <Route path='/signup' component={SignUp}></Route>
            <Route path='/profile' component={UserProfile}></Route>
            <Route path='/editprofile' component={EditProfile}></Route>
            <Route path='/pastengagements' component={PastEngagements}></Route>
          </Route>
        </Router>
      </Provider>
    )
  }
}

ReactDOM.render(<Routing/>, document.getElementById('app'));