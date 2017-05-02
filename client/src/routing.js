import React from 'react';

class Routing extends React.Component {
  render() {
    return (
      <Router history={browserHistory}>
        <Route path='/' component={Main}>
          <IndexRoute component={Home}></IndexRoute>
          <Route path='/login' component={Login}></Route>
          <Route path='/signup' component={SignUp}></Route>
        </Route>
      </Router>
    )
  }
}

export default Routing;