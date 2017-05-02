import React from 'react';
import NavBar from './NavBar';
import { Link } from 'react-router';

class App extends React.Component {
  render() {
    // console.log(this.props);
    return(
      <div>
        <NavBar></NavBar>
        <div style={{textAlign: 'center'}}>
          {React.cloneElement(this.props.children, this.props)}
          {/*why???*/}
          {/*{this.props.children}*/}
        </div>
      </div>
    )
  }
}

export default App;

