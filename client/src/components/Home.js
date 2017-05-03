import React from 'react';
import NavBar from './NavBar';
import './styles/styles.css'
import { Parallax, Background } from 'react-parallax';


class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  render () {
    console.log('this is props: ', this.props);
    return (
      <div>
        <Parallax
          bgImage='http://i.huffpost.com/gen/3244066/images/o-SILK-ROAD-MAP-facebook.jpg'
          strength={300}>
          <Background>
            <div style={{
              width: 1000,
              height: 1000
            }}></div>
            <img src='http://res.freestockphotos.biz/pictures/15/15950-illustrated-silhouette-of-a-camel-pv.png'/>
          </Background>
          <h1>This is Home!</h1>
        </Parallax>
      </div>
    )
  }
}


export default Home;