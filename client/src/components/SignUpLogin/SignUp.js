import React from 'react';
import { Link } from 'react-router';

class SignUp extends React.Component {
  render() {
    return (
      <div style={{textAlign: 'center'}}>
        <h1>SIGNUP</h1>
        <form>
          <input type="text"/>
          <br/>
          <input type="text"/>
          <br/>
          <input type="text"/>
          <br/>
          <button>Register</button>
          <br/>
          <Link to='login'>Already a user?</Link>
        </form>
      </div>
    )
  }
}

export default SignUp;