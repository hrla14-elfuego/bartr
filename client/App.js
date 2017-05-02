import React, { Component } from 'react';
import GoogleMapsContainer from './components/GoogleMapsContainer';
// import GoogleMaps from './components/GoogleMaps';

class App extends Component {
  constructor(){
    super()

  }
  

  render() {
    return(
      <div>
        <GoogleMapsContainer google={window.google}/>
      </div>
    )
  }
}

export default App;
