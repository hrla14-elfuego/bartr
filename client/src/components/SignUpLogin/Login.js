import React from 'react';
import { Link } from 'react-router';
 
class Login extends React.Component {
  render() {
    return (
      <div style={{textAlign: 'center'}}>
        <h1>Login</h1>
        <form>
          <input type="text"/>
          <br/>
          <input type="text"/>
          <br/>
          <button>Login</button>
        </form>
        <Link to='signup'>Not a user?</Link>
      </div>
    )
  }
}

export default Login;