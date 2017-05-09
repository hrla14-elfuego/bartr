import React from 'react';
import axios from 'axios';
import NavBar from './NavBar';
import { each } from 'lodash';
import './styles/styles.css'
import { Parallax, Background } from 'react-parallax';
import { Dropdown, Input, Button, Header, Image, Grid, Modal } from 'semantic-ui-react';
import {Carousel} from "react-bootstrap";
import Autocomplete from 'react-google-autocomplete';
import { geocodeByAddress } from 'react-places-autocomplete';
import { Link } from 'react-router';
import { Icon } from 'semantic-ui-react';
import AddressSearchWithData  from '../containers/AddressSearchContainer'


class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  render () {
    console.log('this.props.profile: ', this.props.profile);
    return (

    <div>
            <AddressSearchWithData />
      <Link to='/map'><Button className='homesearchbutton'>Search</Button></Link> 
      <br/>
      <br/>

      <section>
        <div className="parallax-one">
          <h2>BARTR </h2>
        </div>
      </section>

      <section>
        <div className="block">
          <p><span className="first-character ny">B</span>artr is a peer to peer networking app that allows users to exchange services for services. In today's economy, there are countless individuals with valuable skills who are unable to make use of said skills. We serve to answer today's economic issue by providing the opportunity for talented individuals to exercise their skills in exchange for goods or services.</p>
        </div>
      </section>

      <section>
        <div className="parallax-two">
        </div>
      </section>

      <Carousel >
          <Carousel.Item >
            <img width={200} height={75} alt="900x500" src="http://images4.wikia.nocookie.net/__cb20110602071958/simpsons/images/f/fa/185px-Cosine.png"/>
            <Carousel.Caption>
              <h3>Justin Kang</h3>
              <p className="thick">Project Owner</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img width={200} height={75} alt="900x500" src="https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTemWdq1kmDSPAOfOmTzYS9L4Nd9v7HGcR2w8beDC2qWGBVBWsL"/>
            <Carousel.Caption>
              <h3>Shak </h3>
              <p className="thick">Scrum Master Overlord</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img width={200} height={75} alt="900x500" src="http://images4.wikia.nocookie.net/__cb20110602071958/simpsons/images/f/fa/185px-Cosine.png"/>
            <Carousel.Caption>
              <h3>Joe Kim</h3>
              <p className="thick">FrontEnd Monkey</p>
            </Carousel.Caption>
          </Carousel.Item>
            <Carousel.Item>
            <img width={200} height={75} alt="900x500" src="http://images4.wikia.nocookie.net/__cb20110602071958/simpsons/images/f/fa/185px-Cosine.png"/>
            <Carousel.Caption>
              <h3>Jason Kim</h3>
              <p className="thick">FrontEnd Monkey</p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
    </div>
    )
  }
}


export default Home;

// city network bg
  //https://media.osram.info/im/img/osram-dam-1182425//c,x,71,y,407,w,5257,h,2993/f,p/s,x,1230,y,0/725965_Network_business_conection_system_on_cityscape_background
// red sky, camel silhouette
  // http://s1.thingpic.com/images/1e/usAoQMdY4zvsZisn1WoUedDs.jpeg
// big handshake
  // https://tradewithbxi.files.wordpress.com/2014/10/banner-jointventure.jpg
// black/red map
  // https://upload.wikimedia.org/wikipedia/commons/3/39/Shipping_routes_red_black.png
      {/*<div className='parallax-div'>
        <Parallax
          className='parallax'
          bgImage='http://s1.thingpic.com/images/1e/usAoQMdY4zvsZisn1WoUedDs.jpeg'
          strength={400}>
        </Parallax>
      </div>*/}