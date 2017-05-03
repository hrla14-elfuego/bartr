import React from 'react';
import NavBarContainer from '../containers/NavBarContainer';
import { Link } from 'react-router';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.props.checkLogin();
  }
  render() {
    // console.log(this.props);
    return(
      <div>
        <NavBarContainer></NavBarContainer>
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

