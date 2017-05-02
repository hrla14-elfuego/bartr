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
// {/*<div style={{width: 300, height:600, background:'red'}}>
// */}
// </div>