import React from 'react';
import NavBar from './NavBar';
// import './styles/styles.css'
import { Parallax, Background } from 'react-parallax';
import { Dropdown, Input, Button, Header, Image, Grid } from 'semantic-ui-react';
import Autocomplete from 'react-google-autocomplete';
import { geocodeByAddress } from 'react-places-autocomplete';
import { Link } from 'react-router';


class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      address: ''
    }

    this.handleAddress = this.handleAddress.bind(this);
  }

  handleAddress(event) {
    event.preventDefault();
    this.setState({
      address: event.target.value
    }) 
  }

  render () {
    return (
      <div className='parallax-div'>
        <Parallax
          className='parallax'
          bgImage='http://i.huffpost.com/gen/3244066/images/o-SILK-ROAD-MAP-facebook.jpg'
          strength={300}>
          <Background>
            <div style={{
              width: 1000,
              height: 1000
            }}></div>
            <img src='http://res.freestockphotos.biz/pictures/15/15950-illustrated-silhouette-of-a-camel-pv.png'/>
          </Background>
          <form onSubmit={this.handleSubmitCurrentLocation}>
            <Input placeholder="Enter Your Location">
              <Autocomplete
                style={{width: 600}}
                onChange={this.handleAddress}
                onPlaceSelected={(place) => {
                  console.log(place);
                  this.setState({currentAddress: place.formatted_address});
                }}
                types={['address']}
                componentRestrictions={{country: "USA"}}
              />
            </Input>
          <Link to='/map'><Button>Button</Button></Link>
        </form>
        </Parallax>
      </div>
    )
  }
}


export default Home;
