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
    localStorage.address = event.target.value;
    console.log(localStorage);
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
          strength={400}>
          <div className='homelogo' style={{ width: '100%', height: 1200 }}>
            <Image style={{ margin: 'auto', marginTop: '200px', position: 'relative', height: '15%', width: '15%' }} src='https://cdn.pixabay.com/photo/2016/04/01/09/58/animal-1299698_960_720.png' />
            <h4 style={{ fontWeight: 750, fontSize: 130, fontFamily: 'Papyrus, fantasy' }}>Bartr</h4>
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
            <Link to='/map'><Button className='homesearchbutton'>Search</Button></Link>
          </form>
          </div>
        </Parallax>
      </div>
    )
  }
}


export default Home;

// red sky, camel silhouette
  // http://s1.thingpic.com/images/1e/usAoQMdY4zvsZisn1WoUedDs.jpeg
// big handshake
  // https://tradewithbxi.files.wordpress.com/2014/10/banner-jointventure.jpg
// black/red map
  // https://upload.wikimedia.org/wikipedia/commons/3/39/Shipping_routes_red_black.png