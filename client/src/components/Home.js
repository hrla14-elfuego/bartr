import React from 'react';
import NavBar from './NavBar';
import './styles/styles.css'
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
          bgImage='http://s1.thingpic.com/images/1e/usAoQMdY4zvsZisn1WoUedDs.jpeg'
          bgWidth='auto'
          bgHeight='1450px'
          strength={300}>
          <div style={{ width: '100%', height: 1200 }}>
            <Image style={{ margin: 'auto', position: 'relative', height: '15%', width: '15%' }} src='https://cdn.pixabay.com/photo/2016/04/01/09/58/animal-1299698_960_720.png' />
            <h4 style={{ fontWeight: 300, fontSize: 100 }}>Bartr</h4>
          </div>
          <form className='searchform' onSubmit={this.handleSubmitCurrentLocation}>
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


// http://s1.thingpic.com/images/1e/usAoQMdY4zvsZisn1WoUedDs.jpeg